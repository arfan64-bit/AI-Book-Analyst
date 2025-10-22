
export interface BookAnalysis {
  summary: string;
  themes: string[];
  takeaways: string[];
  quotes: {
    quote: string;
    attribution: string;
  }[];
  recommendation: string;
}
