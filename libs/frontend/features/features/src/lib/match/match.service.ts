import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IClub, IMatch, IPlayer } from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private baseUrl = environment.dataApiUrl;

  constructor(private http: HttpClient) {}

  getMatches(): Observable<IMatch[]> {
    return this.http.get<{ results: IMatch[] }>(`${this.baseUrl}/matches`).pipe(
      map(response => response.results)
    );
  }

  getMatchById(id: string): Observable<IMatch> {
    return this.http.get<{ results: IMatch }>(`${this.baseUrl}/matches/${id}`).pipe(
      map(response => response.results)
    );
  }

  createMatch(match: Omit<IMatch, 'id'>): Observable<IMatch> {
    return this.http.post<IMatch>(`${this.baseUrl}/matches`, match);
  }

  updateMatch(match: IMatch): Observable<IMatch> {
    return this.http.put<IMatch>(`${this.baseUrl}/matches/${match._id}`, match);
  }

  deleteMatch(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/matches/${id}`);
  }

  syncMatchToNeo4j(match: {
    id: string;
    scorers: { playerId: string; goals: number }[];
    assisters: { playerId: string; assists: number }[];
  }): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/neo4j/stats`, match);
  }
}