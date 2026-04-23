import os
import json
import base64
from openai import OpenAI

def handler(event: dict, context) -> dict:
    """
    Расшифровка аудиозаписи судебного заседания через Whisper AI.
    Принимает аудиофайл в base64, возвращает структурированный протокол.
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
    audio_b64 = body.get('audio_base64', '')
    filename = body.get('filename', 'audio.mp3')
    mime_type = body.get('mime_type', 'audio/mpeg')

    if not audio_b64:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Аудиофайл не передан'}, ensure_ascii=False)
        }

    client = OpenAI(
        api_key=os.environ['sk-or-vv-4d2dc55ffc4407ec69555bce4f7b38c30ba480ca0414af3ca7ae9e3afe9158f2'],
        base_url='https://api.vsegpt.ru/v1',
    )

    audio_bytes = base64.b64decode(audio_b64)

    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=(filename, audio_bytes, mime_type),
        language="ru",
        response_format="verbose_json",
        timestamp_granularities=["segment"],
    )

    raw_text = transcript.text
    segments = getattr(transcript, 'segments', [])

    format_prompt = f"""Ты — помощник по оформлению протоколов судебных заседаний.

Тебе передана расшифровка аудиозаписи судебного заседания. Твоя задача — преобразовать её в структурированный официальный протокол.

Требования:
1. Раздели текст на реплики участников (Председательствующий, Секретарь, Истец, Ответчик, Представитель истца, Представитель ответчика, Свидетель и т.д.)
2. Определи говорящего по контексту речи
3. Сохрани временны́е метки в формате ЧЧ:ММ если они есть в сегментах
4. Используй официальный стиль протокола суда РФ
5. Верни результат в формате JSON: массив объектов с полями "time", "speaker", "text"

Расшифровка:
{raw_text}

{"Временные метки сегментов: " + json.dumps([{"start": round(s.get("start", 0)), "text": s.get("text", "")} for s in segments[:20]], ensure_ascii=False) if segments else ""}

Верни ТОЛЬКО валидный JSON-массив, без пояснений."""

    model = 'openai/gpt-4o-mini' if os.environ.get('VSEGPT_API_KEY') else 'gpt-4o-mini'
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": format_prompt}],
        max_tokens=3000,
        temperature=0.1,
    )

    formatted_raw = response.choices[0].message.content.strip()

    if formatted_raw.startswith("```"):
        formatted_raw = formatted_raw.split("```")[1]
        if formatted_raw.startswith("json"):
            formatted_raw = formatted_raw[4:]
        formatted_raw = formatted_raw.strip()

    try:
        entries = json.loads(formatted_raw)
    except Exception:
        entries = [{"time": "00:00", "speaker": "Запись", "text": raw_text}]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'entries': entries,
            'raw_text': raw_text,
        }, ensure_ascii=False)
    }