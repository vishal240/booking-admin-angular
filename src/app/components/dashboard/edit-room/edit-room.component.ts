import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  isUpload: boolean = false;
  propertyDetails: any = [];
  imagesName: any = [];
  files: File[] = [];
  admin_login: any;
  checkoutForm = this.formBuilder.group({
    room_uid: [''],
    property_uid: ['', [Validators.required]],
    number: ['', [Validators.required]],
    type: ['', [Validators.required]],
    bed_type: ['', [Validators.required]],
    capacity: ['', [Validators.required]],
    rent: ['', [Validators.required]],
    extra_bed_charge: [''],
    phone: ['', [Validators.required]],
    amenities: [],
    images:  [''],
    admin_uid: ['', [Validators.required]],
  });
  newAmenities: any = [];
  property_uid: any;
  amenitiesType: any = []
  amenitiesType2: any = [];
  amenitiesType3: any = []
  room_uid: any;
  constructor(public route: ActivatedRoute, private _location: Location, public model: ModelService, private formBuilder: FormBuilder, public router: Router) { }
  checkCheckBoxvalue(event, name, value, i){
    if(event.target.checked){
      this.amenitiesType3.push({name: name, value: value})
    } else {
      this.amenitiesType3.find((x,n) => {
        if(x.value==value){
          this.amenitiesType3.splice(n, 1);
        }
      });
    }
  }
  deleteProperty(image_uid ){
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
        this.model.common_api('deleteimage', {
          admin_uid: this.admin_login.admin_uid,
          image_uid: image_uid,
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
  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.property_uid = params['id'];
        this.room_uid = params['room_uid'];
        this.model.common_api('adminactiveamenities', {
          admin_uid: this.admin_login.admin_uid
        }).subscribe((data: any)=> {
          if(data.status==1){
            this.amenitiesType = data.data;
          }
        }, (err: any) => {
          this.model.typeError('System generated errors');
        })

        this.model.common_api('adminroomdetails', {
          admin_uid: this.admin_login.admin_uid,
          room_uid: this.room_uid
        }).subscribe((data: any)=> {
          if(data.status==1){
            console.log(data)
            this.checkoutForm.patchValue({
              admin_uid: this.admin_login.admin_uid,
              property_uid: this.property_uid,
              room_uid: this.room_uid,
              number: data.data.room_number,
              bed_type: data.data.room_type,
              capacity: data.data.room_bedcapacity,
              rent: data.data.room_charge,
              extra_bed_charge: data.data.room_extrabedcharge,
              phone: data.data.room_phone,

            })
            if(data.data.room_acroom=='0'){
              this.checkoutForm.patchValue({
                type: 'non-ac',
              })
            } else {
              this.checkoutForm.patchValue({
                type: 'ac',
              })
            }
            this.propertyDetails = data.data
            this.newAmenities = data.data.amenities
            if(this.newAmenities.length>0){
              for (let index = 0; index < this.newAmenities.length; index++) {
                this.amenitiesType2.push({name: this.newAmenities[index].amenity, value: this.newAmenities[index].amenity_uid})
              }
              console.log(this.amenitiesType2)
            }
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
      if(this.amenitiesType3.length>0){
        this.checkoutForm.patchValue({
          amenities: this.amenitiesType3
        })
      } else {
        if(this.amenitiesType2.length>0){
          this.checkoutForm.patchValue({
            amenities: this.amenitiesType2
          })
        }
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
    this.isUpload = true;
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
          this.isUpload = false;
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
