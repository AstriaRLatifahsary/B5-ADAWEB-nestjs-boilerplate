import { User } from '../../users/domain/user';
export declare class LoginResponseDto {
    token: string;
    refreshToken: string;
    tokenExpires: number;
    user: User;
}
