import os
import json
from openai import OpenAI

def handler(event: dict, context) -> dict:
    """
    Генерация проекта судебного акта на основе промта и типа акта через ChatGPT.
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
    act_type = body.get('act_type', 'решение')
    prompt = body.get('prompt', '').strip()
    documents = body.get('documents', [])

    if not prompt:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Промт не передан'}, ensure_ascii=False)
        }

    client = OpenAI(
        api_key=os.environ['OPENAI_API_KEY'],
        base_url='https://api.vsegpt.ru/v1',
    )
    # vsegpt proxy - works in Russia
    model = 'openai/gpt-4o'

    docs_section = ""
    if documents:
        docs_section = f"\n\nПриложенные документы по делу: {', '.join(documents)}"

    system_prompt = """Ты — опытный помощник судьи, специализирующийся на подготовке проектов судебных актов Российской Федерации.

Твоя задача — генерировать профессиональные, юридически грамотные проекты судебных актов строго по нормам российского права.

Требования к оформлению:
1. Соблюдай официальную структуру судебного акта: вводная часть, описательная часть, мотивировочная часть, резолютивная часть
2. Используй официальный юридический язык и терминологию
3. Ссылайся на конкретные нормы права (статьи ГК РФ, УК РФ, ГПК РФ, АПК РФ, КоАП РФ и т.д.)
4. Указывай реквизиты: наименование суда, дата, номер дела (если указан)
5. Используй стандартные формулировки судебных актов РФ
6. В резолютивной части чётко формулируй решение суда

Генерируй только текст акта, без пояснений и комментариев."""

    user_message = f"Составь проект судебного акта — {act_type.upper()}.\n\nОбстоятельства дела:\n{prompt}{docs_section}"

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        max_tokens=2500,
        temperature=0.2,
    )

    act_text = response.choices[0].message.content

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'act': act_text}, ensure_ascii=False)
    }