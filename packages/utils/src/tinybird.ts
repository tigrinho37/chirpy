export class QueryError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'QueryError';
    this.status = status;
  }
}

export const TINYBIRD_ORIGIN = 'https://api.tinybird.co';

export async function client<T>(
  path: string,
  params?: RequestInit,
): Promise<T> {
  const response = await fetch(`${TINYBIRD_ORIGIN}/v0${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TINYBIRD_ADMIN_TOKEN}`,
    },
    ...params,
  });
  type ClientResponse<T> = T & { error?: string };
  const data = (await response.json()) as ClientResponse<T>;

  if (!response.ok) {
    throw new QueryError(
      data?.error ?? 'Something went wrong with tinybird',
      response.status,
    );
  }
  return data;
}

export type PipeParams<T> = Record<keyof T, string> & {
  limit: number;
  date_to: string;
  date_from: string;
};

export type BaseColumnType = 'String' | 'Date' | 'UInt64' | 'Float64';
export type ColumnType = BaseColumnType | `Nullable(${BaseColumnType})`;
export type Meta<T> = { name: keyof T; type: ColumnType };
export type Statistics = {
  elapsed: number;
  rows_read: number;
  bytes_read: number;
};
export type QueryPipe<T> = {
  meta: Meta<T>[];
  data: T[];
  rows: number;
  statistics: Statistics;
};

export function queryPipe<T>(
  name: string,
  params: Partial<PipeParams<T>> = {},
): Promise<QueryPipe<T>> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    searchParams.set(key, value);
  });

  return client(`/pipes/${name}.json?${searchParams}`);
}
