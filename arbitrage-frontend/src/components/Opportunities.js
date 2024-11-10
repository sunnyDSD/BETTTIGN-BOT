// src/components/Opportunities.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    fetchOpportunities();
    const interval = setInterval(fetchOpportunities, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/opportunities');
      setOpportunities(response.data);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const takeTrade = async (opp_id) => {
    try {
      await axios.post('http://localhost:5000/api/take_trade', { opp_id });
      // Update the list after taking a trade
      fetchOpportunities();
    } catch (error) {
      console.error('Error taking trade:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Arbitrage Opportunities</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Event</th>
            <th className="py-2 px-4 border-b">Platform A</th>
            <th className="py-2 px-4 border-b">Odds A</th>
            <th className="py-2 px-4 border-b">Platform B</th>
            <th className="py-2 px-4 border-b">Odds B</th>
            <th className="py-2 px-4 border-b">Stake A</th>
            <th className="py-2 px-4 border-b">Stake B</th>
            <th className="py-2 px-4 border-b">Potential Profit</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp) => (
            <tr key={opp.id} className="text-center">
              <td className="py-2 px-4 border-b">{opp.event_name}</td>
              <td className="py-2 px-4 border-b">
                <a href={opp.url_a} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {opp.platform_a}
                </a>
              </td>
              <td className="py-2 px-4 border-b">{opp.odds_a}</td>
              <td className="py-2 px-4 border-b">
                <a href={opp.url_b} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {opp.platform_b}
                </a>
              </td>
              <td className="py-2 px-4 border-b">{opp.odds_b}</td>
              <td className="py-2 px-4 border-b">{opp.stake_a.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{opp.stake_b.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{opp.potential_profit.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => takeTrade(opp.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                >
                  Take Trade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Opportunities;
