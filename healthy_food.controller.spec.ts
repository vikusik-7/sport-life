import { Test, TestingModule } from '@nestjs/testing';
import { HealthyFoodController } from './healthy_food.controller';

describe('HealthyFoodController', () => {
  let controller: HealthyFoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthyFoodController],
    }).compile();

    controller = module.get<HealthyFoodController>(HealthyFoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
