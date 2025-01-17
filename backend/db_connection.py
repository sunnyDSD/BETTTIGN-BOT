#backend/db_connection.py

import aiosqlite

async def connect_db():
    return await aiosqlite.connect('data/odds_history.db')