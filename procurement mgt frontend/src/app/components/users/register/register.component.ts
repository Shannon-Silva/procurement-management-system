import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApplicationUser } from '../../../models/ApplicationUser';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: ApplicationUser = new ApplicationUser(null, null, null, null, null, null, null, null, null, null);
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  isAdmin = false;
  authorities = ['USER'];

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
  }

  OnSubmit() {
    this.userService.registerUser(this.user)
    .subscribe(
      data => this.toastr.success('User registered'),
      err  => {
        this.toastr.error('Error: User could not be registered');
        console.log(JSON.stringify(err));
      }
    );
  }
  
  
  // OnSubmit(form: NgForm) {
  //   this.userService.registerUser(form.value)
  //     .subscribe((data: any) => {
  //       if (data.Succeeded === true) {
  //         this.resetForm(form);
  //         this.toastr.success('User registration successful');
  //       } else {
  //         this.toastr.error(data.Errors[0]);
  //       }
  //     });
  // }

  // OnSubmit() {
  //   this.userService.registerUser(this.user).subscribe(
  //     data => this.toastr.success('supplier added'),
  //     err  => this.toastr.error(err)
  //   );
  // }

  checkboxChanged() {
    this.authorities = this.isAdmin ? ['ADMIN', 'USER'] : ['USER'];
    this.user.authorities = this.authorities;
  }

}
