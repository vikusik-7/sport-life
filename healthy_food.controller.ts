import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { viewsPath } from 'src/enums/viewsPath';

@Controller('healthy_food')
export class HealthyFoodController {
  @Get()
  HealthyFoodController(@Res() res: Response): void {
    res.render('main.ejs', { path: viewsPath.food });
  }

  @Get(':food')
  FoodPage(@Param('food') food: string, @Res() res: Response): void {
    res.render('main.ejs', { path: viewsPath[food] })
  }
}
