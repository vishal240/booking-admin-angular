import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  admin_login: any;
  checkoutForm = this.formBuilder.group({
    customer_uid: [''],
    admin_uid: ['', [Validators.required]],
    customer_its: ['', [Validators.required]],
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    mname: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
  });
  property_uid: any;
  constructor(private formBuilder: FormBuilder, public model: ModelService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.checkoutForm.patchValue({
      admin_uid: this.admin_login.admin_uid
    })
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.property_uid = params['id'];
      }
    });
  }
  ngAfterViewInit() {
    // server-side search
  fromEvent(this.input.nativeElement,'keyup')
      .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          tap((text) => {
            this.searchCustomer(this.input.nativeElement.value)
          })
      )
      .subscribe();
  }
  searchCustomer(e){
    setTimeout(() => {
      this.model.common_api('admincustomerbyits', {
        admin_uid: this.admin_login.admin_uid,
        customer_its: e
      }).subscribe((data: any)=> {
        console.log(data);
        if(data.status==1){
          this.checkoutForm.patchValue({
            fname: data.data.customer_fname,
            mname: data.data.customer_mname,
            lname: data.data.customer_lname,
            customer_its: data.data.customer_its,
            email: data.data.customer_email,
            phone: data.data.customer_phone,
            customer_uid: data.data.customer_uid
          })
        } else {
          this.checkoutForm.patchValue({
            fname: '',
            mname: '',
            lname: '',
            email: '',
            phone: '',
            customer_uid: ''
          })
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }, 2000);

  }

  submit(){
    if(this.checkoutForm.invalid){
      this.model.typeError('Please add required fields')
    } else {
      console.log(this.checkoutForm.value);
      this.model.common_api('adminaaddcustomer', this.checkoutForm.value).subscribe((data: any)=> {
        console.log(data);
        if(data.status==1){
          this.model.typeSuccess(data.message);
          this.checkoutForm.patchValue({
            customer_uid: data.data.customer_uid
          })
          localStorage.setItem('current_customer', JSON.stringify(this.checkoutForm.value));
          this.router.navigateByUrl('/app/confirm-details/'+this.property_uid)
        } else {
          this.model.typeError(data.message)
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }
  }
}
