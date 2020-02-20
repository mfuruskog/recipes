import { Model } from "mongoose";
import { Injectable } from '@nestjs/common'
import { Recipe } from './interfaces/recipe.interface';
import { InjectModel } from "@nestjs/mongoose";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";

@Injectable()
export class RecipesService {
    constructor(@InjectModel('Recipe') private readonly recipeModel: Model<Recipe>) { }

    async create(createRecipeDto: CreateRecipeDto) {
        const createdRecipe = new this.recipeModel(createRecipeDto);
        return await createdRecipe.save();
    }

    async findAll(): Promise<Recipe[]> {
        return await this.recipeModel.find().exec();
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
            recipe.update_date = Date.now;
        }
        await recipe.save();

        return recipe;
    }
}