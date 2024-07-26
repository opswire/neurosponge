import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthCheckService } from './api/health-check/health-check.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'neurosponge-client';
  healthcheck = inject(HealthCheckService);

  checkResult$ = this.healthcheck.checkResult$;

  text = '';

  constructor() {}
}
