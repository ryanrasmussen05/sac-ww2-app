export interface Exhibit {
    description: string[];
    audio: string;
    rooms: Room[];
}

export interface Room {
    name: string;
    description: string[];
    color: string;
    audio: string;
    artifacts: Artifact[];
}

export interface Artifact {
    number: string;
    name: string;
    roomColor: string;
    description: string[];
    pictures: string[];
    audio: string;
    background?: string;
}
