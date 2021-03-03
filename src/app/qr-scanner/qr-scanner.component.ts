import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})

export class QrScannerComponent implements OnInit {
  public scannerEnabled: boolean = true;
  public scanningStatus: string = "No QR code detected. Zoom in a code in order to scan it.";
  public scanningTitle: string = "Zoom in the QR code";
  
  public static qrCode: string;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }
  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.scanningTitle = "";
    this.scanningStatus = "QR Code successfully scanned.";
    QrScannerComponent.qrCode = $event;
    this.cd.markForCheck();
  }

  public getQRCode() : string{
    return QrScannerComponent.qrCode;
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.scanningTitle = "Zoom in the QR code";
    this.scanningStatus = "No QR code detected. Zoom in a code in order to scan it.";
  }
}
