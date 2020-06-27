import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { RecipeType } from './interfaces/recipe.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RecipeTypesService {
  constructor(
    @InjectModel('RecipeType')
    private readonly recipeTypeModel: Model<RecipeType>,
  ) {}

  async findAll(): Promise<RecipeType[]> {
    return await this.recipeTypeModel.find().exec();
  }
}
