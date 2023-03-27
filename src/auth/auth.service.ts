import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async register(dto: AuthDto) {
        const newUser = new this.userModel({
            email: dto.email,
            password: dto.password,
        })

        return await newUser.save();
    }
}
