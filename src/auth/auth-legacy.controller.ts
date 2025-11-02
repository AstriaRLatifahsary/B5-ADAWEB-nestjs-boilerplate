import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

/* eslint-disable @typescript-eslint/no-require-imports */
const legacy = require('../../controllers/authController');

@Controller()
export class AuthWebController {
  @Get(['login', 'auth/login'])
  showLogin(@Req() req: any, @Res() res: any) {
    return legacy.showLogin(req, res);
  }

  @Post(['login', 'auth/login'])
  postLogin(@Req() req: any, @Res() res: any) {
    return legacy.postLogin(req, res);
  }

  @Get(['register', 'auth/register'])
  showRegister(@Req() req: any, @Res() res: any) {
    return legacy.showRegister(req, res);
  }

  @Post(['register', 'auth/register'])
  postRegister(@Req() req: any, @Res() res: any) {
    return legacy.postRegister(req, res);
  }

  @Get(['logout', 'auth/logout'])
  logoutGet(@Req() req: any, @Res() res: any) {
    return legacy.logout(req, res);
  }

  @Post(['logout', 'auth/logout'])
  logoutPost(@Req() req: any, @Res() res: any) {
    return legacy.logout(req, res);
  }

  @Get(['profile', 'users/profile'])
  showProfile(@Req() req: any, @Res() res: any) {
    return legacy.showProfile(req, res);
  }

  @Post(['profile', 'users/profile'])
  @UseInterceptors(FileInterceptor('avatar'))
  postProfile(
    @Req() req: any,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // legacy.postProfile expects req.file to be populated; Nest FileInterceptor provides file
    // ensure req.file is set for legacy function
    if (file) req.file = file;
    return legacy.postProfile(req, res);
  }
}
