export type PaginatedReponse<T> = {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    path: string;
    to: number;
    total: number;
    from: number;
  };
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
};
