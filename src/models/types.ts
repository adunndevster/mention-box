export interface Chat
{
    id: string,
    userUd: string,
    htmlText: string,
    timeStamp: Date,
}

export interface ChatUser
{
    id: string;
    name: string;
    handle: string;
    initials: string;
}