import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApplicationUser } from '../../models/ApplicationUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  user: ApplicationUser;
  model= new ApplicationUser(null, null, null, null, null, null, null, null, null, null);

  constructor(private toastr: ToastrService, private userService: UserService) { }

   ngOnInit() {
    this.getDetails()
  }

  getDetails():void{
    this.userService.getDetails()
    .subscribe(user =>{
      this.user = user;
      console.log('this.user'+ this.user);
    });
  }


  OnEdit(){

  }
}
 