import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersList,Usercred } from '../models/user';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";

const APIUrl = "http://localhost:3000";
const baseUrl = "https://my-json-server.typicode.com/waytologic/arpino";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<UsersList[]> {
    return this.http.get<UsersList[]>(baseUrl+'/userlist',httpOptions);
  }

  Createuser(user:any) {
    return this.http.post(APIUrl+'/users',user,httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(baseUrl + 'signout', { }, httpOptions);
  }

  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // For example, you can check if there is a token in local storage
    return !!sessionStorage.getItem('loggedUser');
  }

}
