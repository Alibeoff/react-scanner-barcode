import { Request } from 'express';
import { User } from '../entities/user.entity';

export interface IFindUserProps {
  email?: string;
  name?: string;
  id?: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
