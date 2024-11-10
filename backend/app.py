# backend/app.py
from flask import Flask, jsonify
from db_manager import get_all_arbitrage_opportunities

app = Flask(__name__)

@app.route('/api/arbitrage_opportunities', methods=['GET'])
def fetch_opportunities():
    opportunities = get_all_arbitrage_opportunities()
    return jsonify(opportunities)

if __name__ == '__main__':
    app.run(debug=True)
