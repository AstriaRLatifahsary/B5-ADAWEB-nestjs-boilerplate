import { Response } from 'express';
export declare class AppController {
    app: any;
    switchTheme(res: Response): void;
    private setTheme;
    themeLight(res: Response): void;
    themeDark(res: Response): void;
}
