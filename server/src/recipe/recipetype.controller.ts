import { Controller, Get } from '@nestjs/common';
import { RecipeTypeService } from './recipetype.service';
import { RecipeType } from './interfaces/recipe.interface';

@Controller('recipetypes')
export class RecipeTypeController {
  constructor(private readonly recipeTypesService: RecipeTypeService) {}

  @Get()
  async findAll(): Promise<RecipeType[]> {
    return this.recipeTypesService.findAll();
  }
}
