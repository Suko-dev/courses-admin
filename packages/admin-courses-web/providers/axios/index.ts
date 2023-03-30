import axios from 'axios';

const apiAxios = axios.create({ baseURL: '/api/' });

export class ApiCaller {
  static async post<R = unknown, T = unknown>(
    url: string,
    body?: T
  ): Promise<R> {
    const { data } = await apiAxios.post(url, body);
    return data;
  }

  static async get<T = unknown>(url: string): Promise<T> {
    const { data } = await apiAxios.get(url);
    return data;
  }

  static fetch<T = unknown>(url: string): Promise<T> {
    return apiAxios.get(url).then(({ data }): T => data);
  }
}
