import { Bet } from '../types/portfolio';

export function exportToCSV(bets: Bet[], filename: string = 'portfolio-data.csv') {
  const headers = [
    'ID',
    'Timestamp',
    'Settlement Time',
    'Event',
    'Sport',
    'League',
    'Bookmaker 1',
    'Bookmaker 2',
    'Stake',
    'Currency',
    'Odds 1',
    'Odds 2',
    'Status',
    'Profit/Loss',
    'Arbitrage %',
  ];

  const rows = bets.map((bet) => [
    bet.id,
    bet.timestamp,
    bet.settlementTime || '',
    bet.event,
    bet.sport,
    bet.league,
    bet.bookmaker1,
    bet.bookmaker2,
    bet.stake,
    bet.currency,
    bet.odds1,
    bet.odds2,
    bet.status,
    bet.profitLoss,
    bet.arbitragePercentage,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}