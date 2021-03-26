import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NbaApiService } from '../services/nba-api.services';
import { ShotChartComponent } from '../components/shot-chart/shot-chart.component';
import { ChartSettingsComponent } from '../components/chart-settings/chart-settings.component';
import { SecondaryService } from '../services/secondary.service';
import { HelpPageComponent } from '../components/help-page/help-page.component';
import { RecentSearchComponent } from '../components/recent-search/recent-search.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ShotChartComponent, ChartSettingsComponent, HelpPageComponent,
    RecentSearchComponent],
  providers: [NbaApiService, SecondaryService]
})
export class HomePageModule { }
