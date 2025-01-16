import { Region } from '../types/betting';

export const regions: Region[] = [
  {
    id: 'us',
    name: 'United States',
    code: 'US',
    bookmakers: [
      { id: 'betonline', name: 'BetOnline.ag', regions: ['us'] },
      { id: 'betmgm', name: 'BetMGM', regions: ['us'] },
      { id: 'betrivers', name: 'BetRivers', regions: ['us'] },
      { id: 'betus', name: 'BetUS', regions: ['us'] },
      { id: 'bovada', name: 'Bovada', regions: ['us'] },
      { id: 'caesars', name: 'Caesars', regions: ['us'] },
      { id: 'draftkings', name: 'DraftKings', regions: ['us'] },
      { id: 'fanduel', name: 'FanDuel', regions: ['us'] },
      { id: 'lowvig', name: 'LowVig.ag', regions: ['us'] },
      { id: 'mybookie', name: 'MyBookie.ag', regions: ['us'] },
      { id: 'ballybet', name: 'Bally Bet', regions: ['us'] },
      { id: 'betanysports', name: 'BetAnySports', regions: ['us'] },
      { id: 'betparx', name: 'betPARX', regions: ['us'] },
      { id: 'espnbet', name: 'ESPN BET', regions: ['us'] },
      { id: 'fliff', name: 'Fliff', regions: ['us'] },
      { id: 'hardrock', name: 'Hard Rock Bet', regions: ['us'] },
      { id: 'windcreek', name: 'Wind Creek', regions: ['us'] },
      { id: 'prizepicks', name: 'PrizePicks', regions: ['us'] },
      { id: 'underdog', name: 'Underdog Fantasy', regions: ['us'] },
    ],
    sports: [
      {
        id: 'basketball',
        name: 'Basketball',
        regions: ['us'],
        leagues: [
          { id: 'nba', name: 'NBA', region: 'us' },
          { id: 'ncaab', name: 'NCAAB', region: 'us' },
          { id: 'wnba', name: 'WNBA', region: 'us' },
        ],
      },
      {
        id: 'football',
        name: 'Football',
        regions: ['us'],
        leagues: [
          { id: 'nfl', name: 'NFL', region: 'us' },
          { id: 'ncaaf', name: 'NCAAF', region: 'us' },
          { id: 'xfl', name: 'XFL', region: 'us' },
        ],
      },
      {
        id: 'baseball',
        name: 'Baseball',
        regions: ['us'],
        leagues: [
          { id: 'mlb', name: 'MLB', region: 'us' },
          { id: 'milb', name: 'MiLB', region: 'us' },
        ],
      },
      {
        id: 'hockey',
        name: 'Ice Hockey',
        regions: ['us'],
        leagues: [
          { id: 'nhl', name: 'NHL', region: 'us' },
          { id: 'shl', name: 'SHL', region: 'us' },
          { id: 'allsvenskan', name: 'HockeyAllsvenskan', region: 'us' },
        ],
      },
      {
        id: 'cricket',
        name: 'Cricket',
        regions: ['us'],
        leagues: [
          { id: 'test', name: 'Test Matches', region: 'us' },
          { id: 'ipl', name: 'IPL', region: 'us' },
          { id: 'bbl', name: 'Big Bash League', region: 'us' },
        ],
      },
      {
        id: 'rugby',
        name: 'Rugby League',
        regions: ['us'],
        leagues: [
          { id: 'nrl', name: 'NRL', region: 'us' },
        ],
      },
      {
        id: 'golf',
        name: 'Golf',
        regions: ['us'],
        leagues: [
          { id: 'pga', name: 'PGA Tour', region: 'us' },
          { id: 'masters', name: 'The Masters', region: 'us' },
          { id: 'open', name: 'The Open Championship', region: 'us' },
          { id: 'uspga', name: 'US PGA Championship', region: 'us' },
        ],
      },
      {
        id: 'tennis',
        name: 'Tennis',
        regions: ['us'],
        leagues: [
          { id: 'ao', name: 'Australian Open', region: 'us' },
          { id: 'rg', name: 'Roland Garros', region: 'us' },
          { id: 'wimbledon', name: 'Wimbledon', region: 'us' },
          { id: 'uso', name: 'US Open', region: 'us' },
        ],
      },
      {
        id: 'politics',
        name: 'Politics',
        regions: ['us'],
        leagues: [
          { id: 'us-politics', name: 'US Politics', region: 'us' },
          { id: 'international', name: 'International Politics', region: 'us' },
        ],
      },
    ],
  },
];