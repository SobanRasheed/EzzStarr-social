import sqlite3
import json

db_path = r"C:\Users\Soban\AppData\Roaming\Antigravity IDE\User\globalStorage\state.vscdb"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT key FROM ItemTable WHERE key LIKE 'RooVeterinaryInc.roo-cline%'")
rows = cursor.fetchall()
for row in rows:
    print(row[0])

conn.close()
