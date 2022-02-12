import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeController } from './recipe.controller';
import { RecipeTypeController } from './recipetype.controller';
import { RecipeService } from './recipe.service';
import { RecipeTypeService } from './recipetype.service';
import { RecipeSchema } from './schemas/recipe.schema';
import { RecipeTypeSchema } from './schemas/recipetype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Recipe', schema: RecipeSchema },
      { name: 'RecipeType', schema: RecipeTypeSchema },
    ]),
  ],
  controllers: [RecipeController, RecipeTypeController],
  providers: [RecipeService, RecipeTypeService],
})
export class RecipeModule {}
