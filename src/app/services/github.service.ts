import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(public http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`https://api.github.com/users`);
  }

  getUser(user: string): Observable<User> {
    return this.http.get<User>(`https://api.github.com/users/${user}`);
  }
}