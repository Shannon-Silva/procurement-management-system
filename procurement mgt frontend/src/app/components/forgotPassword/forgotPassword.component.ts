import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ApplicationUser } from '../../models/ApplicationUser';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  model = new ApplicationUser(null, null, null, null, null, null, null, null, null, null);

  constructor(private toastr: ToastrService, private userService: UserService) { }

  ngOnInit() {
    
  }

  onSubmit() {
    
  }
 

}
