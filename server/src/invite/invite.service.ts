import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInviteDto } from './dto/create-invite.dto';
import { Invite } from './interfaces/invite.interface';
import { ManagementClient } from 'auth0';

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

  async findAllSent(userId: string): Promise<Invite[]> {
    return await this.inviteModel.find().where('user_id').equals(userId).exec();
  }

  async findAllReceived(email: string): Promise<Invite[]> {
    return await this.inviteModel.find().where('receiver').equals(email).exec();
  }

  async accept(userId: string, id: string): Promise<Invite> {
    var invite: Invite;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      invite = await this.inviteModel.findById(id).exec();
    } else {
      throw new NotFoundException('Invite not found.');
    }

    //TODO put this somewhere else and add error handling
    var client = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENTID,
      clientSecret: process.env.AUTH0_CLIENTSECRET,
      scope: 'read:users update:users',
    });
    client.updateAppMetadata({ id: invite.user_id }, { shared_with: userId });
    client.updateAppMetadata({ id: userId }, { shared_with: invite.user_id });

    return invite;
  }
}
