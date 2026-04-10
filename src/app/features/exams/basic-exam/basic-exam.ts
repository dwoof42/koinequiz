import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  id: number;
  greek: string;
  english: string;
  explanation: string;
}

interface ExamStats {
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
}

@Component({
  selector: 'app-basic-exam',
  imports: [CommonModule, FormsModule],
  templateUrl: './basic-exam.html',
  styleUrl: './basic-exam.css',
})
export class BasicExam {
  selectedSets = ['Set A', 'Set B'];
  userAnswer = '';
  showAnswer = false;
  currentQuestionIndex = 0;

  stats: ExamStats = {
    correct: 6,
    incorrect: 2,
    skipped: 2,
    total: 10,
  };

  questions: Question[] = [
    {
      id: 1,
      greek: 'λόγος',
      english: 'word, reason, logic',
      explanation: '"Λόγος" (logos) is a fundamental Greek word meaning "word," "reason," or "logic." It\'s the root of English words like "logic," "dialogue," and "epilogue."'
    },
    // Add more questions here
  ];

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  get accuracy(): number {
    return this.stats.total > 0 ? Math.round((this.stats.correct / this.stats.total) * 100) : 0;
  }

  get progressPercentage(): number {
    const answered = this.stats.correct + this.stats.incorrect;
    return this.stats.total > 0 ? Math.round((answered / this.stats.total) * 100) : 0;
  }

  checkAnswer(): void {
    this.showAnswer = true;
    // Add logic to validate answer and update stats
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.userAnswer = '';
      this.showAnswer = false;
    }
  }

  toggleQuestionSet(set: string): void {
    const index = this.selectedSets.indexOf(set);
    if (index > -1) {
      this.selectedSets.splice(index, 1);
    } else {
      this.selectedSets.push(set);
    }
  }
}
