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
    this.healthcheck.check().then((data) => {
      this.text = data.data;
    });
  }
}
