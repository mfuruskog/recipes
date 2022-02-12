import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthzModule } from './authz/authz.module';
import { InviteModule } from './invite/invite.module';

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, { useNewUrlParser: true }),
    AuthzModule,
    InviteModule,
  ],
})
export class AppModule {}
