import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NbaApiService } from '../services/nba-api.services';
import { ShotChartComponent } from '../components/shot-chart/shot-chart.component';
import { ChartSettingsComponent } from '../components/chart-settings/chart-settings.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ShotChartComponent, ChartSettingsComponent],
  providers: [NbaApiService]
})
export class HomePageModule { }
