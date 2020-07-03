import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class CrudCrudService {
  private REST_API_SERVER = "https://crudcrud.com/api/9ba9d01e5c20422db19fb32c3b473225";
  constructor(public http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.REST_API_SERVER}/users`);
  }

  getUser(_id: number): Observable<User> {
    return this.http.get<User>(`${this.REST_API_SERVER}/users/${_id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.REST_API_SERVER}/users`, user)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.REST_API_SERVER}/users/${user._id}`, user)
  }

  deleteUser(_id: number): Observable<User> {
    return this.http.delete<User>(`${this.REST_API_SERVER}/users/${_id}`)
  }
}