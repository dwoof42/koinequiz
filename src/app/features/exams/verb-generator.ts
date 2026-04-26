import { Question } from "./question";
interface VerbEntry {
    lemma: string;
    gloss: string;
    type: 'omega' | 'contract_ao' | 'contract_eo' | 'mi' | 'deponent_mid';
    supported: boolean;
    stem?: string;
}

interface VerbTable {
    act?: { [key: string]: string };
    mid?: { [key: string]: string };
}

interface VerbTables {
    [key: string]: VerbTable;
}

type VerbTense = 'pres' | 'impf';

export class VerbGenerator {

    private readonly VERBS: VerbEntry[] = [
        { lemma: "λέγω", gloss: "say", type: "omega", supported: true, stem: "λέγ" },
        { lemma: "ἀκούω", gloss: "hear", type: "omega", supported: true, stem: "ἀκού" },
        { lemma: "βλέπω", gloss: "see", type: "omega", supported: true, stem: "βλέπ" },
        { lemma: "γράφω", gloss: "write", type: "omega", supported: true, stem: "γράφ" },
        { lemma: "ἔχω", gloss: "have", type: "omega", supported: true, stem: "ἔχ" },
        { lemma: "πιστεύω", gloss: "believe", type: "omega", supported: true, stem: "πιστεύ" },
        { lemma: "ἀγαπάω", gloss: "love", type: "contract_ao", supported: true, stem: "ἀγαπ" },
        { lemma: "ποιέω", gloss: "do, make", type: "contract_eo", supported: true, stem: "ποι" },
        { lemma: "καλέω", gloss: "call", type: "contract_eo", supported: true, stem: "καλ" },
        { lemma: "δοξάζω", gloss: "glorify", type: "omega", supported: true, stem: "δοξάζ" },
        { lemma: "μένω", gloss: "remain", type: "omega", supported: true, stem: "μέν" },
        { lemma: "δίδωμι", gloss: "give", type: "mi", supported: true },
        { lemma: "ἀφίημι", gloss: "forgive, let go", type: "mi", supported: true },
        { lemma: "ἔρχομαι", gloss: "come, go", type: "deponent_mid", supported: true, stem: "ἔρχ" },
        { lemma: "πορεύομαι", gloss: "go, travel", type: "deponent_mid", supported: true, stem: "πορεύ" },
    ];

    // Imperfect Verb Tables
    private readonly IMPF_VERB_TABLES: VerbTables = {
        "λέγω": {
            act: {
                "1s": "ἔλεγον",
                "2s": "ἔλεγες",
                "3s": "ἔλεγε(ν)",
                "1p": "ἐλέγομεν",
                "2p": "ἐλέγετε",
                "3p": "ἔλεγον",
            },
        },
        "ἀκούω": {
            act: {
                "1s": "ἤκουον",
                "2s": "ἤκουες",
                "3s": "ἤκουεν",
                "1p": "ἠκούομεν",
                "2p": "ἠκούετε",
                "3p": "ἤκουον",
            },
        },
        "βλέπω": {
            act: {
                "1s": "ἔβλεπον",
                "2s": "ἔβλεπες",
                "3s": "ἔβλεπε(ν)",
                "1p": "ἐβλέπομεν",
                "2p": "ἐβλέπετε",
                "3p": "ἔβλεπον",
            },
        },
        "γράφω": {
            act: {
                "1s": "ἔγραφον",
                "2s": "ἔγραφες",
                "3s": "ἔγραφε(ν)",
                "1p": "ἐγράφομεν",
                "2p": "ἐγράφετε",
                "3p": "ἔγραφον",
            },
        },
        "ἔχω": {
            act: {
                "1s": "εἶχον",
                "2s": "εἶχες",
                "3s": "εἶχε(ν)",
                "1p": "εἴχομεν",
                "2p": "εἴχετε",
                "3p": "εἶχον",
            },
        },
        "πιστεύω": {
            act: {
                "1s": "ἐπίστευον",
                "2s": "ἐπίστευες",
                "3s": "ἐπίστευε(ν)",
                "1p": "ἐπιστεύομεν",
                "2p": "ἐπιστεύετε",
                "3p": "ἐπίστευον",
            },
        },
        "δοξάζω": {
            act: {
                "1s": "ἐδόξαζον",
                "2s": "ἐδόξαζες",
                "3s": "ἐδόξαζε(ν)",
                "1p": "ἐδοξάζομεν",
                "2p": "ἐδοξάζετε",
                "3p": "ἐδόξαζον",
            },
        },
        "μένω": {
            act: {
                "1s": "ἔμενον",
                "2s": "ἔμενες",
                "3s": "ἔμενε(ν)",
                "1p": "ἐμένομεν",
                "2p": "ἐμένετε",
                "3p": "ἔμενον",
            },
        },
        "ἀγαπάω": {
            act: {
                "1s": "ἠγάπων",
                "2s": "ἠγάπας",
                "3s": "ἠγάπα",
                "1p": "ἠγαπῶμεν",
                "2p": "ἠγαπᾶτε",
                "3p": "ἠγάπων",
            },
        },
        "ποιέω": {
            act: {
                "1s": "ἐποίουν",
                "2s": "ἐποίεις",
                "3s": "ἐποίει",
                "1p": "ἐποιοῦμεν",
                "2p": "ἐποιεῖτε",
                "3p": "ἐποίουν",
            },
        },
        "καλέω": {
            act: {
                "1s": "ἐκάλουν",
                "2s": "ἐκάλεις",
                "3s": "ἐκάλει",
                "1p": "ἐκαλοῦμεν",
                "2p": "ἐκαλεῖτε",
                "3p": "ἐκάλουν",
            },
        },
        "ἔρχομαι": {
            mid: {
                "1s": "ἠρχόμην",
                "2s": "ἤρχου",
                "3s": "ἤρχετο",
                "1p": "ἠρχόμεθα",
                "2p": "ἤρχεσθε",
                "3p": "ἤρχοντο",
            },
        },
        "πορεύομαι": {
            mid: {
                "1s": "ἐπορευόμην",
                "2s": "ἐπορεύου",
                "3s": "ἐπορεύετο",
                "1p": "ἐπορευόμεθα",
                "2p": "ἐπορεύεσθε",
                "3p": "ἐπορεύοντο",
            },
        },
    };

    // Computed properties

    private get SUPPORTED_VERBS(): VerbEntry[] {
        return this.VERBS;
    }

    private get SUPPORTED_IMPF_VERBS(): VerbEntry[] {
        return this.SUPPORTED_VERBS.filter(v => this.IMPF_VERB_TABLES[v.lemma]);
    }

    private readonly PERSONS: ('1' | '2' | '3')[] = ["1", "2", "3"];
    private readonly NUMBERS: ('sg' | 'pl')[] = ["sg", "pl"];

    // Present active endings
    private readonly END_ACTIVE_PRES: { [key: string]: string } = {
        "1s": "ω",
        "2s": "εις",
        "3s": "ει",
        "1p": "ομεν",
        "2p": "ετε",
        "3p": "ουσιν",
    };

    // MI Verb Tables
    private readonly MI_VERB_TABLES: VerbTables = {
        "δίδωμι": {
            act: {
                "1s": "δίδωμι",
                "2s": "δίδως",
                "3s": "δίδωσιν",
                "1p": "δίδομεν",
                "2p": "δίδοτε",
                "3p": "διδόᾱσιν",
            },
        },
        "ἀφίημι": {
            act: {
                "1s": "ἀφίημι",
                "2s": "ἀφίεις",
                "3s": "ἀφίησι(ν)",
                "1p": "ἀφίεμεν",
                "2p": "ἀφίετε",
                "3p": "ἀφίουσιν",
            },
        },
    };


    private contractAlphaPres(stem: string, person: string): string {
        const map: { [key: string]: string } = {
            "1s": "ῶ", "2s": "ᾷς", "3s": "ᾷ",
            "1p": "ῶμεν", "2p": "ᾶτε", "3p": "ῶσι(ν)",
        };
        return stem + map[person];
    }

    private contractEpsilonPres(stem: string, person: string): string {
        const map: { [key: string]: string } = {
            "1s": "ῶ", "2s": "εῖς", "3s": "εῖ",
            "1p": "οῦμεν", "2p": "εῖτε", "3p": "οῦσι(ν)",
        };
        return stem + map[person];
    }




    private rand<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    private conjugateVerbPresent(verbEntry: VerbEntry, person: '1' | '2' | '3', number: 'sg' | 'pl', voice: 'act' | 'mid'): string | null {
        const key = `${person}${number === "sg" ? "s" : "p"}`;
        const base = verbEntry.lemma;
        const type = verbEntry.type;

        if (type === "mi") {
            if (voice !== "act") return null;
            const tbl = this.MI_VERB_TABLES[base];
            if (!tbl) return null;
            return tbl.act?.[key] || null;
        }

        const stem = verbEntry.stem || base.replace(/ω$/, "");
        const isDeponent = type === "deponent_mid";

        if (isDeponent) {
            if (voice !== "mid") return null;
            const presMid: { [key: string]: string } = {
                "1s": stem + "ομαι",
                "2s": stem + "ῃ",
                "3s": stem + "εται",
                "1p": stem + "όμεθα",
                "2p": stem + "εσθε",
                "3p": stem + "ονται",
            };
            return presMid[key];
        }

        if (voice === "act") {
            if (type === "omega") {
                return stem + this.END_ACTIVE_PRES[key];
            } else if (type === "contract_ao") {
                return this.contractAlphaPres(stem, key);
            } else if (type === "contract_eo") {
                return this.contractEpsilonPres(stem, key);
            }
        } else if (voice === "mid") {
            const presMid: { [key: string]: string } = {
                "1s": stem + "ομαι",
                "2s": stem + "ῃ",
                "3s": stem + "εται",
                "1p": stem + "όμεθα",
                "2p": stem + "εσθε",
                "3p": stem + "ονται",
            };
            return presMid[key];
        }

        return null;
    }

    private conjugateVerbImperfect(verbEntry: VerbEntry, person: '1' | '2' | '3', number: 'sg' | 'pl', voice: 'act' | 'mid'): string | null {
        const key = `${person}${number === "sg" ? "s" : "p"}`;
        const base = verbEntry.lemma;
        const tbl = this.IMPF_VERB_TABLES[base];
        if (!tbl) return null;
        if (voice === "act" && tbl.act) return tbl.act[key];
        if (voice === "mid" && tbl.mid) return tbl.mid[key];
        return null;
    }

    private conjugateVerb(verbEntry: VerbEntry, person: '1' | '2' | '3', number: 'sg' | 'pl', voice: 'act' | 'mid', tense: 'pres' | 'impf'): string | null {
        if (tense === "pres") return this.conjugateVerbPresent(verbEntry, person, number, voice);
        if (tense === "impf") return this.conjugateVerbImperfect(verbEntry, person, number, voice);
        return null;
    }


    private contractTypeLabel(t: string): string {
        return t === "contract_ao" ? "-άω"
            : t === "contract_eo" ? "-έω"
                : "";
    }




    private makeVerbQuestion(verbsPool: VerbEntry[], tense: VerbTense): Question {

        const v = this.rand(verbsPool);

        let voice: 'act' | 'mid';
        if (tense === "impf") {
            if (v.type === "deponent_mid") voice = "mid";
            else voice = "act";
        } else {
            if (v.type === "deponent_mid") voice = "mid";
            else voice = "act";
        }

        const person = this.rand(this.PERSONS);
        const number = this.rand(this.NUMBERS);
        const form = this.conjugateVerb(v, person, number, voice, tense);
        if (!form) return this.makeVerbQuestion(verbsPool, tense);

        const nicePers = { "1": "1st", "2": "2nd", "3": "3rd" }[person];
        const niceNum = number === "sg" ? "singular" : "plural";
        const tenseLabel = tense === "pres" ? "present indicative" : "imperfect indicative";
        const voiceLabel = voice === "act" ? "active" : "middle/passive";
        const label = this.contractTypeLabel(v.type);

        return {
            type: "verb",
            prompt: `Conjugate **${v.lemma}** ; ${label} → ${nicePers} ${niceNum} ${tenseLabel} ${voiceLabel} (${v.gloss})`,
            answer: form,
        };
    }

    public makeIndicativeQuestion(): Question {
        const verbsPool = this.SUPPORTED_VERBS;
        const tense = "pres";
        return this.makeVerbQuestion(verbsPool, tense);
    }

    public makeImperfectQuestion(): Question {
        const verbsPool = this.SUPPORTED_IMPF_VERBS;
        const tense = "impf";
        return this.makeVerbQuestion(verbsPool, tense);
    }



}