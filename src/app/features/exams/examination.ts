import { Question } from "./question";
import { NounGenerator } from "./noun-generator";
import { VerbGenerator } from "./verb-generator";
import { PrepGenerator } from './prep-generator';

// Interfaces
interface Stats {
    correct: number;
    accent: number;
    incorrect: number;
}


export class Examination {
    // Message properties (instead of console.log)
    public currentMessage: string = '';
    public summaryMessage: string = '';
    public tablesMessage: string = '';
    public verdictMessage: string = '';
    public correctAnswerMessage: string = '';
    public welcomeMessage: string = '';

    // Configuration
    public indicative: boolean = true;
    public imperfect: boolean = true;
    public noun: boolean = true;

    // Noun Generator
    private nounGenerator: NounGenerator = new NounGenerator();
    private verbGenerator: VerbGenerator = new VerbGenerator();
    private prepGenerator: PrepGenerator = new PrepGenerator();

    constructor() {
        // this.generateQuestion();
    }

    // Session Stats
    public stats: Stats = {
        correct: 0,
        accent: 0,
        incorrect: 0,
    };

    // Constants
    private readonly VERDICT = {
        correct: "✅ Correct",
        accent: "🟨 Correct except for accents",
        incorrect: "🟥 Incorrect",
    };

    // Current question
    public currentQuestion: Question = {
        type: 'noun',
        prompt: '',
        answer: '',
    };


    // Public methods
    public startNewSession(): void {
        this.resetStats();
    }

    public generateQuestion(questionType: string): Question {
        this.currentQuestion = this.makeQuestion(questionType);
        return this.currentQuestion;
    }

    public evaluateAnswer(userAnswer: string): 'correct' | 'accent' | 'incorrect' {
        if (!this.currentQuestion) {
            throw new Error('No current question to evaluate');
        }

        const verdict = this.judge(userAnswer, this.currentQuestion.answer);
        this.updateStats(verdict);

        this.verdictMessage = this.VERDICT[verdict] || this.VERDICT.incorrect;
        this.correctAnswerMessage = `Correct: ${this.currentQuestion.answer}`;

        return verdict;
    }

    public getSummary(): void {
        this.summaryMessage = this.printSummary();
    }

    public getTables(): void {
        this.tablesMessage = this.printSummaryTables();
    }

    public getCurrentPrompt(): string {
        if (!this.currentQuestion) {
            return '';
        }

        const total = this.stats.correct + this.stats.accent + this.stats.incorrect;
        return `\n${total} - ${this.stats.correct},${this.stats.accent} ` + "—".repeat(60) + "\n" + this.currentQuestion.prompt;
    }

    // Private methods
    private resetStats(): void {
        this.stats = {
            correct: 0,
            accent: 0,
            incorrect: 0,
        };
    }


    private printSummary(): string {
        const total = this.stats.correct + this.stats.accent + this.stats.incorrect;
        let summary = "\n=== Session Summary ===\n";
        summary += `Total answered: ${total}\n`;
        summary += `  ✅ Correct:               ${this.stats.correct}\n`;
        summary += `  🟨 Correct except accents: ${this.stats.accent}\n`;
        summary += `  🟥 Incorrect:             ${this.stats.incorrect}\n`;

        if (total > 0) {
            const pct = (n: number) => ((n / total) * 100).toFixed(1) + "%";
            summary += "\nPercentages:\n";
            summary += `  ✅ Correct:               ${pct(this.stats.correct)}\n`;
            summary += `  🟨 Correct except accents: ${pct(this.stats.accent)}\n`;
            summary += `  🟥 Incorrect:             ${pct(this.stats.incorrect)}\n`;
        }
        summary += "=======================\n";
        return summary;
    }

    private printSummaryTables(): string {
        const line = "—".repeat(60);
        let tables = "\n" + line + "\n";
        tables += "DECLENSION & CONJUGATION SUMMARY (Quick Reference)\n";
        tables += line + "\n";

        tables += "\nFirst Declension (primarily feminine)\n";
        tables += "+-----------+-------------------------+\n";
        tables += "| Case      | Endings (sg / pl)      |\n";
        tables += "+-----------+-------------------------+\n";
        tables += "| Nom       | η / αι   or  α / αι     |\n";
        tables += "| Gen       | ης / ῶν  or  ας / ῶν    |\n";
        tables += "| Dat       | ῃ / αις or  ᾳ / αις     |\n";
        tables += "| Acc       | ην / ᾱς or  αν / ᾱς     |\n";
        tables += "+-----------+-------------------------+\n";

        tables += "\nSecond Declension (masc. / neut.)\n";
        tables += "+-----------+------------------------------+\n";
        tables += "| Case      | Masc (sg/pl) | Neut (sg/pl)  |\n";
        tables += "+-----------+------------------------------+\n";
        tables += "| Nom       | ος / οι      | ον / α        |\n";
        tables += "| Gen       | ου / ων      | ου / ων       |\n";
        tables += "| Dat       | ῳ / οις      | ῳ / οις       |\n";
        tables += "| Acc       | ον / ους     | ον / α        |\n";
        tables += "+-----------+------------------------------+\n";

        tables += "\nPresent Indicative Endings (-ω verbs)\n";
        tables += "+---------------------------+---------------------------+\n";
        tables += "| Active                    | Middle/Passive            |\n";
        tables += "+---------------------------+---------------------------+\n";
        tables += "| 1sg  -ω                   | 1sg  -ομαι                |\n";
        tables += "| 2sg  -εις                 | 2sg  -ῃ / -ει             |\n";
        tables += "| 3sg  -ει                  | 3sg  -εται                |\n";
        tables += "| 1pl  -ομεν                | 1pl  -όμεθα               |\n";
        tables += "| 2pl  -ετε                 | 2pl  -εσθε                |\n";
        tables += "| 3pl  -ουσι(ν)             | 3pl  -ονται               |\n";
        tables += "+---------------------------+---------------------------+\n";

        tables += "\nImperfect Indicative (ω-verbs; with augment ἐ-)\n";
        tables += "+-----------------------+-----------------------------+\n";
        tables += "| Active                | Middle/Passive              |\n";
        tables += "+-----------------------+-----------------------------+\n";
        tables += "| 1sg  -ον   (ἔλυον)    | 1sg  -όμην (ἐλυόμην)        |\n";
        tables += "| 2sg  -ες   (ἔλυες)    | 2sg  -ου   (ἐλύου)          |\n";
        tables += "| 3sg  -ε(ν) (ἔλυε[ν])  | 3sg  -ετο  (ἐλύετο)         |\n";
        tables += "| 1pl  -ομεν(ἐλύομεν)   | 1pl  -όμεθα(ἐλυόμεθα)       |\n";
        tables += "| 2pl  -ετε (ἐλύετε)    | 2pl  -εσθε (ἐλύεσθε)        |\n";
        tables += "| 3pl  -ον   (ἔλυον)    | 3pl  -οντο (ἐλύοντο)        |\n";
        tables += "+-----------------------+-----------------------------+\n";

        tables += "\nContract Verb Quick Map (present active):";
        tables += "+--------------+-------------------------------+\n";
        tables += "| Type         | Sample endings (3sg / 3pl)    |\n";
        tables += "+--------------+-------------------------------+\n";
        tables += "| -άω (ao)     | -ᾷ / -ῶσι(ν)                  |\n";
        tables += "| -έω (eo)     | -εῖ / -οῦσι(ν)                |\n";
        tables += "| -όω (oo)     | -οῖ / -οῦσι(ν)                |\n";
        tables += "+--------------+-------------------------------+\n";

        tables += line + "\n";
        return tables;
    }

    private stripDiacritics(str: string): string {
        if (!str) return str;
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\u037a/g, "")
            .replace(/\u0345/g, "")
            .replace(/[·]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    private tidy(str: string): string {
        return (str || "").replace(/\s+/g, " ").trim();
    }

    private judge(user: string, correct: string): 'correct' | 'accent' | 'incorrect' {
        const u = this.tidy(user);
        const c = this.tidy(correct);
        if (u === c) return "correct";
        if (this.stripDiacritics(u) === this.stripDiacritics(c)) return "accent";
        return "incorrect";
    }


    private updateStats(verdict: 'correct' | 'accent' | 'incorrect'): void {
        if (verdict === "correct") this.stats.correct++;
        else if (verdict === "accent") this.stats.accent++;
        else this.stats.incorrect++;
    }


    private makeQuestion(questionType: string): Question {
        switch (questionType) {
            case "noun":
                return this.nounGenerator.makeNounQuestion();
            case "indicative":
                return this.verbGenerator.makeIndicativeQuestion();
            case "imperfect":
                return this.verbGenerator.makeImperfectQuestion();
            case "preposition":
                return this.prepGenerator.makePrepositionQuestion();
            case "aorist":
                return this.nounGenerator.makeNounQuestion();
            default:
                return this.nounGenerator.makeNounQuestion();
        }
    }
}
