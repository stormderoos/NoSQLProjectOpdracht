import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPlayer } from '@avans-nx-workshop/shared/api'; 
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseUrl = environment.dataApiUrl;

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<IPlayer[]> {
    return this.http.get<{ results: IPlayer[] }>(`${this.baseUrl}/players/`).pipe(
      map(response => response.results) 
    );
  }

  getPlayerById(id: string): Observable<IPlayer> {
    return this.http.get<{ results: IPlayer }>(`${this.baseUrl}/players/${id}`).pipe(
      map(response => response.results)
    );
  }

  getPlayersByClub(clubId: string): Observable<IPlayer[]> {
    return this.http.get<{ results: IPlayer[]}>(`${this.baseUrl}/clubs/${clubId}/players`)
      .pipe(map(response => response.results));
  }
  
  addPlayer(player: Omit<IPlayer, 'id'>): Observable<IPlayer> {
    return this.http.post<IPlayer>(`${this.baseUrl}/players`, player);
  }

  updatePlayer(player: IPlayer): Observable<IPlayer> {
    return this.http.put<IPlayer>(`${this.baseUrl}/players/${player._id}`, player);
  }

  deletePlayer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/players/${id}`);
  }
  getPlayerStats(playerId: string): Observable<{ goals: number; assists: number }> {
    return this.http.get<{ results: { goals: number; assists: number } }>(`${this.baseUrl}/players/${playerId}/stats`).pipe(
      map(response => response.results)
    );
  }

  getClubs(): Observable<{ _id: string; name: string }[]> {
    return this.http.get<{ results: { _id: string; name: string }[] }>(`${this.baseUrl}/clubs`)
      .pipe(map(response => response.results));
  }
}