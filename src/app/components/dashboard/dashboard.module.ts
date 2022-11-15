import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { RoomListComponent } from './room-list/room-list.component';
import { BookingComponent } from './booking/booking.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PaginationComponent } from 'src/app/shared/components/app-pagination/app-pagination.component'
import { NgxMaskModule, IConfig  } from 'ngx-mask';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { ConfirmDetailsComponent } from './confirm-details/confirm-details.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ViewBookingDetailsComponent } from './view-booking-details/view-booking-details.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    DefaultComponent,
    AddBookingComponent,
    AddPropertyComponent,
    PropertyListComponent,
    RoomListComponent,
    BookingComponent,
    GuestListComponent,
    PaymentListComponent,
    ContactUsComponent,
    ProfileComponent,
    PaginationComponent,
    EditPropertyComponent,
    PropertyDetailsComponent,
    AddRoomComponent,
    EditRoomComponent,
    BookingDetailsComponent,
    PersonDetailsComponent,
    ConfirmDetailsComponent,
    ConfirmComponent,
    ViewBookingDetailsComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    BsDatepickerModule.forRoot(),
    DashboardRoutingModule, NgxDropzoneModule, NgxMaskModule.forRoot(),
  ]
})
export class DashboardModule { }
