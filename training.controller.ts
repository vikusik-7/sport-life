import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { viewsPath } from 'src/enums/viewsPath';

@Controller('training')
export class TrainingController {
    @Get()
    TrainingController(@Res() res: Response) {
        res.render('main.ejs', {path: viewsPath.training })
    }

    @Get(':muscles')
    TrainingForMusclesController(@Param('muscles') muscles: string, @Res() res: Response) {
        res.render('main.ejs', {path: viewsPath[muscles] })
    }
}
