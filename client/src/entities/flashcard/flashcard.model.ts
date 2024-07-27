export interface FlashcardBulkDTO {
  success: [
    {
      id: number;
      question: string;
      answer: string;
      image_url: null | string;
      created_at: string;
      updated_at: string;
    }
  ];
}
