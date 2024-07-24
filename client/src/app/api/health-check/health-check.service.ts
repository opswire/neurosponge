import { Injectable } from '@angular/core';

interface SuccessfulResponse {
  data: 'success';
}

@Injectable({
  providedIn: 'root',
})
export class HealthCheckService {
  url = 'http://localhost:8888/api/echo';

  constructor() {}

  async check(): Promise<SuccessfulResponse> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      return (await response.json()) as SuccessfulResponse;
    } catch (error) {
      throw new Error('Health check failed');
    }
  }
}
