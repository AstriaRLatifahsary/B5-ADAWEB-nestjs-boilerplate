import { Response } from 'express';
import { HomeService } from './home.service';
export declare class HomeController {
    private service;
    constructor(service: HomeService);
    getHome(req: any, res: Response): Promise<void>;
}
