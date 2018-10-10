import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers () {
    return this.http.get('http://localhost:8181/users');
  }
  putUser (user) {
    return this.http.put('http://localhost:8181/users/' + user.id, user);
  }
  deleteUser (id) {
    return this.http.delete('http://localhost:8181/users/' + id);
  }
}
