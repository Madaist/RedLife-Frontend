import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase {
  donationChartData: any;
  transfusionChartData: any;
  donationChartOptions: any;
  transfusionChartOptions: any;

  constructor(injector: Injector) {
    super(injector);

    this.donationChartData = {
      labels: ['Ordinary donations', 'Special Donations', 'Covid plasma donations'],
      datasets: [
        {
          label: 'Donations dataset',
          data: [65, 59, 80],
          backgroundColor: ["#28a745", "#ffc107", "#007bff"],
          hoverBackgroundColor: new Array(12).fill('#dc3545')

        }
      ]
    }

    this.transfusionChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
      datasets: [
        {
          label: 'Number of transfusions',
          data: [1, 0, 2, 0, 0, 0, 2, 3, 0, 0, 0, 1],
          backgroundColor: ["#28a745", "#ffc107", "#007bff", "#28a745", "#ffc107", "#007bff", "#28a745", "#ffc107", "#007bff", "#28a745", "#ffc107", "#007bff"],
          hoverBackgroundColor: new Array(12).fill('#dc3545')

        }
      ]
    }

    this.donationChartOptions = {
      title: {
        display: true,
        text: 'Donation Types',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };

    this.transfusionChartOptions = {
      title: {
        display: true,
        text: 'Transfusions using your donated blood',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }
}
