
import { Question } from "./question";
import { NounEntry } from "./noun-entry";
import { NOUNS } from './nouns';

// Interfaces

interface NounForm {
    nom: string;
    gen: string;
    dat: string;
    acc: string;
}

interface ArticleForms {
    sg: { m: NounForm; f: NounForm; n: NounForm };
    pl: { m: NounForm; f: NounForm; n: NounForm };
}

interface NounPattern {
    endings: {
        sg: NounForm;
        pl: NounForm;
    };
}

interface ExceptionForms {
    [key: string]: {
        gender: 'm' | 'f' | 'n';
        forms: {
            sg: NounForm;
            pl: NounForm;
        };
    };
}

export class NounGenerator {
    // Constants
    private readonly CASES: ('nom' | 'gen' | 'dat' | 'acc')[] = ["nom", "gen", "dat", "acc"];
    private readonly NUMBERS: ('sg' | 'pl')[] = ["sg", "pl"];

    // Articles
    private readonly ARTICLES: ArticleForms = {
        sg: {
            m: { nom: "ὁ", gen: "τοῦ", dat: "τῷ", acc: "τὸν" },
            f: { nom: "ἡ", gen: "τῆς", dat: "τῇ", acc: "τὴν" },
            n: { nom: "τὸ", gen: "τοῦ", dat: "τῷ", acc: "τὸ" },
        },
        pl: {
            m: { nom: "οἱ", gen: "τῶν", dat: "τοῖς", acc: "τοὺς" },
            f: { nom: "αἱ", gen: "τῶν", dat: "ταῖς", acc: "τὰς" },
            n: { nom: "τὰ", gen: "τῶν", dat: "τοῖς", acc: "τὰ" },
        },
    };

    // Noun Patterns
    private readonly NOUN_PATTERNS: { [key: string]: NounPattern } = {
        "1f_eta": {
            endings: {
                sg: { nom: "ή", gen: "ῆς", dat: "ῇ", acc: "ήν" },
                pl: { nom: "αί", gen: "ῶν", dat: "αῖς", acc: "άς" },
            },
        },
        "1f_alpha": {
            endings: {
                sg: { nom: "α", gen: "ας", dat: "ᾳ", acc: "αν" },
                pl: { nom: "αι", gen: "ῶν", dat: "αis", acc: "ᾱς" },
            },
        },
        "2m": {
            endings: {
                sg: { nom: "ος", gen: "ου", dat: "ῳ", acc: "ον" },
                pl: { nom: "οι", gen: "ων", dat: "οis", acc: "ους" },
            },
        },
        "2n": {
            endings: {
                sg: { nom: "ον", gen: "ου", dat: "ῳ", acc: "ον" },
                pl: { nom: "α", gen: "ων", dat: "οis", acc: "α" },
            },
        },
    };

    // Exception Forms
    private readonly NOOUN_EXCEPTION_FORMS: ExceptionForms = {
        "φωνή": {
            gender: "f",
            forms: {
                sg: { nom: "ἡ φωνή", gen: "τῆς φωνῆς", dat: "τῇ φωνῇ", acc: "τὴν φωνήν" },
                pl: { nom: "αἱ φωναί", gen: "τῶν φωνῶν", dat: "ταῖς φωναῖς", acc: "τὰς φωνάς" },
            },
        },
        "καρδία": {
            gender: "f",
            forms: {
                sg: { nom: "ἡ καρδία", gen: "τῆς καρδίας", dat: "τῇ καρδίᾳ", acc: "τὴν καρδίαν" },
                pl: { nom: "αἱ καρδίαι", gen: "τῶν καρδιῶν", dat: "ταῖς καρδίαις", acc: "τὰς καρδίας" },
            },
        },
        "δόξα": {
            gender: "f",
            forms: {
                sg: { nom: "ἡ δόξα", gen: "τῆς δόξης", dat: "τῇ δόξῃ", acc: "τὴν δόξαν" },
                pl: { nom: "αἱ δόξαι", gen: "τῶν δοξῶν", dat: "ταῖς δόξαις", acc: "τὰς δόξας" },
            },
        },
        "ἁμαρτία": {
            gender: "f",
            forms: {
                sg: { nom: "ἡ ἁμαρτία", gen: "τῆς ἁμαρτίας", dat: "τῇ ἁμαρτίᾳ", acc: "τὴν ἁμαρτίαν" },
                pl: { nom: "αἱ ἁμαρτίαι", gen: "τῶν ἁμαρτιῶν", dat: "ταῖς ἁμαρτίαις", acc: "τὰς ἁμαρτίας" },
            },
        },
    };

    // Computed property
    private get SUPPORTED_NOUNS(): NounEntry[] {
        return NOUNS.filter(n => n.supported);
    }

    // Utility method
    private rand<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Decline a noun with article
    private declineNoun(nounEntry: NounEntry, kase: 'nom' | 'gen' | 'dat' | 'acc', number: 'sg' | 'pl'): string | null {
        const { lemma, gender, pattern } = nounEntry;
        const ex = this.NOOUN_EXCEPTION_FORMS[lemma];
        if (ex?.forms?.[number]?.[kase]) return ex.forms[number][kase];

        const pat = this.NOUN_PATTERNS[pattern];
        if (!pat) return null;
        const art = this.ARTICLES[number][gender]?.[kase];
        if (!art) return null;

        const nomEnding = pat.endings.sg.nom;
        if (!lemma.endsWith(nomEnding)) return null;
        const stem = lemma.slice(0, -nomEnding.length);
        const end = pat.endings[number][kase];
        return `${art} ${stem}${end}`;
    }

    // Create a noun question
    public makeNounQuestion(): Question {
        const n = this.rand(this.SUPPORTED_NOUNS);
        const kase = this.rand(this.CASES);
        const number = this.rand(this.NUMBERS);
        const correct = this.declineNoun(n, kase, number);
        if (!correct) return this.makeNounQuestion();
        const niceCase = { nom: "nominative", gen: "genitive", dat: "dative", acc: "accusative" }[kase];
        const niceNum = number === "sg" ? "singular" : "plural";
        return {
            type: "noun",
            prompt: `Decline **${n.lemma}** → ${niceNum} ${niceCase} (${n.gloss})`,
            answer: correct,
        };
    }
}