import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthCheckService } from './health-check.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'neurosponge-client';
  healthcheck = inject(HealthCheckService);

  text = '';

  constructor() {
    this.healthcheck.check().then((response) => {
      if (!response.success) {
        throw new Error('Health check failed');
      } else {
        this.text = 'Health check passed';
      }
    });
  }
}
