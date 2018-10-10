import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';

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

  constructor(private dataservice: DataService, private dialog: MatDialog, public snackBar: MatSnackBar) {
    this.getUsers();
  }

  getUsers() {
    this.dataservice.getUsers().subscribe((users: any) => {
      this.users = new MatTableDataSource(users);
    }, error => {
      this.errorHandle();
    });
  }

  updateUser(user) {
    this.dataservice.putUser(user).subscribe(response => {
      console.log(response);
    }, error => {
      this.errorHandle();
    });
  }

  deleteUser(id) {
    this.dataservice.deleteUser(id).subscribe(response => {
      this.getUsers();
    }, error => {
      this.errorHandle();
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(AppCreateUserComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  errorHandle () {
    this.snackBar.openFromComponent(ErrorHandleComponent, {
      duration: 500,
    });
  }
}

@Component({
  selector: 'app-create-user',
  templateUrl: 'app-create-user.html',
})
export class AppCreateUserComponent {

  user = {
    name: {
      first: '',
      last: ''
    },
    picture: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AppCreateUserComponent>,
    private dataservice: DataService,
    public snackBar: MatSnackBar
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUser () {
    this.dataservice.postUser(this.user).subscribe(response => {
      console.log(response);
      this.dialogRef.close();
    }, error => {
      this.errorHandle();
    });
  }

  errorHandle () {
    this.snackBar.openFromComponent(ErrorHandleComponent, {
      duration: 500,
    });
  }

}

@Component({
  selector: 'app-error-handle',
  templateUrl: 'error-handle.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class ErrorHandleComponent {}
