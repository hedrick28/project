import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCartService } from 'src/app/service/userCart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  firstName: string = "";
  middleName: string = "";
  lastName: string ="";
  fullname: string = "";
  mobile: string = "";
  Address: string = "";
  houseStreet: string = "";
  city: string = "";
  barangay: string = "";
  visibility: boolean = true;
  public products: any = [];
  public grandTotal : number = 0;
  
  constructor(private userCart:UserCartService,
    private router: Router, private userCartService: UserCartService) { }

  ngOnInit(): void {
    this.setCartDetails();
    this.getUserName();
  }

  placeOrder(){
    this.router.navigate(['/pendingpage']);
  }

  setCartDetails(){
    this.userCart.getUserCart().subscribe((data:any) => {
      this.grandTotal = data.grandTotal;
      this.products = data.orders
    })
  }

  handleClear(){
    this.Address = '';
  }

  getUserName(){
    this.userCartService.getUserDetails().subscribe((data:any) => {
      console.log(data)
      this.firstName = data.firstname
      this.middleName = data.middlename
      this.lastName = data.lastname
      this.mobile = data.mobilenumber
      this.Address = data.address
    })
  }
}