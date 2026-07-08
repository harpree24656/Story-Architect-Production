export interface Character {
    // for identity field
    id: string;
    name: string;
    role: string;
    avatar: string;
    avatarColor: string

    // for description field
    description: string;
    backstory: string;
    motivations: string;

    // for personal field
    age: string;
    gender: string;
    race: string;
    occupation: string;
    affiliation: string;

    // array field
    traits: string[];

    // stats field
    relations: number;
    events: number;
    arcs: number;

    // for story field
    story: string;
    createdAt: string;
}
