import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesService } from './recipes.service';
import { Recipe } from './interfaces/recipe.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<string> {
    // @ts-ignore
    return this.recipesService.create(req.user.sub, createRecipeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req): Promise<Recipe[]> {
    let shared_with: string | undefined =
      req.user['https://receptladan/shared_with'];

    if (shared_with !== undefined) {
      return this.recipesService.findAllByUserIds([req.user.sub, shared_with]);
    }
    return this.recipesService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async Delete(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.delete(id);
  }
}
