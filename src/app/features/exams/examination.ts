import { Question } from "./question";

// Interfaces
interface Stats {
    correct: number;
    accent: number;
    incorrect: number;
}

interface NounEntry {
    lemma: string;
    gloss: string;
    gender: 'm' | 'f' | 'n';
    pattern: string;
    supported: boolean;
}

interface VerbEntry {
    lemma: string;
    gloss: string;
    type: 'omega' | 'contract_ao' | 'contract_eo' | 'mi' | 'deponent_mid';
    supported: boolean;
    stem?: string;
}

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

interface VerbTable {
    act?: { [key: string]: string };
    mid?: { [key: string]: string };
}

interface VerbTables {
    [key: string]: VerbTable;
}

type VerbTense = 'pres' | 'impf';

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

    private readonly CASES: ('nom' | 'gen' | 'dat' | 'acc')[] = ["nom", "gen", "dat", "acc"];
    private readonly NUMBERS: ('sg' | 'pl')[] = ["sg", "pl"];
    private readonly PERSONS: ('1' | '2' | '3')[] = ["1", "2", "3"];

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
                pl: { nom: "αι", gen: "ῶν", dat: "αις", acc: "ᾱς" },
            },
        },
        "2m": {
            endings: {
                sg: { nom: "ος", gen: "ου", dat: "ῳ", acc: "ον" },
                pl: { nom: "οι", gen: "ων", dat: "οις", acc: "ους" },
            },
        },
        "2n": {
            endings: {
                sg: { nom: "ον", gen: "ου", dat: "ῳ", acc: "ον" },
                pl: { nom: "α", gen: "ων", dat: "οις", acc: "α" },
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

    // Present active endings
    private readonly END_ACTIVE_PRES: { [key: string]: string } = {
        "1s": "ω",
        "2s": "εις",
        "3s": "ει",
        "1p": "ομεν",
        "2p": "ετε",
        "3p": "ουσι(ν)",
    };

    // MI Verb Tables
    private readonly MI_VERB_TABLES: VerbTables = {
        "δίδωμι": {
            act: {
                "1s": "δίδωμι",
                "2s": "δίδως",
                "3s": "δίδωσι(ν)",
                "1p": "δίδομεν",
                "2p": "δίδοτε",
                "3p": "διδόᾱσι(ν)",
            },
        },
        "ἀφίημι": {
            act: {
                "1s": "ἀφίημι",
                "2s": "ἀφίεις",
                "3s": "ἀφίησι(ν)",
                "1p": "ἀφίεμεν",
                "2p": "ἀφίετε",
                "3p": "ἀφίουσι(ν)",
            },
        },
    };

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

    // Vocabulary
    private readonly NOUNS: NounEntry[] =
        [
            { lemma: "λόγος", gloss: "word", gender: "m", pattern: "2m", supported: true },
            { lemma: "θεός", gloss: "God, god", gender: "m", pattern: "2m", supported: true },
            { lemma: "κύριος", gloss: "lord, master", gender: "m", pattern: "2m", supported: true },
            { lemma: "ἄνθρωπος", gloss: "man, person", gender: "m", pattern: "2m", supported: true },
            { lemma: "υἱός", gloss: "son", gender: "m", pattern: "2m", supported: true },
            { lemma: "δοῦλος", gloss: "slave, servant", gender: "m", pattern: "2m", supported: true },
            { lemma: "ἔργον", gloss: "work, deed", gender: "n", pattern: "2n", supported: true },
            { lemma: "δῶρον", gloss: "gift", gender: "n", pattern: "2n", supported: true },
            { lemma: "τέκνον", gloss: "child", gender: "n", pattern: "2n", supported: true },
            { lemma: "φωνή", gloss: "voice", gender: "f", pattern: "1f_eta", supported: true },
            { lemma: "χώρα", gloss: "land", gender: "f", pattern: "1f_alpha", supported: true },
            { lemma: "καρδία", gloss: "heart", gender: "f", pattern: "1f_alpha", supported: true },
            { lemma: "δόξα", gloss: "glory", gender: "f", pattern: "1f_alpha", supported: true },
            { lemma: "ἁμαρτία", gloss: "sin", gender: "f", pattern: "1f_alpha", supported: true },

            { lemma: "πνεῦμα", gloss: "spirit", gender: "n", pattern: "3n", supported: false },
            { lemma: "πατήρ", gloss: "father", gender: "m", pattern: "3m", supported: false },
            { lemma: "γυνή", gloss: "woman", gender: "f", pattern: "3f", supported: false },
            { lemma: "ἀνήρ", gloss: "man (male)", gender: "m", pattern: "3m", supported: false },
            { lemma: "ὄνομα", gloss: "name", gender: "n", pattern: "3n", supported: false },
            { lemma: "οὐρανός", gloss: "heaven", gender: "m", pattern: "2m", supported: false },
            { lemma: "γῆ", gloss: "earth, land", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "οἶκος", gloss: "house", gender: "m", pattern: "2m", supported: false },
            { lemma: "ὁδός", gloss: "way, road", gender: "f", pattern: "2m", supported: false },
            { lemma: "ἀδελφός", gloss: "brother", gender: "m", pattern: "2m", supported: false },
            { lemma: "ἀγάπη", gloss: "love", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "πίστις", gloss: "faith", gender: "f", pattern: "3f", supported: false },
            { lemma: "βασιλεία", gloss: "kingdom", gender: "f", pattern: "1f_alpha", supported: false },
            { lemma: "ζωή", gloss: "life", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "κόσμος", gloss: "world", gender: "m", pattern: "2m", supported: false },
            { lemma: "νόμος", gloss: "law", gender: "m", pattern: "2m", supported: false },
            { lemma: "μαθητής", gloss: "disciple", gender: "m", pattern: "1m", supported: false },
            { lemma: "ἄγγελος", gloss: "angel", gender: "m", pattern: "3m", supported: false },
            { lemma: "θάνατος", gloss: "death", gender: "m", pattern: "2m", supported: false },
            { lemma: "ἐκκλησία", gloss: "assembly, church", gender: "f", pattern: "1f_alpha", supported: false },
            { lemma: "χάρις", gloss: "grace", gender: "f", pattern: "3f", supported: false },
            { lemma: "εἰρήνη", gloss: "peace", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "προφήτης", gloss: "prophet", gender: "m", pattern: "1m", supported: false },
            { lemma: "γραφὴ", gloss: "writing, Scripture", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "σῶμα", gloss: "body", gender: "n", pattern: "3n", supported: false },
            { lemma: "πόλις", gloss: "city", gender: "f", pattern: "3f", supported: false },
            { lemma: "πλοῖον", gloss: "boat", gender: "n", pattern: "2n", supported: false },
            { lemma: "οἶνος", gloss: "wine", gender: "m", pattern: "2m", supported: false },
            { lemma: "ἄρτος", gloss: "bread", gender: "m", pattern: "2m", supported: false },
            { lemma: "σημεῖον", gloss: "sign", gender: "n", pattern: "2n", supported: false },
            { lemma: "χειρ", gloss: "hand", gender: "f", pattern: "3f", supported: false },
            { lemma: "ποὺς", gloss: "foot", gender: "m", pattern: "3m", supported: false },
            { lemma: "ὕδωρ", gloss: "water", gender: "n", pattern: "3n", supported: false },
            { lemma: "ἱερόν", gloss: "temple", gender: "n", pattern: "2n", supported: false },
            { lemma: "ναός", gloss: "temple (inner)", gender: "m", pattern: "2m", supported: false },
            { lemma: "ἡμέρα", gloss: "day", gender: "f", pattern: "1f_alpha", supported: false },
            { lemma: "ἀρχιερεύς", gloss: "high priest", gender: "m", pattern: "3m", supported: false },
            { lemma: "βίβλος", gloss: "book", gender: "f", pattern: "2m", supported: false },
            { lemma: "ψυχή", gloss: "soul, life", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "ὄχλος", gloss: "crowd", gender: "m", pattern: "2m", supported: false },
            { lemma: "θυγάτηρ", gloss: "daughter", gender: "f", pattern: "3f", supported: false },
            { lemma: "μήτηρ", gloss: "mother", gender: "f", pattern: "3f", supported: false },
            { lemma: "ἀλήθεια", gloss: "truth", gender: "f", pattern: "1f_alpha", supported: false },
            { lemma: "σάββατον", gloss: "Sabbath", gender: "n", pattern: "2n", supported: false },

            { lemma: "Ἰησοῦς", gloss: "Jesus", gender: "m", pattern: "3m", supported: false },
            { lemma: "Χριστός", gloss: "Christ, Messiah", gender: "m", pattern: "2m", supported: false },
            { lemma: "εὐαγγέλιον", gloss: "good news, gospel", gender: "n", pattern: "2n", supported: false },
            { lemma: "ἀπόστολος", gloss: "apostle, envoy", gender: "m", pattern: "2m", supported: false },
            { lemma: "διδάσκαλος", gloss: "teacher", gender: "m", pattern: "2m", supported: false },
            { lemma: "ὄρος", gloss: "mountain", gender: "n", pattern: "3n", supported: false },
            { lemma: "θάλασσα", gloss: "sea", gender: "f", pattern: "1f_alpha", supported: false },
            { lemma: "ποταμός", gloss: "river", gender: "m", pattern: "2m", supported: false },
            { lemma: "λίμνη", gloss: "lake", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "πῦρ", gloss: "fire", gender: "n", pattern: "3n", supported: false },
            { lemma: "λίθος", gloss: "stone", gender: "m", pattern: "2m", supported: false },
            { lemma: "δένδρον", gloss: "tree", gender: "n", pattern: "2n", supported: false },
            { lemma: "καρπός", gloss: "fruit", gender: "m", pattern: "2m", supported: false },
            { lemma: "σπέρμα", gloss: "seed", gender: "n", pattern: "3n", supported: false },
            { lemma: "ἀγρός", gloss: "field", gender: "m", pattern: "2m", supported: false },
            { lemma: "ὀφθαλμός", gloss: "eye", gender: "m", pattern: "2m", supported: false },
            { lemma: "στόμα", gloss: "mouth", gender: "n", pattern: "3n", supported: false },
            { lemma: "ὠτίον", gloss: "ear", gender: "n", pattern: "2n", supported: false },
            { lemma: "γλῶσσα", gloss: "tongue, language", gender: "f", pattern: "1f_alpha", supported: false },
            { lemma: "χείρ", gloss: "hand", gender: "f", pattern: "3f", supported: false },
            { lemma: "πρόσωπον", gloss: "face, person", gender: "n", pattern: "2n", supported: false },
            { lemma: "κεφαλή", gloss: "head", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "ἱμάτιον", gloss: "garment, cloak", gender: "n", pattern: "2n", supported: false },
            { lemma: "ὑπόδημα", gloss: "sandal", gender: "n", pattern: "3n", supported: false },
            { lemma: "ἥλιος", gloss: "sun", gender: "m", pattern: "2m", supported: false },
            { lemma: "σελήνη", gloss: "moon", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "ἄστρον", gloss: "star", gender: "n", pattern: "2n", supported: false },
            { lemma: "χρόνος", gloss: "time", gender: "m", pattern: "2m", supported: false },
            { lemma: "καιρός", gloss: "season, opportune time", gender: "m", pattern: "2m", supported: false },
            { lemma: "ἔτος", gloss: "year", gender: "n", pattern: "3n", supported: false },
            { lemma: "τόπος", gloss: "place", gender: "m", pattern: "2m", supported: false },
            { lemma: "ἔθνος", gloss: "nation, Gentiles", gender: "n", pattern: "3n", supported: false },
            { lemma: "λαός", gloss: "people", gender: "m", pattern: "2m", supported: false },
            { lemma: "βασιλεύς", gloss: "king", gender: "m", pattern: "3m", supported: false },
            { lemma: "ἱερεύς", gloss: "priest", gender: "m", pattern: "3m", supported: false },
            { lemma: "θρόνος", gloss: "throne", gender: "m", pattern: "2m", supported: false },
            { lemma: "σταυρός", gloss: "cross", gender: "m", pattern: "2m", supported: false },
            { lemma: "μαρτυρία", gloss: "testimony", gender: "f", pattern: "1f_alpha", supported: false },
            { lemma: "ἐντολή", gloss: "commandment", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "παραβολή", gloss: "parable", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "σοφία", gloss: "wisdom", gender: "f", pattern: "1f_alpha", supported: false },
            { lemma: "ἔλεος", gloss: "mercy", gender: "n", pattern: "3n", supported: false },
            { lemma: "κρίσις", gloss: "judgment", gender: "f", pattern: "3f", supported: false },
            { lemma: "κοινωνία", gloss: "fellowship, sharing", gender: "f", pattern: "1f_alpha", supported: false },
            { lemma: "διαθήκη", gloss: "covenant", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "ἀδελφή", gloss: "sister", gender: "f", pattern: "1f_eta", supported: false },
            { lemma: "ἐχθρός", gloss: "enemy", gender: "m", pattern: "2m", supported: false },
            { lemma: "φίλος", gloss: "friend", gender: "m", pattern: "2m", supported: false },
            { lemma: "ῥῆμα", gloss: "word, saying", gender: "n", pattern: "3n", supported: false },
            { lemma: "πλοῦτος", gloss: "riches, wealth", gender: "m", pattern: "2m", supported: false }
        ];





    private readonly unused_NOUNS: NounEntry[] =
        [
            { lemma: "λόγος", gloss: "word", gender: "m", pattern: "2m", supported: true },
            { lemma: "θεός", gloss: "God, god", gender: "m", pattern: "2m", supported: true },
            { lemma: "κύριος", gloss: "lord, master", gender: "m", pattern: "2m", supported: true },
            { lemma: "ἄνθρωπος", gloss: "man, person", gender: "m", pattern: "2m", supported: true },
            { lemma: "υἱός", gloss: "son", gender: "m", pattern: "2m", supported: true },
            { lemma: "δοῦλος", gloss: "slave, servant", gender: "m", pattern: "2m", supported: true },
            { lemma: "ἔργον", gloss: "work, deed", gender: "n", pattern: "2n", supported: true },
            { lemma: "δῶρον", gloss: "gift", gender: "n", pattern: "2n", supported: true },
            { lemma: "τέκνον", gloss: "child", gender: "n", pattern: "2n", supported: true },
            { lemma: "φωνή", gloss: "voice", gender: "f", pattern: "1f_eta", supported: true },
            { lemma: "χώρα", gloss: "land", gender: "f", pattern: "1f_alpha", supported: true },
            { lemma: "καρδία", gloss: "heart", gender: "f", pattern: "1f_alpha", supported: true },
            { lemma: "δόξα", gloss: "glory", gender: "f", pattern: "1f_alpha", supported: true },
            { lemma: "ἁμαρτία", gloss: "sin", gender: "f", pattern: "1f_alpha", supported: true },
        ];

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

    // Computed properties
    private get SUPPORTED_NOUNS(): NounEntry[] {
        return this.NOUNS.filter(n => n.supported);
    }

    private get SUPPORTED_VERBS(): VerbEntry[] {
        return this.VERBS;
    }

    private get SUPPORTED_IMPF_VERBS(): VerbEntry[] {
        return this.SUPPORTED_VERBS.filter(v => this.IMPF_VERB_TABLES[v.lemma]);
    }

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

    private rand<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    private updateStats(verdict: 'correct' | 'accent' | 'incorrect'): void {
        if (verdict === "correct") this.stats.correct++;
        else if (verdict === "accent") this.stats.accent++;
        else this.stats.incorrect++;
    }

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

    private makeNounQuestion(): Question {
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

    private contractTypeLabel(t: string): string {
        return t === "contract_ao" ? "-άω"
            : t === "contract_eo" ? "-έω"
                : "";
    }

    private makeIndicativeQuestion(): Question {
        const verbsPool = this.SUPPORTED_VERBS;
        const tense = "pres";
        return this.makeVerbQuestion(verbsPool, tense);
    }

    private makeImperfectQuestion(): Question {
        const verbsPool = this.SUPPORTED_IMPF_VERBS;
        const tense = "impf";
        return this.makeVerbQuestion(verbsPool, tense);
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

    private makeQuestion(questionType: string): Question {
        switch (questionType) {
            case "noun":
                return this.makeNounQuestion();
            case "indicative":
                return this.makeIndicativeQuestion();
            case "imperfect":
                return this.makeImperfectQuestion();
            case "preposition":
                return this.makeNounQuestion();
            case "aorist":
                return this.makeNounQuestion();
            default:
                return this.makeNounQuestion();
        }
    }
}
