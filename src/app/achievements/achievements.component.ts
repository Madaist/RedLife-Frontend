import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AchievementsDto, AchievementsServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent  extends AppComponentBase implements OnInit {

  achievements: AchievementsDto;
  
  constructor(
    injector: Injector,
    private _achievementsService: AchievementsServiceProxy) {
      super(injector);
     }

  ngOnInit(): void {
    this._achievementsService
        .getAchievements()
        .subscribe((result: AchievementsDto) => {
          this.achievements = result;
        });
  }

}
