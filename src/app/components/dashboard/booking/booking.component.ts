import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  admin_login: any;
  bookingList: any = [];
  constructor(public model: ModelService, public router: Router) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.model.common_api('admingetbookings', {
      admin_uid: this.admin_login.admin_uid
    }).subscribe((data: any)=> {
      console.log(data)

      if(data.status==1){
        this.bookingList = data.data
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
  deleteProperty(booking_uid ){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.model.common_api('admincancelbooking', {
          admin_uid: this.admin_login.admin_uid,
          booking_uid: booking_uid,
        }).subscribe((data: any)=> {
          console.log(data)
          if(data.status==1){
            this.ngOnInit()
          }
        }, (err: any) => {
          this.model.typeError('System generated errors');
        })
      }
    })

  }
  gotoDetails(item, id){
    localStorage.setItem('bookingDetails', JSON.stringify(item))
    this.router.navigateByUrl('/app/view-booking-details/'+id)
  }
}
