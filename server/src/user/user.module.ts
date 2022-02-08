import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteController } from './invite/invite.controller';
import { InviteService } from './invite/invite.service';
import { InviteSchema } from './schemas/invite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invite', schema: InviteSchema }]),
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
export class UserModule {}
