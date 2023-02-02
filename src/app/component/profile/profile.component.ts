import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { UserCartService } from 'src/app/service/userCart.service';
import { ProfileModel } from './profile.model';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  dashboardObj: ProfileModel = new ProfileModel();
  formValue !: FormGroup;
  userData !: any;
  disabled : boolean = true
  showEdit : boolean = true
  showUpdate !: boolean
  data : any ={}


  constructor(private formbuilder: FormBuilder,
    private api: ApiService, private http: HttpClient,
    private router: Router, private userCartService: UserCartService,
    private userCart: UserCartService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilenumber: ['', [Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]],
      role: ['user'],
      status: ['activated'],
      birthdate: Date,
      interest: ['', Validators.required],
      address: ['', Validators.required],
    })
    this.onEdit(this.data)
  }


  getUserName() {
    this.userCartService.getUserDetails().subscribe((data: any) => {
      this.dashboardObj.role = data.role
      this.dashboardObj.status = data.status
      this.dashboardObj.id = data.id
      this.dashboardObj.password = data.password
    })
  }

  getDetails(id : number){
    this.api.getProfile(id)
    .subscribe(res => {
      this.dashboardObj = res
      this.data = this.dashboardObj
    })
  }


  onEdit(data: any) {
    this.getUserName()
    this.getDetails(this.dashboardObj.id)
    this.formValue.controls['firstname'].setValue(data.firstname)
    this.formValue.controls['middlename'].setValue(data.middlename)
    this.formValue.controls['lastname'].setValue(data.lastname)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['username'].setValue(data.username)
    this.formValue.controls['mobilenumber'].setValue(data.mobilenumber)
    this.formValue.controls['birthdate'].setValue(data.birthdate)
    this.formValue.controls['address'].setValue(data.address)
    this.formValue.controls['interest'].setValue(data.interest)
    this.disabled = false;
    this.showEdit = false;
    this.showUpdate = true;

  }

  updateUserDetails() {
    this.disabled = true;
    this.showEdit = true;
    this.showUpdate = false;
    this.dashboardObj.email = this.formValue.value.email;
    this.dashboardObj.firstname = this.formValue.value.firstname;
    this.dashboardObj.middlename = this.formValue.value.middlename;
    this.dashboardObj.lastname = this.formValue.value.lastname;
    this.dashboardObj.username = this.formValue.value.username
    this.dashboardObj.mobilenumber = this.formValue.value.mobilenumber
    this.dashboardObj.birthdate = this.formValue.value.birthdate
    this.dashboardObj.address = this.formValue.value.address
    this.dashboardObj.interest = this.formValue.value.interest

    

    this.api.updateUser(this.dashboardObj, this.dashboardObj.id)
      .subscribe(res => {
        alert("Updated Successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getUserName();
        
      })
  }

}

