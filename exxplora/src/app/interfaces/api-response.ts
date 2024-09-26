export interface ApiResponse<T> {
    isError: boolean;
    messages: string[];
    data: T;
  }
  