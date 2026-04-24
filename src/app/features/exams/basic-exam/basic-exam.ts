import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Examination } from '../examination';
import { Question } from '../question';

interface QuestionType {
  key: string;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-basic-exam',
  imports: [CommonModule, FormsModule],
  templateUrl: './basic-exam.html',
  styleUrl: './basic-exam.css',
})
export class BasicExam {
  userAnswer = '';
  showAnswer = false;
  currentQuestionIndex = 0;

  examination = new Examination();

  public currentQuestion: Question = this.examination.generateQuestion();
  public previousQuestion: Question = { type: 'noun', prompt: '', answer: '' };
  public previousResult = '';

  public questionTypes:QuestionType[] = [
    {key: 'noun', value: '1/2/ Noun', selected: true},
    {key: 'indicative', value: 'Indicative', selected: true},
    {key: 'imperfect', value: 'Imperfect', selected: true},
    {key: 'preposition', value: 'Preposition', selected: true},
    {key: 'aorist', value: 'Aorist', selected: true},
  ];

  public selectedQuestionTypes: string[] = [];


  get accuracy(): string {
    const stats = this.examination.stats;
    const partial = stats.accent + stats.correct;
    const total = partial + stats.incorrect;
    return !!total ? `${partial} / ${total}` : '';
  }

  get percentage(): number {
    const stats = this.examination.stats;
    const partial = stats.accent + stats.correct;
    const total = partial + stats.incorrect;
    return total === 0 ? 0 : Math.round((partial / total) * 100);
  }

  checkAnswer(): void {
    this.previousResult = this.examination.evaluateAnswer(this.userAnswer);
    this.showAnswer = true;
    this.currentQuestionIndex++;
    this.previousQuestion = this.currentQuestion;
    this.currentQuestion = this.examination.generateQuestion();

    // Add logic to validate answer and update stats
  }

  nextQuestion(): void {
    this.examination.generateQuestion();
    this.currentQuestionIndex++;
    this.userAnswer = '';
    this.showAnswer = false;
  }

  // toggleQuestionSet(set: string): void {
  //   const index = this.selectedSets.indexOf(set);
  //   if (index > -1) {
  //     this.selectedSets.splice(index, 1);
  //   } else {
  //     this.selectedSets.push(set);
  //   }
  // }
}
