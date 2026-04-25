import { Component, OnInit } from '@angular/core';
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
export class BasicExam implements OnInit {
  userAnswer = '';
  showAnswer = false;
  currentQuestionIndex = 0;

  ngOnInit(): void {
    this.initiatizeQuestion();
  }

  onQuestionTypesChange() {
    this.initiatizeQuestion();
  }


  examination = new Examination();

  public currentQuestion: Question = { type: 'noun', prompt: '', answer: '' };
  public previousQuestion: Question = { type: 'noun', prompt: '', answer: '' };
  public previousResult = '';
  public previousAnswer = '';

  public questionTypes: QuestionType[] = [
    { key: 'noun', value: '1/2 Noun', selected: true },
    { key: 'indicative', value: 'Indicative', selected: true },
    { key: 'imperfect', value: 'Imperfect', selected: true },
    { key: 'preposition', value: 'Preposition', selected: true },
    { key: 'aorist', value: 'Aorist', selected: true },
  ];

  get selectedQuestionTypes(): string[] {
    return this.questionTypes.filter(s => s.selected).map(s => s.key);
  }

  randomQuestionType(): string {
    const selected = this.selectedQuestionTypes;
    return selected.length === 0 ? this.questionTypes[0].key :
      selected[Math.floor(Math.random() * selected.length)];
  }


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

  initiatizeQuestion() {
    this.showAnswer = false;
    this.currentQuestionIndex = 0;
    this.previousQuestion = { type: 'noun', prompt: '', answer: '' };
    this.currentQuestion = this.examination.generateQuestion(this.randomQuestionType());

  }
  checkAnswer(): void {
    this.previousResult = this.examination.evaluateAnswer(this.userAnswer);
    this.previousAnswer = this.userAnswer;
    this.showAnswer = true;
    this.userAnswer = '';
    this.currentQuestionIndex++;
    this.previousQuestion = this.currentQuestion;
    this.currentQuestion = this.generateQuestion();

    // Add logic to validate answer and update stats
  }

  generateQuestion() {
    return this.examination.generateQuestion(this.randomQuestionType());
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
