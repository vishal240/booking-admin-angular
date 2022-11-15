import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
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
      this.model.common_api('adminactivepropertywithrooms', {
        admin_uid: this.admin_login.admin_uid,
        "items_perpage":"10",
        "current_page":"1",
        "sort_field":"",
        "sort_order":"",
        "search_keyword":""
      }).subscribe((data: any)=> {
        this.propertyList = [];
        if(data.status==1){
          this.propertyList = data.data.filter((s: any)=>{
            if(s.property_status !== '2'){
              return s
            }
          });
          console.log(this.propertyList)
        }
      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }
  }
}
