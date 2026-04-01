import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema()
export class ScoreEntry {
  @Prop({ required: true })
  playerId!: string;

  @Prop({ required: true, default: 1 })
  goals!: number;
}
export const ScoreEntrySchema = SchemaFactory.createForClass(ScoreEntry);

@Schema()
export class AssistEntry {
  @Prop({ required: true })
  playerId!: string;

  @Prop({ required: true, default: 1 })
  assists!: number;
}
export const AssistEntrySchema = SchemaFactory.createForClass(AssistEntry);

@Schema()
export class Match {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  home_club_id!: string;

  @Prop({ required: true })
  away_club_id!: string;

  @Prop({ required: false, default: null })
  score_home?: number;

  @Prop({ required: false, default: null })
  score_away?: number;

  @Prop({ type: [ScoreEntrySchema], default: [] })
  scorers!: ScoreEntry[];

  @Prop({ type: [AssistEntrySchema], default: [] })
  assisters!: AssistEntry[];
}

export const MatchSchema = SchemaFactory.createForClass(Match);