# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.db_manager import get_all_active_arbitrage_opportunities, update_trade_taken
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for all routes

@app.route('/api/opportunities', methods=['GET'])
def api_get_opportunities():
    opportunities = get_all_active_arbitrage_opportunities()
    # Convert the database records to a list of dictionaries
    opportunities_list = []
    for opp in opportunities:
        opp_dict = {
            'id': opp[0],
            'event_name': opp[1],
            'platform_a': opp[2],
            'odds_a': opp[3],
            'url_a': opp[4],
            'platform_b': opp[5],
            'odds_b': opp[6],
            'url_b': opp[7],
            'stake_a': opp[8],
            'stake_b': opp[9],
            'arbitrage_value': opp[10],
            'potential_profit': opp[11],
            'commence_time': opp[12],
            'timestamp': opp[13],
            'trade_taken': opp[14],
        }
        opportunities_list.append(opp_dict)
    return jsonify(opportunities_list)

@app.route('/api/take_trade', methods=['POST'])
def api_take_trade():
    data = request.get_json()
    opp_id = data.get('opp_id')
    if opp_id is not None:
        update_trade_taken(opp_id, 1)
        return jsonify({'status': 'success', 'message': 'Trade marked as taken.'})
    else:
        return jsonify({'status': 'error', 'message': 'Opportunity ID not provided.'}), 400

if __name__ == '__main__':
    app.run(debug=True)
