import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { RecipesService } from './recipes.service'
import { Recipe } from './interfaces/recipe.interface';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Post()
    async create(@Body() createRecipeDto: CreateRecipeDto): Promise<string> {
        this.recipesService.create(createRecipeDto);
        return 'Created!';
    }

    @Get()
    async findAll(): Promise<Recipe[]> {
        return this.recipesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Recipe> {        
        return this.recipesService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        return this.recipesService.update(id, updateRecipeDto);
    }
    
    @Delete(':id')
    async Delete(@Param('id') id: string): Promise<string> {
        return 'Deleted'
    }
}