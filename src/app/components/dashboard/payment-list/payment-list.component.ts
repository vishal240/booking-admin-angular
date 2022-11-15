import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  admin_login: any;
  paymentList: any = [];
  constructor(public model: ModelService) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.model.common_api('adminallpayments', {
      admin_uid: this.admin_login.admin_uid
    }).subscribe((data: any)=> {
      console.log(data)
      if(data.status==1){
        this.paymentList = data.data
        console.log(this.paymentList)
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }

}
