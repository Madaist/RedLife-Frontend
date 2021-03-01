import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements OnInit {

  public scannerEnabled: boolean = true;
  public information: string = "No QR code detected. Zoom in a code in order to scan it.";

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Extracting the information... ";
    console.log($event);
    this.cd.markForCheck();

  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No QR code detected. Zoom in a code in order to scan it.";
  }

}
