import { Controller, Get } from '@nestjs/common'

@Controller('recipes')
export class RecipesController {
    @Get()
    findAll(): string {
        return 'This is it'
    }
}