import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common'
import { CreateRecipeDto } from './create-recipe.dto'
import { UpdateRecipeDto } from './update-recipe.dto'

@Controller('recipes')
export class RecipesController {

    @Post()
    async create(@Body() createRecipeDto: CreateRecipeDto): Promise<string> {
        return 'Added!'
    }

    @Get()
    async findAll(): Promise<string> {
        return 'This is it!'
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<string> {        
        return `Fetched ${id}!`
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto): Promise<string> {
        return 'Updated'
    }
    
    @Delete(':id')
    async Delete(@Param('id') id: string): Promise<string> {
        return 'Deleted'
    }
}