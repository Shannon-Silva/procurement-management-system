import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  categories = ['BEAMS', 'NAILS',
    'WINDOWS', 'PLANKS'];

  suppliers: Supplier[] = [];
 
  model = new Item(null, null, null, null, null, '-');

  // submitted = false;
  constructor(private toastr: ToastrService, private itemService: ItemService, private supplierService: SupplierService) { }

  ngOnInit() {
    this.getSuppliers();
  }

  getSuppliers(): void {
    this.supplierService.getSuppliers()
      .subscribe(suppliers => {
        this.suppliers = suppliers;
        console.log('this.suppliers' + this.suppliers);
      });
  }

  onSubmit() {
    console.log('submit clicked');
    console.log('item : ' + JSON.stringify(this.model));
    this.itemService.addItem(this.model).subscribe(
      data => this.toastr.success('Item added'),
      err  => this.toastr.error(err)
    );
  }

  validateNumberKeyPress(evt) {
    const keyEvent = evt || window.event;
    let key;
    const regex = /[0-9]|\./;

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
