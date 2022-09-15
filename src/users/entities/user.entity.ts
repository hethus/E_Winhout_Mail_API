export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  messagesDate?: Date[];
  messagesCreateds?: number;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
