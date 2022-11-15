import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  admin_login: any;
  property_uid: any;
  propertyDetails: any;
  constructor(public model: ModelService, public router: Router, public route: ActivatedRoute) { }

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
            this.propertyDetails = data.details;
          } else {
            this.model.typeError(data.message);
          }
        }, (err: any) => {
          this.model.typeError('System generated errors');
        })
      }
    })

  }

}
