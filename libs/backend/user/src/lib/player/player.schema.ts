import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({
    required: true,
    enum: ['GK', 'LB', 'CB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'ST', 'RW'],
  })
  position!: string;

  @Prop({ required: false })
  clubId?: string;

  @Prop({ required: true })
  birthdate!: Date;

  @Prop({
    required: false,
    default: '/assets/footballplayer.png',
  })
  profileImageUrl?: string;

  @Prop({ default: 0 })
  goals!: number;

  @Prop({ default: 0 })
  assists!: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);