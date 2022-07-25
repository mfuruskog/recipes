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
  @Get('sent')
  async getSent(@Request() req): Promise<Invite[]> {
    return this.inviteService.findAllSent(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('received')
  async getReceived(@Request() req): Promise<Invite[]> {
    return this.inviteService.findAllReceived(
      req.user['https://receptladan/email'],
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body() createInviteDto: CreateInviteDto,
  ): Promise<string> {
    // @ts-ignore
    return this.inviteService.create(
      req.user.sub,
      req.user['https://receptladan/email'],
      createInviteDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async get(@Param('id') id: string): Promise<Invite> {
    return this.inviteService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/accept')
  async accept(@Request() req, @Param('id') id: string): Promise<Invite> {
    return this.inviteService.accept(req.user.sub, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/reject')
  async reject(@Request() req, @Param('id') id: string): Promise<Invite> {
    return this.inviteService.reject(req.user.sub, id);
  }
}
