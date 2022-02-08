import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInviteDto } from './dto/create-invite.dto';
import { Invite } from './interfaces/invite.interface';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel('Invite') private readonly inviteModel: Model<Invite>,
  ) {}

  async create(userId: string, createInviteDto: CreateInviteDto) {
    const createdInvite = new this.inviteModel(createInviteDto);
    createdInvite.user_id = userId;
    await createdInvite.save();

    return await this.inviteModel.findById(createdInvite._id).exec();
  }

  async findOne(id: string): Promise<Invite> {
    //TODO put validation of objectid somewhere else
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return await this.inviteModel.findById(id).exec();
    } else {
      throw new NotFoundException();
    }
  }
}
