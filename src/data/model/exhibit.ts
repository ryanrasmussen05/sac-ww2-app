export interface Exhibit {
    name: string;
    color: string;
    artifacts: Artifact[];
}

export interface Artifact {
    number: string;
    name: string;
    description: string;
    pictures: string[];
    audio: string;
}
