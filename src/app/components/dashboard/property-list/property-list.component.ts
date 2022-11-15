import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/model.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  admin_login: any;
  propertyList: any = [];
  searchValue: any;
  totalPages: number = 0;
  constructor(public model: ModelService) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
  }
  displayActivePage(activePageNumber: number): void {
    if (!this.searchValue) {
      this.model.common_api('adminpropertylist', {
        admin_uid: this.admin_login.admin_uid
      }).subscribe((data: any)=> {
        this.propertyList = [];
        if(data.status==1){
          this.propertyList = data.data.filter((s: any)=>{
            if(s.property_status !== '2'){
              return s
            }
          });
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }
  }
  deleteProperty(property_uid ){
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
    })

  }
  activate(property_uid){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to active this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
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
    })

  }
  inactive(property_uid){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to deactivate this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
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
    })

  }
}
