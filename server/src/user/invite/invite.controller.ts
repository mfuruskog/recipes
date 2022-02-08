import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateInviteDto } from './dto/create-invite.dto';
import { Invite } from './interfaces/invite.interface';
import { InviteService } from './invite.service';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body() createInviteDto: CreateInviteDto,
  ): Promise<string> {
    // @ts-ignore
    return this.inviteService.create(req.user.sub, createInviteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async get(@Param('id') id: string): Promise<Invite> {
    return this.inviteService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/accept')
  async accept(@Param('id') id: string): Promise<Invite> {
    let invite = this.inviteService.findOne(id);
    return invite;
  }
}
