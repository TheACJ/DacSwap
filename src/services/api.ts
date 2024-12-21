import axios from 'axios';
import { TokenData, ChartData } from '../types';
import { processChartData } from '../utils/chartUtils';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const getTopTokens = async (): Promise<TokenData[]> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
};

export const getTokenPrice = async (tokenId: string): Promise<number> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/simple/price?ids=${tokenId}&vs_currencies=usd`
    );
    return response.data[tokenId].usd;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return 0;
  }
};

export const getTokenPriceHistory = async (tokenId: string, days = 7): Promise<ChartData[]> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
    );
    
    return processChartData(response.data.prices);
  } catch (error) {
    console.error('Error fetching token price history:', error);
    return [];
  }
};