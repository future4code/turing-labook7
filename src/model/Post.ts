export enum POST_TYPE {
    NORMAL = "NORMAL",
    EVENTO = "EVENTO"
}

export interface PostDTO {
    photoUrl: string,
    description: string,
    createdAt: string,
    type: string,
    userId: string,
    name: string
}
