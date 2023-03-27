import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { jwtSecret } from 'src/auth/config/auth.keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'cat',
        });
    }

    async validate(payload: any) {
        // return { userId: payload.sub, email: payload.email };
        return payload;
    }
}