import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/model.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  admin_login: any;
  admin_details: any;

  checkoutForm = this.formBuilder.group({
    admin_email: ['', [Validators.required]],
    admin_fname: ['', [Validators.required]],
    admin_its: ['', [Validators.required]],
    admin_lname: ['', [Validators.required]],
    admin_mname: [''],
    admin_phone:  ['', [Validators.required]],
    admin_uid: ['', [Validators.required]],
  });

  checkoutForm2 = this.formBuilder.group({
    admin_uid: ['', [Validators.required]],
    current_password: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
  });

  constructor(public model: ModelService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.model.common_api('adminprofile', {
      admin_uid: this.admin_login.admin_uid
    }).subscribe((data: any)=> {
      console.log(data)
      if(data.status==1){
        this.admin_details = data.data;
        localStorage.setItem('admin_login', JSON.stringify(data.data))
        this.checkoutForm.patchValue({
          admin_email: this.admin_details.admin_email,
          admin_fname: this.admin_details.admin_fname,
          admin_mname: this.admin_details.admin_mname,
          admin_lname: this.admin_details.admin_lname,
          admin_phone: this.admin_details.admin_phone,
          admin_its: this.admin_details.admin_its,
          admin_uid: this.admin_details.admin_uid
        })

        this.checkoutForm2.patchValue({
          admin_uid: this.admin_details.admin_uid
        })
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
  submit(){
    if(this.checkoutForm.invalid){
      this.model.typeError('Fields are required.')
    } else {
      console.log(this.checkoutForm.value);
      this.model.common_api('adminupdateprofile', {
        email: this.checkoutForm.value.admin_email,
        fname: this.checkoutForm.value.admin_fname,
        its_id: this.checkoutForm.value.admin_its,
        lname: this.checkoutForm.value.admin_lname,
        mname: this.checkoutForm.value.admin_mname,
        phone: this.checkoutForm.value.admin_phone,
        admin_uid: this.checkoutForm.value.admin_uid
      }).subscribe((data: any)=> {
        console.log(data)
        if(data.status==1){
          this.model.typeSuccess(data.message);
          this.ngOnInit();
        } else {
          this.model.typeError(data.message);
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }
  }
  changePassword(){
    if(this.checkoutForm2.invalid){
      this.model.typeError('Fields are required.')
    } else {
      console.log(this.checkoutForm2.value);
      if(this.checkoutForm2.value.password === this.checkoutForm2.value.confirm_password){
        this.model.common_api('adminchangepassword', this.checkoutForm2.value).subscribe((data: any)=> {
          console.log(data)
          if(data.status==1){
            this.model.typeSuccess(data.message);
            this.ngOnInit();
          } else {
            this.model.typeError(data.message);
          }
        }, (err: any) => {
          this.model.typeError('System generated errors');
        })
      } else {
        this.model.typeError("Password and confirm password doesn't match.")
      }

    }
  }
}
