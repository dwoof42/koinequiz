import { Question } from './question';
import { prepositions } from './greek-prepositions';


export class PrepGenerator {
  // function stripDiacritics(str) {
  //   if (!str) return str;
  //   return str
  //     .normalize("NFD")
  //     .replace(/[\u0300-\u036f]/g, "")
  //     .replace(/\u037a/g, "")
  //     .replace(/\u0345/g, "")
  //     .replace(/[·]/g, "")
  //     .replace(/\s+/g, " ")
  //     .trim();
  // }


  makePrepositionQuestion(): Question {
    const index = Math.floor(Math.random() * prepositions.length);
    const q = prepositions[index];

    return {
      type: 'prep',
      prompt: `${q.prompt} (${q.greekBase})`,
      answer: q.answer,
      explanation: q.example
    }
  }
}
