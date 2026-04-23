import os
import json
from openai import OpenAI

def handler(event: dict, context) -> dict:
    """
    Поиск судебной практики через ChatGPT.
    Принимает историю сообщений и возвращает ответ ИИ-ассистента.
    """
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    messages = body.get('messages', [])

    if not messages:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Сообщения не переданы'}, ensure_ascii=False)
        }

    api_key = os.environ.get('VSEGPT_API_KEY') or os.environ.get('OPENAI_API_KEY')
    base_url = 'https://api.vsegpt.ru/v1' if os.environ.get('VSEGPT_API_KEY') else None
    model = 'openai/gpt-4o-mini' if os.environ.get('VSEGPT_API_KEY') else 'gpt-4o-mini'

    client = OpenAI(api_key=api_key, base_url=base_url)

    system_prompt = """Ты — специализированный ИИ-ассистент для поиска и анализа судебной практики в России.

Твоя задача:
1. Помогать судьям, юристам и специалистам находить релевантные судебные решения и прецеденты
2. Анализировать правовые позиции судов по конкретным категориям дел
3. Объяснять применение норм права (ГК РФ, УК РФ, АПК РФ, ГПК РФ, КоАП РФ и др.)
4. Давать ссылки на конкретные статьи законов и разъяснения Верховного суда РФ
5. Формировать аналитические справки по судебной практике

Стиль ответов: официальный, юридически грамотный, структурированный.
При ответе ссылайся на конкретные нормы права и постановления Пленума ВС РФ когда это уместно.
Отвечай на русском языке."""

    chat_messages = [{"role": "system", "content": system_prompt}]
    for msg in messages:
        role = "user" if msg.get("role") == "user" else "assistant"
        chat_messages.append({"role": role, "content": msg.get("text", "")})

    response = client.chat.completions.create(
        model=model,
        messages=chat_messages,
        max_tokens=1500,
        temperature=0.3,
    )

    answer = response.choices[0].message.content

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'answer': answer}, ensure_ascii=False)
    }
