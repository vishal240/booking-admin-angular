import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-confirm-details',
  templateUrl: './confirm-details.component.html',
  styleUrls: ['./confirm-details.component.css']
})
export class ConfirmDetailsComponent implements OnInit {
  property_uid: any;
  admin_login: any;
  current_customer: any;
  currentCheckDetails: any;
  currentRoom: any = [];

  currentDate = new Date();
  diffDays: any;
  allAmount: any = [];
  totalAmount: any = 0;
  gstAmount: any = 0;
  grandTotal: any = 0;
  rooms_and_extra_beds: any = [];
  constructor(public model: ModelService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.current_customer = JSON.parse(localStorage.getItem('current_customer'));
    this.currentCheckDetails = JSON.parse(localStorage.getItem('currentCheckDetails'));
    this.currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.property_uid = params['id'];
      }
    });
    this.calculateDiff()
  }
  calculateDiff(){
    var date1:any = new Date(this.currentCheckDetails.check_in2);
    var date2:any = new Date(this.currentCheckDetails.check_out2);
    this.diffDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    this.allAmount = [];
    for (let i = 0; i < this.currentRoom.length; i++) {
      this.allAmount.push(parseInt(this.currentRoom[i].room_charge) + (parseInt(this.currentRoom[i].extra_bed) * parseInt(this.currentRoom[i].room_extrabedcharge)))
    }
    for (let i = 0; i < this.allAmount.length; i++) {
      this.totalAmount += this.allAmount[i];
    }

    this.gstAmount = (this.totalAmount * 5 / 100) + this.totalAmount ;
    this.grandTotal = (this.gstAmount-this.totalAmount) +  this.gstAmount;

    for (const key in this.currentRoom) {
      this.rooms_and_extra_beds.push({room_uid: this.currentRoom[key].room_uid, extra_bed: this.currentRoom[key].extra_bed })
    }
  }
  getTotalAmount(a,b,c){
    return parseInt(a) + (parseInt(b)*parseInt(c))
  }
  submit(){
    this.model.common_api('adminaddbookings', {
      "admin_uid":this.admin_login.admin_uid,
      "customer_uid":this.current_customer.customer_uid,
      "property_uid":this.property_uid,
      "check_in":this.currentCheckDetails.check_in,
      "check_out":this.currentCheckDetails.check_out,
      "adults":this.currentCheckDetails.adults,
      "children":this.currentCheckDetails.children,
      "sgst":this.gstAmount-this.totalAmount,
      "cgst":this.gstAmount-this.totalAmount,
      "total":this.grandTotal,
      "amount_paid":this.grandTotal,
      "rooms_and_extra_beds":this.rooms_and_extra_beds
  }).subscribe((data: any)=> {
      console.log(data);
      if(data.status==1){
        this.model.typeSuccess(data.message)
        this.router.navigateByUrl('/app/confirm/'+this.property_uid+'/'+data.data.booking_uid)
      } else {
        this.model.typeError(data.message);
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
}
