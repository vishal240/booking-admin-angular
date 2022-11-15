import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ModelService } from 'src/app/model.service';

function _window(): any {
  return window;
}

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {

  get nativeWindow(): any {
    return _window();
  }

  admin_login: any;
  dashboardDtails: any ;
  constructor(public model: ModelService) { }

  pay() {
    var options = {
      key: 'rzp_test_7lss1FNDV22cwU', // Enter the Key ID generated from the Dashboard
      amount: '500', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Sonali Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
      prefill: {
        name: 'Vishal Prajapat',
        email: 'gaurav.kumar@example.com',
        contact: '9479850728',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    var rzp1 = new this.nativeWindow.Razorpay(options);
    rzp1.open();
  }
  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.model.common_api('adminadashboard', {
      admin_uid: this.admin_login.admin_uid
    }).subscribe((data: any)=> {
      console.log(data)
      if(data.status==1){
        this.dashboardDtails = data.data;
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
    var options = {
      series: [44, 55],
      chart: {
        type: 'donut',
      },
      labels: ['Booked', 'Available'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    var chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();

    var options2 = {
      series: [
        {
          name: 'Check In',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'Check Out',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };

    var chart2 = new ApexCharts(document.querySelector('#chart2'), options2);
    chart2.render();
  }
}
