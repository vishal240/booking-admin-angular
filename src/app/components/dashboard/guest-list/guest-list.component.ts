import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
  admin_login: any;
  guestList: any = [];
  searchValue: any;
  totalPages: number = 0;
  constructor(public model: ModelService) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
  }
  displayActivePage(activePageNumber: number): void {
    if (!this.searchValue) {
      this.model.common_api('adminallguests', {
        admin_uid: this.admin_login.admin_uid
      }).subscribe((data: any)=> {
        console.log(data)

        if(data.status==1){
          this.guestList = data.data
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }
  }
  deleteProperty(property_uid ){
    this.model.common_api('adminupdatepropertystatus', {
      admin_uid: this.admin_login.admin_uid,
      property_uid: property_uid,
      status: 'delete'
    }).subscribe((data: any)=> {
      console.log(data)
      if(data.status==1){
        this.displayActivePage(1)
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
  activate(property_uid){
    this.model.common_api('adminupdatepropertystatus', {
      admin_uid: this.admin_login.admin_uid,
      property_uid: property_uid,
      status: 'activate'
    }).subscribe((data: any)=> {
      console.log(data)
      if(data.status==1){
        this.displayActivePage(1)
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
  inactive(property_uid){
    this.model.common_api('adminupdatepropertystatus', {
      admin_uid: this.admin_login.admin_uid,
      property_uid: property_uid,
      status: 'deactivate'
    }).subscribe((data: any)=> {
      console.log(data)
      if(data.status==1){
        this.displayActivePage(1)
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
}
