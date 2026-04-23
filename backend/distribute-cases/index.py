import os
import json
from openai import OpenAI

def handler(event: dict, context) -> dict:
    """
    ИИ-распределение судебных дел между судьями с учётом нагрузки,
    специализации, отпуска, болезни и категорий особо сложных дел.
    """
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    judges = body.get('judges', [])
    cases = body.get('cases', [])

    if not judges or not cases:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Судьи или дела не переданы'}, ensure_ascii=False)
        }

    client = OpenAI(
        api_key=os.environ['OPENAI_API_KEY'],
        base_url='https://api.vsegpt.ru/v1',
    )
    # vsegpt proxy - works in Russia

    unassigned = [c for c in cases if c.get('status') != 'assigned']

    if not unassigned:
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'assignments': [], 'reasoning': 'Все дела уже распределены.'}, ensure_ascii=False)
        }

    system_prompt = """Ты — интеллектуальная система автоматического распределения судебных дел в суде Российской Федерации.

Твоя задача — оптимально распределить дела между судьями с учётом всех факторов.

Правила распределения:
1. Судья в отпуске или на больничном — НЕ может получать новые дела
2. Нагрузка судьи: предпочитать судей с меньшей загруженностью (load < 70%)
3. Специализация: учитывать категорию дела и специализацию судьи
4. Особо сложные дела: назначать только судьям с соответствующей специализацией по сложным делам
5. При равных условиях — равномерно распределять нагрузку
6. Работники аппарата: если помощник/секретарь судьи в отпуске или болен — снизить приоритет назначения делу этому судье

Верни результат СТРОГО в формате JSON:
{
  "assignments": [
    {"case_id": "номер дела", "judge": "ФИО судьи", "reason": "краткое обоснование на русском"}
  ],
  "reasoning": "общее пояснение логики распределения"
}

Только валидный JSON, без пояснений вне JSON."""

    user_message = f"""Распредели следующие дела:

СУДЬИ:
{json.dumps(judges, ensure_ascii=False, indent=2)}

ДЕЛА ДЛЯ РАСПРЕДЕЛЕНИЯ:
{json.dumps(unassigned, ensure_ascii=False, indent=2)}"""

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        max_tokens=2000,
        temperature=0.1,
        response_format={"type": "json_object"},
    )

    result_raw = response.choices[0].message.content
    result = json.loads(result_raw)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result, ensure_ascii=False)
    }