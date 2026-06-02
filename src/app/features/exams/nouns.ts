import { NounEntry } from './noun-entry';
// Vocabulary
export const NOUNS: NounEntry[] = [
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
    { lemma: "πλοῦτος", gloss: "riches, wealth", gender: "m", pattern: "2m", supported: false },
    {
        lemma: "πίστις",
        gloss: "faith",
        gender: "f",
        pattern: "3f_is",
        supported: true,

        forms: {
            sg: {
                nom: "ἡ πίστις",
                gen: "τῆς πίστεως",
                dat: "τῇ πίστει",
                acc: "τὴν πίστιν"
            },
            pl: {
                nom: "αἱ πίστεις",
                gen: "τῶν πίστεων",
                dat: "ταῖς πίστεσιν",
                acc: "τὰς πίστεις"
            }
        }
    },
    {
        "lemma": "πίστις",
        "gloss": "faith",
        "gender": "f",
        "pattern": "3f_is",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ πίστις", "gen": "τῆς πίστεως", "dat": "τῇ πίστει", "acc": "τὴν πίστιν" },
            "pl": { "nom": "αἱ πίστεις", "gen": "τῶν πίστεων", "dat": "ταῖς πίστεσιν", "acc": "τὰς πίστεις" }
        }
    },
    {
        "lemma": "χάρις",
        "gloss": "grace",
        "gender": "f",
        "pattern": "3f_is",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ χάρις", "gen": "τῆς χάριτος", "dat": "τῇ χάριτι", "acc": "τὴν χάριν" },
            "pl": { "nom": "αἱ χάριτες", "gen": "τῶν χαρίτων", "dat": "ταῖς χάρισιν", "acc": "τὰς χάριτας" }
        }
    },
    {
        "lemma": "σάρξ",
        "gloss": "flesh",
        "gender": "f",
        "pattern": "3f_x",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ σάρξ", "gen": "τῆς σαρκός", "dat": "τῇ σαρκί", "acc": "τὴν σάρκα" },
            "pl": { "nom": "αἱ σάρκες", "gen": "τῶν σαρκῶν", "dat": "ταῖς σαρξίν", "acc": "τὰς σάρκας" }
        }
    },
    {
        "lemma": "κρίσις",
        "gloss": "judgment",
        "gender": "f",
        "pattern": "3f_is",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ κρίσις", "gen": "τῆς κρίσεως", "dat": "τῇ κρίσει", "acc": "τὴν κρίσιν" },
            "pl": { "nom": "αἱ κρίσεις", "gen": "τῶν κρίσεων", "dat": "ταῖς κρίσεσιν", "acc": "τὰς κρίσεις" }
        }
    },
    {
        "lemma": "γυνή",
        "gloss": "woman, wife",
        "gender": "f",
        "pattern": "3f_gyne",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ γυνή", "gen": "τῆς γυναικός", "dat": "τῇ γυναικί", "acc": "τὴν γυναῖκα" },
            "pl": { "nom": "αἱ γυναῖκες", "gen": "τῶν γυναικῶν", "dat": "ταῖς γυναιξίν", "acc": "τὰς γυναῖκας" }
        }
    },
    {
        "lemma": "μήτηρ",
        "gloss": "mother",
        "gender": "f",
        "pattern": "3f_ter",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ μήτηρ", "gen": "τῆς μητρός", "dat": "τῇ μητρί", "acc": "τὴν μητέρα" },
            "pl": { "nom": "αἱ μητέρες", "gen": "τῶν μητέρων", "dat": "ταῖς μητράσιν", "acc": "τὰς μητέρας" }
        }
    },
    {
        "lemma": "θυγάτηρ",
        "gloss": "daughter",
        "gender": "f",
        "pattern": "3f_ter",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ θυγάτηρ", "gen": "τῆς θυγατρός", "dat": "τῇ θυγατρί", "acc": "τὴν θυγατέρα" },
            "pl": { "nom": "αἱ θυγατέρες", "gen": "τῶν θυγατέρων", "dat": "ταῖς θυγατράσιν", "acc": "τὰς θυγατέρας" }
        }
    },
    {
        "lemma": "πατήρ",
        "gloss": "father",
        "gender": "m",
        "pattern": "3m_ter",
        "supported": true,
        "forms": {
            "sg": { "nom": "ὁ πατήρ", "gen": "τοῦ πατρός", "dat": "τῷ πατρί", "acc": "τὸν πατέρα" },
            "pl": { "nom": "οἱ πατέρες", "gen": "τῶν πατέρων", "dat": "τοῖς πατράσιν", "acc": "τοὺς πατέρας" }
        }
    },
    {
        "lemma": "ἀνήρ",
        "gloss": "man, husband",
        "gender": "m",
        "pattern": "3m_aner",
        "supported": true,
        "forms": {
            "sg": { "nom": "ὁ ἀνήρ", "gen": "τοῦ ἀνδρός", "dat": "τῷ ἀνδρί", "acc": "τὸν ἄνδρα" },
            "pl": { "nom": "οἱ ἄνδρες", "gen": "τῶν ἀνδρῶν", "dat": "τοῖς ἀνδράσιν", "acc": "τοὺς ἄνδρας" }
        }
    },
    {
        "lemma": "βασιλεύς",
        "gloss": "king",
        "gender": "m",
        "pattern": "3m_eus",
        "supported": true,
        "forms": {
            "sg": { "nom": "ὁ βασιλεύς", "gen": "τοῦ βασιλέως", "dat": "τῷ βασιλεῖ", "acc": "τὸν βασιλέα" },
            "pl": { "nom": "οἱ βασιλεῖς", "gen": "τῶν βασιλέων", "dat": "τοῖς βασιλεῦσιν", "acc": "τοὺς βασιλεῖς" }
        }
    },
    {
        "lemma": "ἱερεύς",
        "gloss": "priest",
        "gender": "m",
        "pattern": "3m_eus",
        "supported": true,
        "forms": {
            "sg": { "nom": "ὁ ἱερεύς", "gen": "τοῦ ἱερέως", "dat": "τῷ ἱερεῖ", "acc": "τὸν ἱερέα" },
            "pl": { "nom": "οἱ ἱερεῖς", "gen": "τῶν ἱερέων", "dat": "τοῖς ἱερεῦσιν", "acc": "τοὺς ἱερεῖς" }
        }
    },
    {
        "lemma": "γραμματεύς",
        "gloss": "scribe",
        "gender": "m",
        "pattern": "3m_eus",
        "supported": true,
        "forms": {
            "sg": { "nom": "ὁ γραμματεύς", "gen": "τοῦ γραμματέως", "dat": "τῷ γραμματεῖ", "acc": "τὸν γραμματέα" },
            "pl": { "nom": "οἱ γραμματεῖς", "gen": "τῶν γραμματέων", "dat": "τοῖς γραμματεῦσιν", "acc": "τοὺς γραμματεῖς" }
        }
    },
    {
        "lemma": "ποιμήν",
        "gloss": "shepherd",
        "gender": "m",
        "pattern": "3m_en",
        "supported": true,
        "forms": {
            "sg": { "nom": "ὁ ποιμήν", "gen": "τοῦ ποιμένος", "dat": "τῷ ποιμένι", "acc": "τὸν ποιμένα" },
            "pl": { "nom": "οἱ ποιμένες", "gen": "τῶν ποιμένων", "dat": "τοῖς ποιμέσιν", "acc": "τοὺς ποιμένας" }
        }
    },
    {
        "lemma": "πνεῦμα",
        "gloss": "spirit, wind",
        "gender": "n",
        "pattern": "3n_ma",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ πνεῦμα", "gen": "τοῦ πνεύματος", "dat": "τῷ πνεύματι", "acc": "τὸ πνεῦμα" },
            "pl": { "nom": "τὰ πνεύματα", "gen": "τῶν πνευμάτων", "dat": "τοῖς πνεύμασιν", "acc": "τὰ πνεύματα" }
        }
    },
    {
        "lemma": "σῶμα",
        "gloss": "body",
        "gender": "n",
        "pattern": "3n_ma",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ σῶμα", "gen": "τοῦ σώματος", "dat": "τῷ σώματι", "acc": "τὸ σῶμα" },
            "pl": { "nom": "τὰ σώματα", "gen": "τῶν σωμάτων", "dat": "τοῖς σώμασιν", "acc": "τὰ σώματα" }
        }
    },
    {
        "lemma": "ὄνομα",
        "gloss": "name",
        "gender": "n",
        "pattern": "3n_ma",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ ὄνομα", "gen": "τοῦ ὀνόματος", "dat": "τῷ ὀνόματι", "acc": "τὸ ὄνομα" },
            "pl": { "nom": "τὰ ὀνόματα", "gen": "τῶν ὀνομάτων", "dat": "τοῖς ὀνόμασιν", "acc": "τὰ ὀνόματα" }
        }
    },
    {
        "lemma": "αἷμα",
        "gloss": "blood",
        "gender": "n",
        "pattern": "3n_ma",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ αἷμα", "gen": "τοῦ αἵματος", "dat": "τῷ αἵματι", "acc": "τὸ αἷμα" },
            "pl": { "nom": "τὰ αἵματα", "gen": "τῶν αἱμάτων", "dat": "τοῖς αἵμασιν", "acc": "τὰ αἵματα" }
        }
    },
    {
        "lemma": "θέλημα",
        "gloss": "will",
        "gender": "n",
        "pattern": "3n_ma",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ θέλημα", "gen": "τοῦ θελήματος", "dat": "τῷ θελήματι", "acc": "τὸ θέλημα" },
            "pl": { "nom": "τὰ θελήματα", "gen": "τῶν θελημάτων", "dat": "τοῖς θελήμασιν", "acc": "τὰ θελήματα" }
        }
    },
    {
        "lemma": "φῶς",
        "gloss": "light",
        "gender": "n",
        "pattern": "3n_os",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ φῶς", "gen": "τοῦ φωτός", "dat": "τῷ φωτί", "acc": "τὸ φῶς" },
            "pl": { "nom": "τὰ φῶτα", "gen": "τῶν φώτων", "dat": "τοῖς φωσίν", "acc": "τὰ φῶτα" }
        }
    },
    {
        "lemma": "ἔθνος",
        "gloss": "nation, Gentile",
        "gender": "n",
        "pattern": "3n_os",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ ἔθνος", "gen": "τοῦ ἔθνους", "dat": "τῷ ἔθνει", "acc": "τὸ ἔθνος" },
            "pl": { "nom": "τὰ ἔθνη", "gen": "τῶν ἐθνῶν", "dat": "τοῖς ἔθνεσιν", "acc": "τὰ ἔθνη" }
        }
    },
    {
        "lemma": "γένος",
        "gloss": "race, kind",
        "gender": "n",
        "pattern": "3n_os",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ γένος", "gen": "τοῦ γένους", "dat": "τῷ γένει", "acc": "τὸ γένος" },
            "pl": { "nom": "τὰ γένη", "gen": "τῶν γενῶν", "dat": "τοῖς γένεσιν", "acc": "τὰ γένη" }
        }
    },
    {
        "lemma": "μέρος",
        "gloss": "part",
        "gender": "n",
        "pattern": "3n_os",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ μέρος", "gen": "τοῦ μέρους", "dat": "τῷ μέρει", "acc": "τὸ μέρος" },
            "pl": { "nom": "τὰ μέρη", "gen": "τῶν μερῶν", "dat": "τοῖς μέρεσιν", "acc": "τὰ μέρη" }
        }
    },
    {
        "lemma": "στόμα",
        "gloss": "mouth",
        "gender": "n",
        "pattern": "3n_ma",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ στόμα", "gen": "τοῦ στόματος", "dat": "τῷ στόματι", "acc": "τὸ στόμα" },
            "pl": { "nom": "τὰ στόματα", "gen": "τῶν στομάτων", "dat": "τοῖς στόμασιν", "acc": "τὰ στόματα" }
        }
    },
    {
        "lemma": "πρόσωπον",
        "gloss": "face",
        "gender": "n",
        "pattern": "2n_irregular_list",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ πρόσωπον", "gen": "τοῦ προσώπου", "dat": "τῷ προσώπῳ", "acc": "τὸ πρόσωπον" },
            "pl": { "nom": "τὰ πρόσωπα", "gen": "τῶν προσώπων", "dat": "τοῖς προσώποις", "acc": "τὰ πρόσωπα" }
        }
    },
    {
        "lemma": "ὕδωρ",
        "gloss": "water",
        "gender": "n",
        "pattern": "3n_hydor",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ ὕδωρ", "gen": "τοῦ ὕδατος", "dat": "τῷ ὕδατι", "acc": "τὸ ὕδωρ" },
            "pl": { "nom": "τὰ ὕδατα", "gen": "τῶν ὑδάτων", "dat": "τοῖς ὕδασιν", "acc": "τὰ ὕδατα" }
        }
    },
    {
        "lemma": "ὄρος",
        "gloss": "mountain",
        "gender": "n",
        "pattern": "3n_os",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ ὄρος", "gen": "τοῦ ὄρους", "dat": "τῷ ὄρει", "acc": "τὸ ὄρος" },
            "pl": { "nom": "τὰ ὄρη", "gen": "τῶν ὀρέων", "dat": "τοῖς ὄρεσιν", "acc": "τὰ ὄρη" }
        }
    },
    {
        "lemma": "τέρας",
        "gloss": "wonder, sign",
        "gender": "n",
        "pattern": "3n_as",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ τέρας", "gen": "τοῦ τέρατος", "dat": "τῷ τέρατι", "acc": "τὸ τέρας" },
            "pl": { "nom": "τὰ τέρατα", "gen": "τῶν τεράτων", "dat": "τοῖς τέρασιν", "acc": "τὰ τέρατα" }
        }
    },
    {
        "lemma": "κέρας",
        "gloss": "horn",
        "gender": "n",
        "pattern": "3n_as",
        "supported": true,
        "forms": {
            "sg": { "nom": "τὸ κέρας", "gen": "τοῦ κέρατος", "dat": "τῷ κέρατι", "acc": "τὸ κέρας" },
            "pl": { "nom": "τὰ κέρατα", "gen": "τῶν κεράτων", "dat": "τοῖς κέρασιν", "acc": "τὰ κέρατα" }
        }
    },
    {
        "lemma": "συνείδησις",
        "gloss": "conscience",
        "gender": "f",
        "pattern": "3f_is",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ συνείδησις", "gen": "τῆς συνειδήσεως", "dat": "τῇ συνειδήσει", "acc": "τὴν συνείδησιν" },
            "pl": { "nom": "αἱ συνειδήσεις", "gen": "τῶν συνειδήσεων", "dat": "ταῖς συνειδήσεσιν", "acc": "τὰς συνειδήσεις" }
        }
    },
    {
        "lemma": "ἀνάστασις",
        "gloss": "resurrection",
        "gender": "f",
        "pattern": "3f_is",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ ἀνάστασις", "gen": "τῆς ἀναστάσεως", "dat": "τῇ ἀναστάσει", "acc": "τὴν ἀνάστασιν" },
            "pl": { "nom": "αἱ ἀναστάσεις", "gen": "τῶν ἀναστάσεων", "dat": "ταῖς ἀναστάσεσιν", "acc": "τὰς ἀναστάσεις" }
        }
    },
    {
        "lemma": "ἐλπίς",
        "gloss": "hope",
        "gender": "f",
        "pattern": "3f_is",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ ἐλπίς", "gen": "τῆς ἐλπίδος", "dat": "τῇ ἐλπίδι", "acc": "τὴν ἐλπίδα" },
            "pl": { "nom": "αἱ ἐλπίδες", "gen": "τῶν ἐλπίδων", "dat": "ταῖς ἐλπίσιν", "acc": "τὰς ἐλπίδας" }
        }
    },
    {
        "lemma": "δύναμις",
        "gloss": "power",
        "gender": "f",
        "pattern": "3f_is",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ δύναμις", "gen": "τῆς δυνάμεως", "dat": "τῇ δυνάμει", "acc": "τὴν δύναμιν" },
            "pl": { "nom": "αἱ δυνάμεις", "gen": "τῶν δυνάμεων", "dat": "ταῖς δυνάμεσιν", "acc": "τὰς δυνάμεις" }
        }
    },
    {
        "lemma": "παράδοσις",
        "gloss": "tradition",
        "gender": "f",
        "pattern": "3f_is",
        "supported": true,
        "forms": {
            "sg": { "nom": "ἡ παράδοσις", "gen": "τῆς παραδόσεως", "dat": "τῇ παραδόσει", "acc": "τὴν παράδοσιν" },
            "pl": { "nom": "αἱ παραδόσεις", "gen": "τῶν παραδόσεων", "dat": "ταῖς παραδόσεσιν", "acc": "τὰς παραδόσεις" }
        }
    },
    {
        "lemma": "μαρτυρία",
        "gloss": "testimony",
        "gender": "f",
        "pattern": "1f_eta",
        "supported": false
    },
    {
        "lemma": "μάρτυς",
        "gloss": "witness",
        "gender": "m",
        "pattern": "3m_ys",
        "supported": true,
        "forms": {
            "sg": { "nom": "ὁ μάρτυς", "gen": "τοῦ μάρτυρος", "dat": "τῷ μάρτυρι", "acc": "τὸν μάρτυρα" },
            "pl": { "nom": "οἱ μάρτυρες", "gen": "τῶν μαρτύρων", "dat": "τοῖς μάρτυσιν", "acc": "τοὺς μάρτυρας" }
        }
    },
    {
        "lemma": "ἄρχων",
        "gloss": "ruler",
        "gender": "m",
        "pattern": "3m_on",
        "supported": true,
        "forms": {
            "sg": { "nom": "ὁ ἄρχων", "gen": "τοῦ ἄρχοντος", "dat": "τῷ ἄρχοντι", "acc": "τὸν ἄρχοντα" },
            "pl": { "nom": "οἱ ἄρχοντες", "gen": "τῶν ἀρχόντων", "dat": "τοῖς ἄρχουσιν", "acc": "τοὺς ἄρχοντας" }
        }
    }
];
