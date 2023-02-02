import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './admin-dashboard.model';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  formValue !: FormGroup;
  dashboardObj: EmployeeModel = new EmployeeModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  showActivate !: boolean;
  showDeactivate: boolean = true;
  visibility=false;
  productList : any;


  constructor(private formbuilder: FormBuilder,
    private api: ApiService, private http: HttpClient,
    private router: Router,
    private cartService : CartService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username : ['',Validators.required],
      password : ['',Validators.required],
      firstname : ['',Validators.required],
      middlename : ['',Validators.required],
      lastname : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      mobilenumber : ['',[Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]],
      role : ['user'],
      status: ['activated'],
      birthdate : Date,
      interest : ['',Validators.required],
      address : ['',Validators.required],
    })
    this.getAllUser();

    this.api.getProducts().subscribe(data => {
      this.productList = data;
    });
  }
  clickAddUser() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  logout() {   
    this.cartService.updateStockAndItemSale();                      
    this.router.navigate(['/product']);
    localStorage.clear();

  }

  postUserDetails() {
    this.dashboardObj.email = this.formValue.value.email;
    this.dashboardObj.firstname = this.formValue.value.firstname;
    this.dashboardObj.username = this.formValue.value.username;
    this.dashboardObj.middlename = this.formValue.value.middlename;
    this.dashboardObj.lastname = this.formValue.value.lastname;
    this.dashboardObj.password = this.formValue.value.password;
    this.dashboardObj.role = 'user';
    this.dashboardObj.address = this.formValue.value.address;
    this.dashboardObj.birthdate = this.formValue.value.birthdate;
    this.dashboardObj.interest = this.formValue.value.interest;
    this.dashboardObj.mobilenumber = this.formValue.value.mobilenumber

    this.api.postUser(this.dashboardObj)
      .subscribe((res: any) => {
        alert("User added successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      }, err => {
        alert("Something went wrong!")
      });
  }

  getAllUser() {
    this.api.getUser()
      .subscribe(res => {
        this.userData = res;
      })
  }

  activate() {
    this.showActivate = false;
    this.showDeactivate = true;
  }

  deactivate() {
    alert("Account has been deactivated!")
    this.showActivate = true;
    this.showDeactivate = false;
  }

  
 


  onUpdate(data: any) {
    this.dashboardObj.id = data.id
    this.dashboardObj.email = data.email;
    this.dashboardObj.firstname = data.firstname;
    this.dashboardObj.username = data.username;
    this.dashboardObj.middlename = data.middlename;
    this.dashboardObj.lastname = data.lastname;
    this.dashboardObj.password = data.password;
    this.dashboardObj.mobilenumber = data.mobilenumber;
    this.dashboardObj.address = data.address;
    this.dashboardObj.birthdate = data.birthdate;
    this.dashboardObj.interest = data.interest;

  }

  updateUserStatus(){
    this.showActivate = true;
    this.showDeactivate = false;
    this.dashboardObj.status = "deactivated"
    this.api.updateUser(this.dashboardObj, this.dashboardObj.id)
      .subscribe(res => {
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })
  }

  activateStatus(){
    this.showActivate = false;
    this.showDeactivate = true;
    this.dashboardObj.status = "activated"
    this.api.updateUser(this.dashboardObj, this.dashboardObj.id)
      .subscribe(res => {
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })
  }

  topfiveItems(){
    this.visibility = true
  }

  showButton(){
    this.visibility = false
  }


}




