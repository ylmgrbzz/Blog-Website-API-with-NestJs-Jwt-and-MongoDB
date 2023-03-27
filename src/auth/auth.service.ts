import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async register(dto: AuthDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 15);
        const newUser = new this.userModel({
            email: dto.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        return this.createToken(user.email);
    }
    createToken(email: string) {
        const payload = { email };
        return this.jwtService.sign(payload);
    }
}
