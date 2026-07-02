import Papa from 'papaparse';

import type {
  PortfolioType,
  Property,
  PropertyPortfolios,
  PropertyRow,
} from '@/types/property';

const SHEET_PUBLISH_BASE =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR-gGZRjzsX3iPt1r5wHYR1ypnDtNtSw0VhYK8WLS7QMaShaz0zLq6vLPBKc_fKrdwqRP5KnNbqccTA';

/** Google Sheet tab: Commercial Holdings */
export const COMMERCIAL_HOLDINGS_GID = 1;
/** Google Sheet tab: Residential Holdings */
export const RESIDENTIAL_HOLDINGS_GID = 2;

/** Inclusive row window per tab (row 1 = header). */
export const COMMERCIAL_SHEET_ROW_START = 2;
export const COMMERCIAL_SHEET_ROW_END = 15;
export const RESIDENTIAL_SHEET_ROW_START = 2;
export const RESIDENTIAL_SHEET_ROW_END = 11;

/** Legacy export kept for reference; prefer tab-specific gids above. */
export const LISTINGS_CSV_URL = `${SHEET_PUBLISH_BASE}/pub?gid=${COMMERCIAL_HOLDINGS_GID}&single=true&output=csv`;

/** ISR cache window: revalidate listing data every 10 minutes. */
export const LISTINGS_REVALIDATE_SECONDS = 600;

const FETCH_TIMEOUT_MS = 15_000;

const EMPTY_PORTFOLIOS: PropertyPortfolios = {
  commercial: [],
  residential: [],
};

function buildSheetCsvUrl(gid: number): string {
  return `${SHEET_PUBLISH_BASE}/pub?gid=${gid}&single=true&output=csv`;
}

function parseNumber(value: string | undefined): number {
  if (!value?.trim()) {
    return 0;
  }

  const parsed = Number(String(value).replace(/[,$]/g, '').trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseBoolean(value: string | undefined): boolean {
  const normalized = String(value ?? '').trim().toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
}

/** Normalize CSV header keys (BOM, casing, stray spaces) before parsing. */
function normalizePropertyRow(raw: Record<string, string | undefined>): PropertyRow {
  const normalized: Record<string, string> = {};

  for (const [key, value] of Object.entries(raw)) {
    const cleanKey = key.trim().replace(/^\ufeff/, '').toLowerCase();
    normalized[cleanKey] = String(value ?? '').trim();
  }

  return {
    id: normalized.id ?? '',
    title: normalized.title ?? '',
    estimatedValue: normalized.estimatedvalue ?? normalized.estimated_value ?? '',
    price: normalized.price ?? '',
    type: normalized.type ?? '',
    street: normalized.street ?? '',
    city: normalized.city ?? '',
    state: normalized.state ?? '',
    zip: normalized.zip ?? '',
    sqFt: normalized.sqft ?? normalized['sq ft'] ?? '',
    beds: normalized.beds ?? '',
    baths: normalized.baths ?? '',
    status: normalized.status ?? '',
    imageUrl: normalized.imageurl ?? normalized.image_url ?? '',
    featured: normalized.featured ?? '',
  };
}

function parsePropertyRow(row: PropertyRow, portfolio: PortfolioType): Property | null {
  const id = row.id?.trim();
  const title = row.title?.trim();

  if (!id || !title) {
    return null;
  }

  const priceRaw = row.estimatedValue ?? row.price ?? '';

  return {
    id,
    title,
    status: row.status?.trim() ?? '',
    type: row.type?.trim() ?? '',
    price: parseNumber(priceRaw),
    street: row.street?.trim() ?? '',
    city: row.city?.trim() ?? '',
    state: row.state?.trim() ?? '',
    zip: row.zip?.trim() ?? '',
    sqFt: parseNumber(row.sqFt),
    beds: parseNumber(row.beds),
    baths: parseNumber(row.baths),
    imageUrl: row.imageUrl?.trim() ?? '',
    featured: parseBoolean(row.featured),
    portfolio,
  };
}

function sliceSheetRows<T>(rows: T[], rowStart: number, rowEnd: number): T[] {
  const startIndex = rowStart - 2;
  const endIndex = rowEnd - 1;

  return rows.slice(startIndex, endIndex);
}

function sortPropertiesByPrice(properties: Property[]): Property[] {
  return [...properties].sort((a, b) => {
    const priceA = a.price || 0;
    const priceB = b.price || 0;

    if (priceA === 0) return 1;
    if (priceB === 0) return -1;

    return priceB - priceA;
  });
}

async function fetchSheetRows(
  gid: number,
  rowStart: number,
  rowEnd: number,
): Promise<Record<string, string>[]> {
  try {
    const response = await fetch(buildSheetCsvUrl(gid), {
      next: { revalidate: LISTINGS_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`Failed to fetch sheet gid=${gid}: ${response.status} ${response.statusText}`);
      return [];
    }

    const csv = await response.text();
    const { data, errors } = Papa.parse<Record<string, string>>(csv, {
      header: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      console.error(`CSV parse errors for gid=${gid}:`, errors);
    }

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return sliceSheetRows(data, rowStart, rowEnd);
  } catch (error) {
    console.error(`Unable to load sheet gid=${gid}:`, error);
    return [];
  }
}

function parsePortfolioRows(
  rows: Record<string, string | undefined>[],
  portfolio: PortfolioType,
): Property[] {
  const properties = rows
    .map((row) => parsePropertyRow(normalizePropertyRow(row), portfolio))
    .filter((listing): listing is Property => listing !== null);

  return sortPropertiesByPrice(properties);
}

export async function fetchPortfolios(): Promise<PropertyPortfolios> {
  try {
    const [commercialRows, residentialRows] = await Promise.all([
      fetchSheetRows(
        COMMERCIAL_HOLDINGS_GID,
        COMMERCIAL_SHEET_ROW_START,
        COMMERCIAL_SHEET_ROW_END,
      ),
      fetchSheetRows(
        RESIDENTIAL_HOLDINGS_GID,
        RESIDENTIAL_SHEET_ROW_START,
        RESIDENTIAL_SHEET_ROW_END,
      ),
    ]);

    const commercialArray = parsePortfolioRows(commercialRows, 'commercial');
    const residentialArray = parsePortfolioRows(residentialRows, 'residential');

    return {
      commercial: commercialArray,
      residential: residentialArray,
    };
  } catch (error) {
    console.error('Unable to load property portfolios from Google Sheets:', error);
    return EMPTY_PORTFOLIOS;
  }
}

export async function fetchListings(): Promise<Property[]> {
  const portfolios = await fetchPortfolios();
  return sortPropertiesByPrice([
    ...portfolios.commercial,
    ...portfolios.residential,
  ]);
}

export async function fetchFeaturedListings(): Promise<Property[]> {
  const listings = await fetchListings();
  return listings.filter((listing) => listing.featured);
}

export async function fetchListingById(id: string): Promise<Property | null> {
  if (!id?.trim()) {
    return null;
  }

  const listings = await fetchListings();
  return listings.find((listing) => listing.id === id) ?? null;
}
