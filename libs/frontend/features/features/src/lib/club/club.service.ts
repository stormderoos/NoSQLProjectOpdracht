import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IClub, IMatch } from '@avans-nx-workshop/shared/api';
import { IPlayer } from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private baseUrl = environment.dataApiUrl;

  constructor(private http: HttpClient) {}

  createClub(club: Omit<IClub, '_id'>): Observable<IClub> {
    return this.http.post<IClub>(`${this.baseUrl}/clubs`, club);
  }

  getPlayers(): Observable<IPlayer[]> {
    return this.http.get<{results : IPlayer[]}>(`${this.baseUrl}/players`).pipe
      (map(response => response.results));
  }

  addPlayerToClub(player: Omit<IPlayer, 'id'>): Observable<IPlayer> {
    return this.http.post<{result : IPlayer}>(`${this.baseUrl}/players`, player).pipe
      (map(response => response.result));
  }

  getClubs(): Observable<IClub[]> {
    return this.http.get<{results : IClub[]}>(`${this.baseUrl}/clubs`).pipe(
      map(response => response.results ));
  }

  getClubById(id: string): Observable<IClub> {
    return this.http.get<{results : IClub}>(`${this.baseUrl}/clubs/${id}`).pipe(
      map(response => response.results));
  }

  getPlayersByClub(clubId: string): Observable<IPlayer[]> {
    return this.http.get<{ results: IPlayer[]}>(`${this.baseUrl}/clubs/${clubId}/players`)
      .pipe(map(response => response.results));
  }

  getPlayerById(playerId: string): Observable<IPlayer> {
    return this.http.get<{results : IPlayer}>(`${this.baseUrl}/players/${playerId}`).pipe(
      map(response => response.results));
  }

  updatePlayerClubId(playerId: string, clubId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/players/${playerId}`, { clubId });
  }

  updateClub(updatedClub: IClub): Observable<IClub> {
    return this.http.put<IClub>(`${this.baseUrl}/clubs/${updatedClub._id}`, updatedClub);
  }

  getMatchesByClub(clubId: string): Observable<IMatch[]> {
    return this.http.get<{results : IMatch[]}>(`${this.baseUrl}/clubs/${clubId}/matches`).pipe(
      map(response => response.results)
    );
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clubs/${id}`);
  }
}