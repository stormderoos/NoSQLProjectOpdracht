import { IPlayer } from "./player.interface";

export interface IClub {
    _id: string; 
    name: string; 
    location: string; 
    logoUrl: string;
    players: string[] | undefined;
    createdBy?: string;
}

export type IFindClub = Pick<IClub, 'name' | 'location' | 'logoUrl' | 'players' | 'createdBy'>;

export type ICreateClub = Pick<IClub, 'name' | 'location' | 'logoUrl' | 'players' | 'createdBy'>;


