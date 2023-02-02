import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Product } from './product-dashboard.model';

@Component({
  selector: 'app-product-admin-dashboard',
  templateUrl: './product-admin-dashboard.component.html',
  styleUrls: ['./product-admin-dashboard.component.scss']
})
export class ProductAdminDashboardComponent implements OnInit {
  formValue !: FormGroup;
  productObj: Product = new Product();
  productData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  productList : any;
  visibility=false;
  id !: number
  totalItemSale !: number

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private cartService : CartService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
    name : [''],
    title : [''],
    price : [''],
    description : [''],
    category : [''],
    image : [''],
    totalItemSale : 0, 
    stock : 0
    })
    this.getAllProducts();
    this.api.getProducts().subscribe(data => {
      this.productList = data;
    });
  }

  getAllProducts() {
    this.api.getProducts()
      .subscribe(res => {
        this.productData = res;
      })
  }

  clickAddProduct() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postProductDetails() {
    this.productObj.name = this.formValue.value.name;
    this.productObj.title = this.formValue.value.title;
    this.productObj.price = this.formValue.value.price;
    this.productObj.description = this.formValue.value.description;
    this.productObj.category = this.formValue.value.category;
    this.productObj.image = this.formValue.value.image;
    this.productObj.stock = this.formValue.value.stock;
    

    this.api.postProduct(this.productObj)
      .subscribe((res: any) => {
        alert("Product added successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProducts();
      }, err => {
        alert("Something went wrong!")
      });
  }

  deleteProduct(data: any) {
    this.api.deleteProduct(data.id)
      .subscribe(res => {
        this.getAllProducts();
      })

  }

  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.productObj.id = data.id
    this.productObj.totalItemSale = data.totalItemSale
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['title'].setValue(data.title)
    this.formValue.controls['price'].setValue(data.price)
    this.formValue.controls['description'].setValue(data.description)
    this.formValue.controls['category'].setValue(data.category)
    this.formValue.controls['image'].setValue(data.image)
    this.formValue.controls['stock'].setValue(data.stock)
  }
  logout() {   
    this.cartService.updateStockAndItemSale();                      
    this.router.navigate(['/product']);
    localStorage.clear();

  }

  updateProductDetails() {
    this.productObj.name = this.formValue.value.name;
    this.productObj.title = this.formValue.value.title;
    this.productObj.price = this.formValue.value.price;
    this.productObj.description = this.formValue.value.description;
    this.productObj.category = this.formValue.value.category;
    this.productObj.image = this.formValue.value.image;
    this.productObj.stock = this.formValue.value.stock;
    
    

    this.api.updateProduct(this.productObj, this.productObj.id)
      .subscribe(res => {
        alert("Updated Successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProducts();
      })
  }

  topfiveItems(){
    this.visibility = true
  }

  showButton(){
    this.visibility = false
  }

  delete(data : any){
    var returnval = confirm("Are you sure you want to delete this item?")
    if (returnval){
      this.deleteProduct(data)
      this.getAllProducts();
    }else{
      this.getAllProducts();
    }
  }

}
