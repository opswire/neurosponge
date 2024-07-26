import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { FlashcardDTO } from './flashcard.model';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
   = 'http://localhost:8888/api/';

  http = inject(HttpClient);

  checkResult$ = this.http.get<FlashcardDTO>(this.healthCheckUrl);

  constructor() {}
}
