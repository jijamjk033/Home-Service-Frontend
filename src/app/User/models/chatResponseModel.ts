export interface chatResponse {
    text: any;
    timestamp: string | number | Date;
    message: string;
    chatId: string;
    sender?: string;
}

export interface MessageSentResponse {
    chatId: string;
    sender: string;
    text: string;
    timestamp: Date;
    _id: string;
    __v?: number;
}
