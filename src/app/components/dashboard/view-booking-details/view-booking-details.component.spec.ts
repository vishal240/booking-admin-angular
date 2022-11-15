import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingDetailsComponent } from './view-booking-details.component';

describe('ViewBookingDetailsComponent', () => {
  let component: ViewBookingDetailsComponent;
  let fixture: ComponentFixture<ViewBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBookingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
