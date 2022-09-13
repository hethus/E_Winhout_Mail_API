export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  messagesDate?: Date[];
  messagesCreateds?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
