export interface Chat
{
    id: string,
    user: ChatUser,
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