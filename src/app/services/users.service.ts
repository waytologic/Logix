import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersList,Usercred } from '../models/user';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";

const baseUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<UsersList[]> {
    return this.http.get<UsersList[]>(baseUrl+'/users');
  }



  Createuser(user:any) {
    return this.http.post(baseUrl+'/users',user);
  }

}
