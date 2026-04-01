export interface IMatch {
    _id: string;
    date: Date; 
    location: string; 
    home_club_id: string; 
    away_club_id: string; 
    score_home: number | null; 
    score_away: number | null;
    scorers: string[];
    assisters: string[]; 
  }

export type IFindMatch = Pick<IMatch, 'date' | 'location' | 'home_club_id'| 'away_club_id'> 

export type IGetScore = Pick<IMatch, 'date' | 'location' | 'home_club_id'| 'away_club_id' | 'score_home' | 'score_away'>
