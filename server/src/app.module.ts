import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthzModule } from './authz/authz.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RecipesModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, { useNewUrlParser: true }),
    AuthzModule,
    UserModule,
  ],
})
export class AppModule {}
