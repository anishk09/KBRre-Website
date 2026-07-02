/** Raw CSV row — all values arrive as strings from the sheet. */
export interface PropertyRow {
  id: string;
  title: string;
  estimatedValue?: string;
  price?: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zip?: string;
  sqFt?: string;
  beds?: string;
  baths?: string;
  status?: string;
  imageUrl?: string;
  featured?: string;
}

export type PortfolioType = 'commercial' | 'residential';

/** Parsed property with numeric fields coerced from the sheet. */
export interface Property {
  id: string;
  title: string;
  status: string;
  type: string;
  price: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  sqFt: number;
  beds: number;
  baths: number;
  imageUrl: string;
  featured: boolean;
  portfolio: PortfolioType;
}

export type PropertyPortfolios = {
  commercial: Property[];
  residential: Property[];
};
