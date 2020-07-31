import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesController } from './recipes.controller';
import { RecipeTypesController } from './recipetypes.controller';
import { RecipesService } from './recipes.service';
import { RecipeTypesService } from './recipetypes.service';
import { RecipeSchema } from './schemas/recipe.schema';
import { RecipeTypeSchema } from './schemas/recipetype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Recipe', schema: RecipeSchema },
      { name: 'RecipeType', schema: RecipeTypeSchema },
    ]),
  ],
  controllers: [RecipesController, RecipeTypesController],
  providers: [RecipesService, RecipeTypesService],
})
export class RecipesModule {}
