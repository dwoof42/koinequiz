export interface NounForm {
    nom: string;
    gen: string;
    dat: string;
    acc: string;
}
export interface NounEntry {

    lemma: string;

    gloss: string;

    gender: 'm' | 'f' | 'n';

    pattern: string;

    supported: boolean;

    forms?: {

        sg: NounForm;

        pl: NounForm;

    };

}