export class ScoreEntryDto {
  playerId!: string;
  goals?: number; 
}

export class AssistEntryDto {
  playerId!: string;
  assists?: number;
}

export class CreateMatchDto {
  date!: Date;          
  location!: string;
  home_club_id!: string;
  away_club_id!: string;
  
  score_home?: number;
  score_away?: number;

  scorers?: ScoreEntryDto[]; 
  assisters?: AssistEntryDto[]; 
}

export class UpdateMatchDto {
  date?: Date;
  location?: string;
  home_club_id?: string;
  away_club_id?: string;
  score_home?: number;
  score_away?: number;
  scorers?: ScoreEntryDto[];
  assisters?: AssistEntryDto[];
}