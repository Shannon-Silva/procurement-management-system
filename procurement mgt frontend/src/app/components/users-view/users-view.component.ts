import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ApplicationUser } from '../../models/ApplicationUser';
 
@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class ViewUsersComponent implements OnInit {
  applicationUsers: any[];
  selected: string[] = [];
  selectedForEdit;
  modalOpened;

  model = new ApplicationUser(null, null, null, null, null, null, null, null, null, null);

  constructor(private toastr: ToastrService, private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(applicationUsers => {
        this.applicationUsers = applicationUsers;
        console.log('this.applicationUsers' + this.applicationUsers);
      });
  }

  onDelete() {
    console.log(this.selected);
    this.userService.deleteUser(JSON.parse(JSON.stringify(this.selected)))
      .subscribe(
        any => {
          console.log('deleted users' + this.selected);
          this.toastr.success('deleted users');
          this.getUsers();
        },
        err => this.toastr.error(err)
      );
  }

  onEdit() {
    console.log(JSON.stringify(this.selected));
    this.model = JSON.parse(JSON.stringify(this.selected[0])) as ApplicationUser;
    this.modalOpened = true;

  }

  onSubmitEdited() {
    console.log(this.model);
    this.userService.updateUser(this.model)
      .subscribe(
        any => {
          console.log('updated user' + JSON.stringify(this.model));
          this.toastr.success('User updated successfully');
          this.getUsers();
        },
        err => this.toastr.error(err)
      );
    this.modalOpened = false;
  }

  validateNumberKeyPress(evt) {
    const keyEvent = evt || window.event;
    let key;
    const regex = /[0-9]/;

    // get keycode as string
    key = keyEvent.keyCode || keyEvent.which;
    key = String.fromCharCode(key);

    // allow backspace, delete, left and right
    if (keyEvent.keyCode === 8 || keyEvent.keyCode === 46 || keyEvent.keyCode === 37 || keyEvent.keyCode === 39) {
      return true;
    }
    if (!regex.test(key)) {
      keyEvent.returnValue = false;
      if (keyEvent.preventDefault) {
        keyEvent.preventDefault();
      }
    }
  }

}
