import { Request } from 'express';
import User from '../models/User';

class UserService {
  async signUp(req: Request) {
    return await User.create(req);
  }
  async logIn(email: string) {
    return User.findOne({ email }).select('+password');
  }
}

export default UserService;
