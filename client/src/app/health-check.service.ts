import { Injectable } from '@angular/core';

interface SuccessfulResponse {
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HealthCheckService {
  url = 'http://localhost:8888/echo';

  constructor() {}

  async check(): Promise<SuccessfulResponse> {
    const data = await fetch(this.url);
    return (await data.json()) as SuccessfulResponse;
  }
}
