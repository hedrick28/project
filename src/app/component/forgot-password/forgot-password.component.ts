import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCartService } from 'src/app/service/userCart.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword !: FormGroup;
  password : string = '';

  constructor(private http: HttpClient, private router: Router, private formbuilder: FormBuilder,
    private userCartService : UserCartService) { }

  ngOnInit(): void {
    this.forgotPassword = this.formbuilder.group({
      username: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      mobilenumber: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    })
  }

  submit() {
    const cartName = this.forgotPassword.value.username;
    const cartPassword = this.forgotPassword.value.password;
    this.http.get<any>("http://localhost:3000/post")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.username === this.forgotPassword.value.username &&
            (a.email === this.forgotPassword.value.email && a.mobilenumber === this.forgotPassword.value.mobilenumber) 
        });
        if (user) {
            this.password = user.password
            this.userCartService.loadUserDetails(cartName,this.password)
            this.forgotPassword.reset();
            this.router.navigate(['acknowledgement'])
        }
        else{
          alert("Input is invalid")
        }
      }, err => {
        alert("Something went wrong!")
      })
  }
}
