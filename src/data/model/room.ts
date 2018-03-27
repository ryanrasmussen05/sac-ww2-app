export interface Room {
    name: string;
    description: string;
    color: string;
    artifacts: Artifact[];
}

export interface Artifact {
    number: string;
    name: string;
    description: string;
    pictures: string[];
    audio: string;
    background?: string;
}
