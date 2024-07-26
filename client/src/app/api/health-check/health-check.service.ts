import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface SuccessfulResponse {
  data: 'success';
}

@Injectable({
  providedIn: 'root',
})
export class HealthCheckService {
  healthCheckUrl = 'http://localhost:8888/api/echo';

  http = inject(HttpClient);

  checkResult$ = this.http.get<SuccessfulResponse>(this.healthCheckUrl);

  constructor() {}
}
