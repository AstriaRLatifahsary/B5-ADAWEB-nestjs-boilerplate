import { AuthService } from '../auth/auth.service';
import { AuthAppleService } from './auth-apple.service';
import { AuthAppleLoginDto } from './dto/auth-apple-login.dto';
import { LoginResponseDto } from '../auth/dto/login-response.dto';
export declare class AuthAppleController {
    private readonly authService;
    private readonly authAppleService;
    constructor(authService: AuthService, authAppleService: AuthAppleService);
    login(loginDto: AuthAppleLoginDto): Promise<LoginResponseDto>;
}
