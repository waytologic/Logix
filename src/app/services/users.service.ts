import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersList,Usercred } from '../models/user';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";

const baseUrl = "http://localhost:3000";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<UsersList[]> {
    return this.http.get<UsersList[]>(baseUrl+'/users',httpOptions);
  }

  Createuser(user:any) {
    return this.http.post(baseUrl+'/users',user,httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(baseUrl + 'signout', { }, httpOptions);
  }

}
