import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { JwtStrategy } from './stratgey/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.register({
    secret: ' cat',
    signOptions: { expiresIn: '20m' },
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
