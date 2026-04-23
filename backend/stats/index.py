import os
import json
import psycopg2
from datetime import date

def handler(event: dict, context) -> dict:
    """
    Возвращает статистику судебных дел с начала текущего года:
    - поступило дел с начала года
    - рассмотрено дел с начала года
    - всего дел в производстве
    """
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    year_start = date(date.today().year, 1, 1)

    cur.execute(f"""
        SELECT
            COUNT(*) FILTER (WHERE received_at >= %s) AS received_this_year,
            COUNT(*) FILTER (WHERE received_at >= %s AND status = 'resolved') AS resolved_this_year,
            COUNT(*) FILTER (WHERE status = 'in_progress') AS in_progress_total
        FROM {schema}.cases
    """, (year_start, year_start))

    row = cur.fetchone()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'received_this_year': row[0],
            'resolved_this_year': row[1],
            'in_progress_total': row[2],
        }, ensure_ascii=False)
    }
