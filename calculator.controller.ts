import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { viewsPath } from 'src/enums/viewsPath';

@Controller('calculator')
export class CalculatorController {
    @Get()
    calculatorPage(@Res() res: Response) {
        res.render('main.ejs', {path: viewsPath.calculator})
    }
}
