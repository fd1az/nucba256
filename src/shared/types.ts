export type Success<T> = {
  success: true;
  result: T;
  total?: number;
  pagination?: Pagination;
};
export type Failure = { success: false; err: Error };

export interface DefaultSuccess {
  message: string;
}
export type Pagination = {
  page?: number;
  limit?: number;
  startIndex?: number;
  endIndex?: number;
};

export type Filters = {
  categoryId?: string;
  subcategoryId?: string;
  subsubcategoryId?: string;
  name?: string;
};

export type Result<T> = Success<T> | Failure;

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};
