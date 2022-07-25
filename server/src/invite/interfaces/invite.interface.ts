export interface Invite {
  user_id: string;
  sender: string;
  receiver: string;
  status: InviteStatus;
}

export enum InviteStatus {
  new,
  accepted,
  rejected,
}
