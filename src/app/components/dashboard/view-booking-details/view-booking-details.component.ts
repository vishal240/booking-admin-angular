import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-view-booking-details',
  templateUrl: './view-booking-details.component.html',
  styleUrls: ['./view-booking-details.component.css']
})
export class ViewBookingDetailsComponent implements OnInit {
  admin_login: any;
  booking_uid: any;
  bookingDetails: any;
  roomDetails: any = [];
  diffDays: any;

  allAmount: any = [];
  totalAmount: any = 0;
  gstAmount: any = 0;
  grandTotal: any = 0;
  constructor(public model: ModelService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

    var date1:any = new Date(this.bookingDetails.booking_checkin);
    var date2:any = new Date(this.bookingDetails.booking_checkout);
    this.diffDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    console.log(this.bookingDetails)
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.booking_uid = params['id'];
        this.model.common_api('admingetbookingdetails', {
          admin_uid: this.admin_login.admin_uid,
          booking_uid: this.booking_uid,
        }).subscribe((data: any)=> {
          console.log(data)
          if(data.status==1){
            this.roomDetails = data.data;
            this.allAmount = [];
            for (let i = 0; i < this.roomDetails.length; i++) {
              this.allAmount.push(parseInt(this.roomDetails[i].room_charges) + (parseInt(this.roomDetails[i].extra_beds) * parseInt(this.roomDetails[i].extra_bed_charges)))
            }
            for (let i = 0; i < this.allAmount.length; i++) {
              this.totalAmount += this.allAmount[i];
            }

            this.gstAmount = (this.totalAmount * 5 / 100) + this.totalAmount ;
            this.grandTotal = (this.gstAmount-this.totalAmount) +  this.gstAmount;
          }
        }, (err: any) => {
          this.model.typeError('System generated errors');
        })
      }
    })
  }
  getTotalAmount(a,b,c){
    return parseInt(a) + (parseInt(b)*parseInt(c))
  }
  deleteProperty( ){
    this.model.common_api('admincancelbooking', {
      admin_uid: this.admin_login.admin_uid,
      booking_uid: this.booking_uid,
    }).subscribe((data: any)=> {
      console.log(data)
      if(data.status==1){
        this.model.typeSuccess(data.message)
        this.router.navigateByUrl('/app/booking')
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
  printData(){
    window.print();
  }
}
