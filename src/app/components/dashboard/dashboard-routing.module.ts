import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingComponent } from './booking/booking.component';
import { ConfirmDetailsComponent } from './confirm-details/confirm-details.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DefaultComponent } from './default/default.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { ProfileComponent } from './profile/profile.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { RoomListComponent } from './room-list/room-list.component';
import { ViewBookingDetailsComponent } from './view-booking-details/view-booking-details.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: DefaultComponent
      },
      {
        path: 'add-booking',
        component: AddBookingComponent
      },
      {
        path: 'add-property',
        component: AddPropertyComponent
      },
      {
        path:'add-room/:id',
        component: AddRoomComponent
      },
      {
        path: 'edit-property/:id',
        component: EditPropertyComponent
      },
      {
        path: 'edit-room/:id/:room_uid',
        component: EditRoomComponent
      },
      {
        path: 'property-details/:id',
        component: PropertyDetailsComponent
      },
      {
        path: 'property-list',
        component: PropertyListComponent
      },
      {
        path: 'room-list/:id',
        component: RoomListComponent
      },
      {
        path: 'booking',
        component: BookingComponent
      },
      {
        path: 'guest-list',
        component: GuestListComponent
      },
      {
        path: 'payment-list',
        component: PaymentListComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'booking-details/:id',
        component: BookingDetailsComponent
      },
      {
        path: 'person-details/:id',
        component: PersonDetailsComponent
      },
      {
        path: 'confirm-details/:id',
        component: ConfirmDetailsComponent
      },
      {
        path: 'confirm/:id/:booking_uid',
        component: ConfirmComponent
      },
      {
        path: 'view-booking-details/:id',
        component: ViewBookingDetailsComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
