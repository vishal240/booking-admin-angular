import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  admin_login: any;
  guestList: any = [];
  constructor(public model: ModelService) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.model.common_api('adminallcontactus', {
      admin_uid: this.admin_login.admin_uid
    }).subscribe((data: any)=> {
      if(data.status==1){
        this.guestList = data.data
        console.log(this.guestList)
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }

}
