import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AchievementsDto, AchievementsServiceProxy, LeagueDto, LeagueServiceProxy, UserDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent  extends AppComponentBase implements OnInit {

  achievements: AchievementsDto;
  leagues: LeagueDto[] = []
  topUsers: UserDto[] = [];

  constructor(
    injector: Injector,
    private _achievementsService: AchievementsServiceProxy,
    private _leagueService: LeagueServiceProxy) {
      super(injector);
     }

  ngOnInit(): void {
    this._achievementsService
        .getAchievements()
        .subscribe((result: AchievementsDto) => {
          this.achievements = result;
          this.topUsers = result.topUsers;
        });
    
    this._leagueService
        .getAll()
        .subscribe((result : LeagueDto[]) => {
          this.leagues = result;
        })
  }

  setSelectedLeague(leagueId){
    this._achievementsService
      .getTopByLeagueId(leagueId)
      .subscribe((result: UserDto[]) => {
        this.topUsers = result;
      })
   
  }

}
