export interface NounEntry {
    lemma: string;
    gloss: string;
    gender: 'm' | 'f' | 'n';
    pattern: string;
    supported: boolean;
}
