import User from '../models/User';
import mongoose, { Types } from 'mongoose';

class UserService {
  async signUp(data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: 'guest' | 'agent_admin' | 'superadmin';
    agency?: string;
  }) {
    const { name, email, phone, password, role, agency } = data;

    const userData: {
      email: string;
      name: string;
      phone?: string;
      role: string;
      password: string;
      agency?: mongoose.Types.ObjectId;
    } = {
      name,
      email,
      password,
      role,
    };

    if (phone) {
      userData.phone = phone;
    }

    if (role === 'agent_admin' && agency) {
      userData.agency = new Types.ObjectId(agency);
    }

    const newUser = await User.create(userData);
    return newUser;
  }
  async logIn(email: string) {
    return User.findOne({ email }).select('+password');
  }
}

export default UserService;
