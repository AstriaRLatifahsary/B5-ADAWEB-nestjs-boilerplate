import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class DevAuthController {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    login(body: {
        id?: number;
    }): Promise<{
        token: string;
        expiresIn: number;
    }>;
}
