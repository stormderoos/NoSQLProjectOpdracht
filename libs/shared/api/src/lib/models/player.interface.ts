export interface IPlayer {
  _id: string; 
  firstName: string; 
  lastName: string;
  position: PlayerPosition; 
  clubId?: string;
  profileImageUrl?: string;
  birthdate: Date;
  goals?: number;    
  assists?: number;   
}
  export type IFindPlayer = Pick<IPlayer, 'firstName' | 'lastName' | 'birthdate'> & {
    position: string; 
  };
  export enum PlayerPosition{
    GK = 'GK',
    LB = 'LB',
    CB = 'CB',
    RB = 'RB',
    CDM = 'CDM',
    CM = 'CM',
    CAM = 'CAM',
    LW = 'LW',
    ST = 'ST',
    RW = 'RW',
    Unknown = ''
  }