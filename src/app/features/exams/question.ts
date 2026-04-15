export interface Question {
    type: 'noun' | 'verb';
    prompt: string;
    answer: string;
    explanation?: string;
}
