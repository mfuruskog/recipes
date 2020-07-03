import { Controller, Get } from '@nestjs/common';
import { RecipeTypesService } from './recipetypes.service';
import { RecipeType } from './interfaces/recipe.interface';

@Controller('recipetypes')
export class RecipeTypesController {
  constructor(private readonly recipeTypesService: RecipeTypesService) {}

  @Get()
  async findAll(): Promise<RecipeType[]> {
    return this.recipeTypesService.findAll();
  }
}
