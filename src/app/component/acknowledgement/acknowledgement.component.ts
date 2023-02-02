import { Component, OnInit } from '@angular/core';
import { UserCartService } from 'src/app/service/userCart.service';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss']
})
export class AcknowledgementComponent implements OnInit {

  password !:string
  username !: string

  constructor(private userCartService : UserCartService) { }

  ngOnInit(): void {
    this.getUserName()
  }
  getUserName(){
    this.userCartService.getUserDetails().subscribe((data:any) => {
      this.password = data.password
      this.username = data.username
    })
  }
}


