export interface TokenData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
  image: string;
}

export interface SwapState {
  fromToken: TokenData | null;
  toToken: TokenData | null;
  fromAmount: string;
  toAmount: string;
}

export interface ChartData {
  time: number;
  value: number;
}