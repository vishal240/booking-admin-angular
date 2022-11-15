import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  imagesName: any = [];
  files: File[] = [];
  admin_login: any;
  checkoutForm = this.formBuilder.group({
    room_uid: [''],
    property_uid: ['', [Validators.required]],
    number: ['', [Validators.required]],
    type: ['ac', [Validators.required]],
    bed_type: ['', [Validators.required]],
    capacity: ['', [Validators.required]],
    rent: ['', [Validators.required]],
    extra_bed_charge: [''],
    phone: ['', [Validators.required]],
    amenities: [],
    images:  [''],
    admin_uid: ['', [Validators.required]],
  });
  property_uid: any;
  amenitiesType: any = []
  amenitiesType2: any = []
  constructor(public route: ActivatedRoute, private _location: Location, public model: ModelService, private formBuilder: FormBuilder, public router: Router) { }
  checkCheckBoxvalue(event, name, value, i){
    if(event.target.checked){
      this.amenitiesType2.push({name: name, value: value})
    } else {
      this.amenitiesType2.find((x,n) => {
        if(x.value==value){
          this.amenitiesType2.splice(n, 1);
        }
      });
    }
  }
  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.property_uid = params['id'];
        this.checkoutForm.patchValue({
          admin_uid: this.admin_login.admin_uid,
          property_uid: this.property_uid
        })
        this.model.common_api('adminactiveamenities', {
          admin_uid: this.admin_login.admin_uid
        }).subscribe((data: any)=> {
          if(data.status==1){
            this.amenitiesType = data.data;
          }
        }, (err: any) => {
          this.model.typeError('System generated errors');
        })
      }
    });

  }
  submit(){
    if(this.checkoutForm.invalid){
      this.model.typeError('Please fill required fields')
    } else {
      if(this.imagesName.length>0){
        this.checkoutForm.patchValue({
          images: this.imagesName,
        })
      }
      if(this.amenitiesType2.length>0){
        this.checkoutForm.patchValue({
          amenities: this.amenitiesType2
        })
      }
      console.log(this.checkoutForm.value);
      this.model.common_api('adminaddroom', this.checkoutForm.value).subscribe((data: any)=> {
        console.log(data);
        if(data.status==1){
          this.model.typeSuccess(data.message);
          this._location.back();
        } else {
          this.model.typeError(data.message);
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }

  }
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    for (let i = 0; i < this.files.length; i++) {
      this.upload(i, this.files[i]);
    }
  }
  upload(idx: number, file: File): void {
    if (file) {
      if(file.type==='image/png' || file.type==='image/jpeg'){
        const formData = new FormData();
        formData.append('filename', file);
        this.model.uploadImages(formData).subscribe(data => {
          console.log(data)
          if(data.status === 1){
            this.imagesName.push(data.data.name)
          } else {
            this.model.typeError(data.message);
          }
        }, (err)=> {
          this.model.typeError("System Generated Error")
        });
      } else {
        this.model.typeError('Unable to upload a image: This image type is not supported')
      }
    }
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
