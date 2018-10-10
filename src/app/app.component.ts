import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User Management system';
  users;
  displayedColumns: string[] = ['picture', 'firstname', 'lastname', 'action'];

  constructor(private dataservice: DataService) {
    this.getUsers();
  }

  getUsers() {
    this.dataservice.getUsers().subscribe((users: any) => {
      this.users = new MatTableDataSource(users);
    });
  }

  updateUser(user) {
    this.dataservice.putUser(user).subscribe(response => {
      console.log(response);
    });
  }

  deleteUser(id) {
    this.dataservice.deleteUser(id).subscribe(response => {
      console.log(response);
    });
  }

  addUser() {

  }
}
