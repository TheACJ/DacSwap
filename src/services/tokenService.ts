import { TokenData } from '../types';
import { getTopTokens as fetchTopTokens } from './api';

export const getTokens = async (): Promise<TokenData[]> => {
  try {
    const tokens = await fetchTopTokens();
    // Ensure data is serializable by creating plain objects
    return tokens.map(token => ({
      id: token.id,
      symbol: token.symbol,
      name: token.name,
      current_price: token.current_price,
      price_change_percentage_24h: token.price_change_percentage_24h,
      total_volume: token.total_volume,
      market_cap: token.market_cap,
      image: token.image
    }));
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
};