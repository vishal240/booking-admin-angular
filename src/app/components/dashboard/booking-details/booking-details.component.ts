import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
  providers: [DatePipe]
})
export class BookingDetailsComponent implements OnInit {
  admin_login: any;
  property_uid: any;
  propertyDetails: any;
  checkoutForm = this.formBuilder.group({
    property_uid: ['', [Validators.required]],
    check_in: [''],
    check_out: [''],
    check_in2: ['', [Validators.required]],
    check_out2: ['', [Validators.required]],
    adults: ['', [Validators.required]],
    children: ['', [Validators.required]],
    room_type: ['', [Validators.required]],
    admin_uid: ['', [Validators.required]],
  });
  colorTheme = 'theme-blue';
  minDate: Date;
  bsConfig?: Partial<BsDatepickerConfig>;
  roomDetails: any = [];
  roomData: any = [];
  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, public model: ModelService, public router: Router, public route: ActivatedRoute) { }
  ngOnInit(): void {
    this.minDate = new Date();
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.property_uid = params['id'];
        this.model.common_api('adminpropertydetails', {
          admin_uid: this.admin_login.admin_uid,
          property_uid: this.property_uid
        }).subscribe((data: any)=> {
          console.log(data);
          if(data.status==1){
            this.propertyDetails = data.details;
            this.checkoutForm.patchValue({
              admin_uid: this.admin_login.admin_uid,
              property_uid: this.property_uid
            })
          } else {
            this.model.typeError(data.message);
          }
        }, (err: any) => {
          this.model.typeError('System generated errors');
        })

      }
    })

  }
  submit(){
    if(this.checkoutForm.invalid){
      this.model.typeError('Please fill required fields')
    } else {
      this.checkoutForm.patchValue({
        check_in: this.datePipe.transform(this.checkoutForm.value.check_in2,"yyyy-MM-dd"),
        check_out: this.datePipe.transform(this.checkoutForm.value.check_out2,"yyyy-MM-dd")
      })
      this.model.common_api('adminsearchrooms', this.checkoutForm.value).subscribe((data: any)=> {
        console.log(data);
        if(data.status==1){
          this.roomDetails = data.data;
          for (const key in this.roomDetails) {
            this.roomDetails[key].extra_bed=0
          }
        } else {
          this.model.typeError(data.message);
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }
  }
  getTotalAmount(a,b,c){
    return parseInt(a) + (parseInt(b)*parseInt(c))
  }
  addExtraBed(e,i){
    this.roomDetails[i].extra_bed=parseInt(e.target.value);
  }
  addData(e, item,id){
    if(e.target.checked){
      this.roomData.push(item)
    } else {
      this.roomData.find((x,n) => {
        if(x.room_uid==id){
          this.roomData.splice(n, 1);
        }
      });
    }
  }
  next(){
    if(this.roomData.length>0){
      localStorage.setItem('currentCheckDetails', JSON.stringify(this.checkoutForm.value));
      localStorage.setItem('currentRoom', JSON.stringify(this.roomData));
      this.router.navigateByUrl('/app/person-details/'+this.property_uid)
    } else {
      this.model.typeError('Please add rooms')
    }

  }
}
