import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AdminStatisticsDto, CenterStatisticsDto, DonorStatisticsDto, HospitalStatisticsDto, StatisticsServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase implements OnInit {
  donorStatistics: DonorStatisticsDto;
  adminStatistics: AdminStatisticsDto;
  hospitalStatistics: HospitalStatisticsDto;
  centerStatistics: CenterStatisticsDto;

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

  hospitalChartBloodTypesData: any;
  hospitalChartBloodTypesOptions: any;

  hospitalChartTransfusionsData: any;
  hospitalChartTransfusionsOptions: any;

  centerChartBloodTypesData: any;
  centerChartBloodTypesOptions: any;

  centerChartDonationsData: any;
  centerChartDonationsOptions: any;

  constructor(injector: Injector,
    private _statisticsService: StatisticsServiceProxy) {
    super(injector);
  }

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
      this._statisticsService
        .getAdminStatistics()
        .subscribe((result: AdminStatisticsDto) => {

          this.adminStatistics = result;
          console.log(this.adminStatistics);
          this.initializeAdminChartDonationTypes(this.adminStatistics.donationTypes);

          this.initializeAdminChartUsers(this.adminStatistics.registeredDonorsPerMonth,
            this.adminStatistics.registeredHospitalsPerMonth,
            this.adminStatistics.registeredCentersPerMonth);

          this.initializeAdminChartOperations(this.adminStatistics.transfusionsPerMonth,
            this.adminStatistics.donationsPerMonth);
        })
    }

    if (this.isGranted("HospitalAdmin") || this.isGranted("HospitalPersonnel")) {
      this._statisticsService
        .getHospitalStatistics()
        .subscribe((result: HospitalStatisticsDto) => {
          this.hospitalStatistics = result;

          this.initializeHospitalChartBloodTypes(this.hospitalStatistics.bloodTypesUsedCount);
          this.initializeHospitalChartTransfusions(this.hospitalStatistics.transfusionsPerMonth);
        })
    }

    if (this.isGranted("CenterAdmin") || this.isGranted("CenterPersonnel")) {
      this._statisticsService
        .getCenterStatistics()
        .subscribe((result: CenterStatisticsDto) => {
          this.centerStatistics = result;
          console.log(this.centerStatistics);

          this.initializeCenterChartBloodTypes(this.centerStatistics.bloodTypesUsedCount);
          this.initializeCenterChartDonations(this.centerStatistics.donationsPerMonth);
        })
     
    }
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
        text: 'Transfusions using your donated blood in ' + new Date().getFullYear(),
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
  public initializeAdminChartDonationTypes(donationTypes: number[]) {
    this.adminChartDonationTypesData = {
      labels: ['Ordinary donations', 'Special Donations', 'Covid plasma donations'],
      datasets: [
        {
          label: 'Donations dataset',
          data: donationTypes,
          backgroundColor: ["#28a745", "#ffc107", "#007bff"],
          hoverBackgroundColor: new Array(3).fill('#dc3545')
        }
      ]
    }

    this.adminChartDonationTypesOptions = {
      title: { display: true, text: 'Donation Types', fontSize: 16 },
      legend: { position: 'bottom' }
    };
  }

  public initializeAdminChartUsers(donorsPerMonth: number[], hospitalsPerMonth: number[], centersPerMonth: number[]) {
    this.adminChartUsersData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
      datasets: [
        {
          label: 'Donors',
          data: donorsPerMonth,
          backgroundColor: new Array(12).fill("#28a745"),
          hoverBackgroundColor: new Array(12).fill('#dc3545')
        },
        {
          label: 'Hospitals',
          data: hospitalsPerMonth,
          backgroundColor: new Array(12).fill("#ffc107"),
          hoverBackgroundColor: new Array(12).fill('#dc3545')
        },
        {
          label: 'Centers',
          data: centersPerMonth,
          backgroundColor: new Array(12).fill("#007bff"),
          hoverBackgroundColor: new Array(12).fill('#dc3545')
        }
      ],

    }

    this.adminChartUsersOptions = {
      title: {
        display: true,
        text: 'Registered users in ' + new Date().getFullYear(),
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  public initializeAdminChartOperations(transfusionsPerMonth: number[], donationsPerMonth: number[]) {
    this.adminChartEvolutionData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
      datasets: [
        {
          label: 'Transfusions',
          data: transfusionsPerMonth,
          fill: false,
          borderColor: "#28a745"
        },
        {
          label: 'Donations',
          data: donationsPerMonth,
          fill: false,
          borderColor: "#ffc107"
        },
      ],

    }

    this.adminChartEvolutionOptions = {
      title: {
        display: true,
        text: 'Donations and transfusions evolution in ' + new Date().getFullYear(),
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  /*
Charts used for hospital statistics
*/
  public initializeHospitalChartBloodTypes(bloodTypes: number[]) {
    this.hospitalChartBloodTypesData = {
      labels: ['A+', 'B+', 'C+', 'AB+', 'A-', 'B-', 'C-', 'AB-'],
      datasets: [
        {
          label: 'Blood types dataset',
          data: bloodTypes,
          backgroundColor: ["#28a745", "#ffc107", "#007bff", "#dc3545", "#28a745", "#fd7e14", "#6f42c1", "#6c757d"],
          //green, warning, primary, danger, success, orange, purple, gray
          hoverBackgroundColor: new Array(8).fill('#dc3545')
        }
      ]
    },
      this.hospitalChartBloodTypesOptions = {
        title: {
          display: true,
          text: 'Blood types needed in transfusions in ' + new Date().getFullYear(),
          fontSize: 16
        },
        legend: {
          position: 'bottom'
        }
      };
  }

  public initializeHospitalChartTransfusions(transfusionsPerMonth: number[]) {
    this.hospitalChartTransfusionsData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
      datasets: [
        {
          label: 'Transfusions',
          data: transfusionsPerMonth,
          fill: false,
          borderColor: "#28a745"
        },
      ],
    }

    this.hospitalChartTransfusionsOptions = {
      title: {
        display: true,
        text: 'Transfusions evolution in ' + new Date().getFullYear(),
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  /*
Charts used for center statistics
*/
  public initializeCenterChartBloodTypes(bloodTypes: number[]) {
    this.centerChartBloodTypesData = {
      labels: ['A+', 'B+', 'C+', 'AB+', 'A-', 'B-', 'C-', 'AB-'],
      datasets: [
        {
          label: 'Blood types dataset',
          data: bloodTypes,
          backgroundColor: ["#28a745", "#ffc107", "#007bff", "#dc3545", "#28a745", "#fd7e14", "#6f42c1", "#6c757d"],
          //green, warning, primary, danger, success, orange, purple, gray
          hoverBackgroundColor: new Array(8).fill('#dc3545')
        }
      ]
    },
      this.centerChartBloodTypesOptions = {
        title: {
          display: true,
          text: 'Blood types donated in ' + new Date().getFullYear(),
          fontSize: 16
        },
        legend: {
          position: 'bottom'
        }
      };
  }

  public initializeCenterChartDonations(donationsPerMonth: number[]) {
    this.centerChartDonationsData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
      datasets: [
        {
          label: 'Donations',
          data: donationsPerMonth,
          fill: false,
          borderColor: "#28a745"
        },
      ],
    }

    this.centerChartDonationsOptions = {
      title: {
        display: true,
        text: 'Donations evolution in ' + new Date().getFullYear(),
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

}
