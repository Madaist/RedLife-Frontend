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

  donorChartDonationsData: any;
  donorChartDonationsOptions: any;

  donorChartTransfusionsData: any;
  donorChartTrnafusionsOptions: any;

  adminChartDonationTypesData: any;
  adminChartDonationTypesOptions: any;

  adminChartUsersData: any;
  adminChartUsersOptions: any;

  adminChartEvolutionData: any;
  adminChartEvolutionOptions: any;


  ngOnInit(): void {
    if (this.isGranted("Donor")) {
      this._statisticsService
        .getDonorStatistics()
        .subscribe((result: DonorStatisticsDto) => {
          this.donorStatistics = result;

          this.initializeDonorDonationChart(this.donorStatistics.typesOfDonations);
          this.initializeDonorTransfusionChart(this.donorStatistics.transfusionsPerMonth);
        });
    }

    if (this.isGranted("Admin")) {
      this.initializeAdminChartDonationTypes();
      this.initializeAdminChartUsers();
      this.initializeAdminChartOperations();
    }
  }


  constructor(injector: Injector,
    private _statisticsService: StatisticsServiceProxy) {
    super(injector);
  }

  /*
  Charts used for blood donor statistics
  */
  public initializeDonorDonationChart(donations: number[]) {
    this.donorChartDonationsData = {
      labels: ['Ordinary donations', 'Special Donations', 'Covid plasma donations'],
      datasets: [
        {
          label: 'Donations dataset',
          data: donations,
          backgroundColor: ["#28a745", "#ffc107", "#007bff"],
          hoverBackgroundColor: new Array(3).fill('#dc3545')
        }
      ]
    },
      this.donorChartDonationsOptions = {
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

  public initializeDonorTransfusionChart(transfusions: number[]) {
    this.donorChartTransfusionsData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
      datasets: [
        {
          label: 'Number of transfusions',
          data: transfusions,
          backgroundColor: ["#28a745", "#ffc107", "#007bff", "#28a745", "#ffc107", "#007bff", "#28a745", "#ffc107", "#007bff", "#28a745", "#ffc107", "#007bff"],
          hoverBackgroundColor: new Array(12).fill('#dc3545')

        }
      ]
    }

    this.donorChartTrnafusionsOptions = {
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


  /*
  Charts used for admin statistics
  */
  public initializeAdminChartDonationTypes() {
    this.adminChartDonationTypesData = {
      labels: ['Ordinary donations', 'Special Donations', 'Covid plasma donations'],
      datasets: [
        {
          label: 'Donations dataset',
          data: [1, 2, 3],
          backgroundColor: ["#28a745", "#ffc107", "#007bff"],
          hoverBackgroundColor: new Array(3).fill('#dc3545')
        }
      ]
    }

    this.adminChartDonationTypesOptions = {
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

  public initializeAdminChartUsers() {
    this.adminChartUsersData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
      datasets: [
        {
          label: 'Donors',
          data: [1, 0, 1, 4, 0, 2, 1, 2, 4, 5, 6, 2],
          backgroundColor: new Array(12).fill("#28a745"),
          hoverBackgroundColor: new Array(12).fill('#dc3545')
        },
        {
          label: 'Hospitals',
          data: [4, 5, 1, 3, 0, 5, 7, 8, 3, 5, 2, 1],
          backgroundColor: new Array(12).fill("#ffc107"),
          hoverBackgroundColor: new Array(12).fill('#dc3545')
        },
        {
          label: 'Centers',
          data: [6, 4, 2, 3, 5, 6, 7, 4, 2, 4, 5, 1],
          backgroundColor: new Array(12).fill("#007bff"),
          hoverBackgroundColor: new Array(12).fill('#dc3545')
        }
      ],

    }

    this.adminChartUsersOptions = {
      title: {
        display: true,
        text: 'Registered users in the last year',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  public initializeAdminChartOperations() {
    this.adminChartEvolutionData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
      datasets: [
        {
          label: 'Transfusions',
          data: [1, 0, 1, 4, 0, 2, 1, 2, 4, 5, 6, 2],
          fill: false,
          borderColor: "#28a745"
        },
        {
          label: 'Donations',
          data: [4, 5, 1, 3, 0, 5, 7, 8, 3, 5, 2, 1],
          fill: false,
          borderColor: "#ffc107"
        },
      ],

    }

    this.adminChartEvolutionOptions = {
      title: {
        display: true,
        text: 'Donations and transfusions evolution in the last year',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

}
