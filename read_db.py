import sqlite3
import json

db_path = r"C:\Users\Soban\AppData\Roaming\Antigravity IDE\User\globalStorage\state.vscdb"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT key, value FROM ItemTable WHERE key LIKE '%cline%' OR key LIKE '%roo%'")
rows = cursor.fetchall()
for row in rows:
    print("KEY:", row[0])
    try:
        parsed = json.loads(row[1])
        print("VALUE:", json.dumps(parsed, indent=2)[:500])
    except Exception as e:
        print("VALUE:", row[1][:500])
    print("-" * 40)

conn.close()
