import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from 'src/app/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  admin_login: any;
  propertyList: any = [];
  searchValue: any;
  totalPages: number = 0;
  property_uid: any;
  constructor(public model: ModelService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.property_uid = params['id'];
      }
    })
  }
  displayActivePage(activePageNumber: number): void {
    if (!this.searchValue) {
      this.model.common_api('adminaroomsbyproperty', {
        admin_uid: this.admin_login.admin_uid,
        "property_uid":this.property_uid,
        "items_perpage":"10",
        "current_page":"1",
        "sort_field":"",
        "sort_order":"",
        "search_keyword":""
      }).subscribe((data: any)=> {
        console.log(data)
        this.propertyList = [];
        if(data.status==1){
          this.propertyList = data.data
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }
  }
  deleteProperty(room_uid ){
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
        this.model.common_api('adminupdateroomstatus', {
          admin_uid: this.admin_login.admin_uid,
          room_uid: room_uid,
          status: 'delete'
        }).subscribe((data: any)=> {
          console.log(data)
          if(data.status==1){
            this.displayActivePage(0)
          }
        }, (err: any) => {
          this.model.typeError('System generated errors');
        })
      }
    })

  }
  activate(room_uid){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to activate this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.model.common_api('adminupdateroomstatus', {
          admin_uid: this.admin_login.admin_uid,
          room_uid: room_uid,
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
  inactive(room_uid){
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
        this.model.common_api('adminupdateroomstatus', {
          admin_uid: this.admin_login.admin_uid,
          room_uid: room_uid,
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
