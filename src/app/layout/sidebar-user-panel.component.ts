import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  OnInit
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UserLoginInfoDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'sidebar-user-panel',
  templateUrl: './sidebar-user-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarUserPanelComponent extends AppComponentBase
  implements OnInit {
  shownLoginName = '';
  loggedUser: UserLoginInfoDto;
  isFemale: boolean = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.shownLoginName = this.appSession.getShownLoginName();
    this.loggedUser = this.appSession.user;
    var firstDigitOfId = this.loggedUser.id.toString().substring(0, 1);
    console.log(firstDigitOfId);
    if(this.isGranted("Donor") && (firstDigitOfId == "2" || firstDigitOfId == "6")){
      console.log("a intrat aici");
      this.isFemale = true;
    }
    console.log(this.isFemale);
  }
}
