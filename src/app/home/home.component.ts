import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DonorStatisticsDto, StatisticsServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase implements OnInit {
  donorStatistics: DonorStatisticsDto;

  donationChartData: any;
  transfusionChartData: any;
  donationChartOptions: any;
  transfusionChartOptions: any;


  ngOnInit(): void {
    if (this.isGranted("Donor")) {
      this._statisticsService
        .getDonorStatistics()
        .subscribe((result: DonorStatisticsDto) => {
          this.donorStatistics = result;

          this.initializeDonationChart(this.donorStatistics.typesOfDonations);
          this.initializeTransfusionChart(this.donorStatistics.transfusionsPerMonth);
        });
    }
  }


  constructor(injector: Injector,
    private _statisticsService: StatisticsServiceProxy) {
    super(injector);
  }

  public initializeDonationChart(donations: number[]) {
    this.donationChartData = {
      labels: ['Ordinary donations', 'Special Donations', 'Covid plasma donations'],
      datasets: [
        {
          label: 'Donations dataset',
          data: this.donorStatistics.typesOfDonations,
          backgroundColor: ["#28a745", "#ffc107", "#007bff"],
          hoverBackgroundColor: new Array(3).fill('#dc3545')
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
  }

  public initializeTransfusionChart(transfusions: number[]) {
    this.transfusionChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
      datasets: [
        {
          label: 'Number of transfusions',
          data: this.donorStatistics.transfusionsPerMonth,
          backgroundColor: ["#28a745", "#ffc107", "#007bff", "#28a745", "#ffc107", "#007bff", "#28a745", "#ffc107", "#007bff", "#28a745", "#ffc107", "#007bff"],
          hoverBackgroundColor: new Array(12).fill('#dc3545')

        }
      ]
    }

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
