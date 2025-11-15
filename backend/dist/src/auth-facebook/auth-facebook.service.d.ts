import { ConfigService } from '@nestjs/config';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthFacebookLoginDto } from './dto/auth-facebook-login.dto';
import { AllConfigType } from '../config/config.type';
export declare class AuthFacebookService {
    private configService;
    private readonly baseUrl;
    private readonly apiVersion;
    constructor(configService: ConfigService<AllConfigType>);
    getProfileByToken(loginDto: AuthFacebookLoginDto): Promise<SocialInterface>;
    private verifyAccessToken;
    exchangeForLongLivedToken(shortLivedToken: string): Promise<string>;
}
