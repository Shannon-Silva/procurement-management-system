import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-supplier-view',
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.css']
})
export class SupplierViewComponent implements OnInit {

  suppliers: any[];
  selected: string[] = [];
  selectedForEdit;
  modalOpened;
  model = new Supplier(null, null, null, null);

  constructor(private toastr: ToastrService, private supplierService: SupplierService) { }

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

  onDelete() {
    console.log(this.selected);
    this.supplierService.deleteSuppliers(JSON.parse(JSON.stringify(this.selected)))
      .subscribe(
        any => {
          console.log('deleted suppliers' + this.selected);
          this.toastr.success('Successfully deleted');
          this.getSuppliers();
        },
        err  => this.toastr.error(err)
      );
  }

  onEdit() {
    console.log(JSON.stringify(this.selected));
    this.model = JSON.parse(JSON.stringify(this.selected[0])) as Supplier;
    this.modalOpened = true;

  }

  onSubmitEdited() {
    console.log(this.model);
    this.supplierService.updateSupplier(this.model)
      .subscribe(
        any => {
          console.log('updated supplier' + JSON.stringify(this.model));
          this.toastr.success('Supplier updated successfully');
          this.getSuppliers();
        },
        err => this.toastr.error(err)
      );
    this.modalOpened = false;
  }

  onSubmit() {
    this.toastr.info(JSON.stringify(this.model));
  }

}
