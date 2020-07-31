import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Recipe } from './interfaces/recipe.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
  ) {}

  async create(userId: string, createRecipeDto: CreateRecipeDto) {
    const createdRecipe = new this.recipeModel(createRecipeDto);
    createdRecipe.user_id = userId;
    await createdRecipe.save();

    return await this.recipeModel
      .findById(createdRecipe._id)
      .populate('type')
      .exec();
  }

  async findAll(userId: string): Promise<Recipe[]> {
    return await this.recipeModel
      .find()
      .where('user_id')
      .equals(userId)
      .populate('type')
      .exec();
  }

  async findOne(id: string): Promise<Recipe> {
    return await this.recipeModel.findById(id).exec();
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    let recipe = await this.recipeModel.findById(id).exec();

    if (recipe) {
      recipe.title = updateRecipeDto.title;
      recipe.url = updateRecipeDto.url;
      recipe.description = updateRecipeDto.description;
      recipe.rating = updateRecipeDto.rating;
      recipe.type = updateRecipeDto.type;
      recipe.update_date = new Date().toISOString();
    }
    await recipe.save();

    return recipe;
  }

  async delete(id: string): Promise<Recipe> {
    return this.recipeModel.findByIdAndDelete(id);
  }
}
