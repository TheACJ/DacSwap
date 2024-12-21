import { ChartData } from '../types';

export const processChartData = (data: [number, number][]): ChartData[] => {
  return data
    .map(([timestamp, price]) => ({
      time: Math.floor(timestamp / 1000), // Convert to Unix timestamp in seconds
      value: price
    }))
    .sort((a, b) => a.time - b.time) // Ensure ascending order
    .filter((item, index, array) => { // Remove duplicates
      return index === 0 || item.time !== array[index - 1].time;
    });
};