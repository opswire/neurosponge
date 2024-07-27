import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FlashcardService } from '../entities/flashcard/flashcard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'neurosponge-client';
  flashcardService = inject(FlashcardService);
  flashcardList = [] as Array<{
    id: number;
    question: string;
    answer: string;
    image_url: string | null;
    created_at: string;
    updated_at: string;
  }>;
  flashcards$ = this.flashcardService.flashcardBulk$.subscribe(
    (list) => (this.flashcardList = list.success)
  );

  isFlipped = false;

  currentCardIndex = 0;

  nextCard() {
    if (this.currentCardIndex >= this.flashcardList.length - 1) return;
    this.currentCardIndex += 1;
    this.isFlipped = false;
  }

  previousCard() {
    if (this.currentCardIndex <= 0) return;
    this.currentCardIndex -= 1;
    this.isFlipped = false;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  constructor() {}
}
