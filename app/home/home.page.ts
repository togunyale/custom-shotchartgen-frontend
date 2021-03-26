import { Component, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { NbaApiService } from '../services/nba-api.services';
import { SecondaryService } from '../services/secondary.service';
import { LEAGUE } from '../shared/interface';
import { TeamDetails } from '../shared/team-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('leagueSearch') searchbar: IonSearchbar;
  selectedTeam: string;
  teamExist: boolean = false;
  ignoreNextChange: boolean = false;
  teams: string[] = [];
  teamLogo: string = '/assets/images/NBA.svg';
  selectedTeamDetails: TeamDetails;

  constructor(private apiService: NbaApiService, private secondaryService: SecondaryService) { }
  initializeTeams() {
    this.teams = Object.values(LEAGUE);
  }

  getTeams(ev: any) {
    // Reset items back to all of the items
    this.initializeTeams();
    // this.hasTeamReset = true;
    const val = ev.target.value;
    if (this.ignoreNextChange) {
      this.ignoreNextChange = false;
      this.teamExist = false;
      return;
    }
    if (val && val.trim() !== '') {
      this.teamExist = true;
      this.teams = this.teams.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.teamExist = false;
    }

  }

  selectTeam(team: string) {
    if (team) {
      this.selectedTeam = "";
      this.teams = [];
      this.teamExist = false;
      this.ignoreNextChange = true;
      this.secondaryService.presentLoading("Loading Team Data");
      this.apiService.notifyResetOfChartSettings();
      this.apiService.getTeamDetails(team).subscribe(res => {
        this.selectedTeamDetails = new TeamDetails(res);
        this.selectedTeam = team;
        this.teamLogo = this.getTeamLogo();
        this.secondaryService.dismissLoadingNotice();
      });
    }
  }
  onCancel($event) {
    this.ignoreNextChange = false;
    this.teamExist = true;
  }


  getSearchBarInput(value) {
    if (this.teamExist) {
      this.teamExist = false;
      this.searchbar.value = this.teams[0];
      this.selectTeam(this.teams[0]);
    }
    else {
      this.searchbar.value = '';
    }
  }

  getTeamLogo(): string {
    const league = Object.keys(LEAGUE).filter(team => LEAGUE[team] == this.selectedTeam);
    return league.length > 0 ? `/assets/images/${league[0]}.svg` : '/assets/images/NBA.svg';

  }

  presentHelpModal() {
    this.secondaryService.presentHelpModal();
  }
}
