import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FlashcardBulkDTO } from './flashcard.model';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  bulkURL = 'http://localhost:8888/api/v1/quiz/cards';

  http = inject(HttpClient);

  flashcardBulk$ = this.http.get<FlashcardBulkDTO>(this.bulkURL);

  constructor() {}
}
