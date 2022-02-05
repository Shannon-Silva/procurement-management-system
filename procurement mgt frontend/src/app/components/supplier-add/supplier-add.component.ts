import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent implements OnInit {

  model = new Supplier(null, null, null, null);
  validateEmail = true;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private toastr: ToastrService, private supplierService: SupplierService) { }

  ngOnInit() {
  } 

  onSubmit() {
    console.log('submit clicked');
    console.log('supplier : ' + JSON.stringify(this.model));
    this.supplierService.addSupplier(this.model).subscribe(
      data => this.toastr.success('supplier added'),
      err  => this.toastr.error(err)
    );
  }


  validateEmailKeyPress(evt) {
    const keyEvent = evt || window.event;
    let key;
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    // get keycode as string
    key = keyEvent.keyCode || keyEvent.which;
    key = String.fromCharCode(key);

    // allow backspace, delete, left and right
    if (keyEvent.keyCode === 8 || keyEvent.keyCode === 46 || keyEvent.keyCode === 37 || keyEvent.keyCode === 39) {
      return true;
    }
    if ( !regex.test(key) ) {
      keyEvent.returnValue = false;
      if (keyEvent.preventDefault) {
        keyEvent.preventDefault();
      }
    }
  }

}
