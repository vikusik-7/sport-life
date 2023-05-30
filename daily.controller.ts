import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { viewsPath } from 'src/enums/viewsPath';

@Controller('daily')
export class DailyController {
    @Get()
    dailyPage(@Res() res: Response) {
        res.render('main.ejs', {path: viewsPath.dayli})
    }
}
