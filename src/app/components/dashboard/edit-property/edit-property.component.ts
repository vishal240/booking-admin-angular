import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  isUpload: boolean = false;
  imagesName: any = [];
  admin_login: any;
  property_uid: any;
  propertyDetails: any = [];
  checkoutForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    property_uid: [''],
    type: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    location: ['', [Validators.required]],
    images:  [''],
    admin_uid: ['', [Validators.required]],
  });
  constructor(public model: ModelService, private formBuilder: FormBuilder, public router: Router, public route: ActivatedRoute) { }
  files: File[] = [];

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
  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.property_uid = params['id'];
        this.model.common_api('adminpropertydetails', {
          admin_uid: this.admin_login.admin_uid,
          property_uid: this.property_uid
        }).subscribe((data: any)=> {
          console.log(data);
          if(data.status==1){
            this.checkoutForm.patchValue({
              admin_uid: this.admin_login.admin_uid,
              property_uid: this.property_uid,
              name: data.details.property_name,
              type: data.details.property_type,
              phone: data.details.property_phone,
              location: data.details.property_address,
            })
            this.propertyDetails = data.details
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
      if(this.imagesName.length>0){
        this.checkoutForm.patchValue({
          images: this.imagesName
        })
      }
      console.log(this.checkoutForm.value);
      this.model.common_api('adminaddproperty', this.checkoutForm.value).subscribe((data: any)=> {
        console.log(data);
        if(data.status==1){
          this.model.typeSuccess(data.message);
          this.router.navigateByUrl('/app/property-list')
        } else {
          this.model.typeError(data.message);
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
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
}
