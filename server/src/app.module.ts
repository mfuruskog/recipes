import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [RecipesModule, MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/recipes', { useNewUrlParser: true}), AuthzModule]
})
export class AppModule {}
