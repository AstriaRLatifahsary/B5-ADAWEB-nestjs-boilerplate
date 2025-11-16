import { ConfigService } from '@nestjs/config';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthAppleLoginDto } from './dto/auth-apple-login.dto';
import { AllConfigType } from '../config/config.type';
export declare class AuthAppleService {
    private configService;
    constructor(configService: ConfigService<AllConfigType>);
    getProfileByToken(loginDto: AuthAppleLoginDto): Promise<SocialInterface>;
}
