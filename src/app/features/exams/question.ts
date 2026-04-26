export interface Question {
    type: 'noun' | 'verb' | 'prep';
    prompt: string;
    answer: string;
    explanation?: string;
}

