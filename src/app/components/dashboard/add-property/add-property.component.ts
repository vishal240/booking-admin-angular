import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  imagesName: any = [];
  admin_login: any;
  checkoutForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    location: ['', [Validators.required]],
    images:  [''],
    admin_uid: ['', [Validators.required]],
  });
  constructor(public model: ModelService, private formBuilder: FormBuilder, public router: Router) { }
  files: File[] = [];

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
  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.checkoutForm.patchValue({
      admin_uid: this.admin_login.admin_uid
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
}
