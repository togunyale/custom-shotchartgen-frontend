import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AlertController, IonSlides, LoadingController, ToastController } from "@ionic/angular";
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as Chart from "chart.js";
import { NbaApiService } from "src/app/services/nba-api.services";
import { ShotChartDetails, ShotCords } from "src/app/shared/shotdata";
import { TeamDetails } from "src/app/shared/team-data";
import { Shot_Zones, teamColorSchemes } from "src/app/shared/interface";
import { scales } from "src/app/shared/chart-config";

@Component({
    selector: 'shot-chart',
    templateUrl: 'shot-chart.component.html',
    styleUrls: ['shot-chart.component.scss'],
})
export class ShotChartComponent implements OnInit {
    @Input() selectedTeam: string;
    @ViewChild('statSlider') slides: IonSlides;
    selectedTeamShotChartDetails: ShotChartDetails;
    timeInterval: any = {
        upper: 12,
        lower: 0
    }
    missedShotCords: ShotCords[] = [];
    missedShotDetails: string[] = [];
    madeShotCords: ShotCords[] = [];
    madeShotDetails: string[] = [];
    chart: any;
    ctx: string = 'shotChart';


    constructor(private apiService: NbaApiService, private loadingController: LoadingController) {
        let namedChartAnnotation = ChartAnnotation;
        namedChartAnnotation["id"] = "annotation";
        Chart.pluginService.register(namedChartAnnotation);
    }
    ngOnInit(): void {
        this.apiService.requestSent.subscribe(request => {
            this.presentLoading();
            this.apiService.getShotChartDetails(request).subscribe(data => {
                this.selectedTeamShotChartDetails = new ShotChartDetails(data);
                this.extractShotData();
                this.loadingController.dismiss();
            })
        })
        this.chart = new Chart(this.ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    data: [],
                    pointBackgroundColor: teamColorSchemes.get(this.selectedTeam).prim,
                    pointRadius: 39,
                    label: 'Made Field Goals',
                    backgroundColor: teamColorSchemes.get(this.selectedTeam).prim,
                    fill: true,
                },
                {
                    data: [],
                    pointBackgroundColor: teamColorSchemes.get(this.selectedTeam).sec,
                    backgroundColor: teamColorSchemes.get(this.selectedTeam).sec,
                    pointRadius: 39,
                    label: 'Missed Field Goals',
                    fill: true
                },
                {
                    data: [{ x: 0, y: 0 }],
                    pointRadius: 25,
                    pointHoverRadius: 25,
                    label: 'Basket',
                    pointBorderColor: '#D35400',
                    pointBackgroundColor: '#D7DBDD',
                    backgroundColor: '#D7DBDD',
                    borderColor: '#D35400',
                    hoverBorderWidth: 5,
                    borderWidth: 3

                },
                {
                    data: [{ x: 0, y: 0 }],
                    pointRadius: 1,
                    pointHoverRadius: 1,
                    label: 'Paint',
                    pointBorderColor: teamColorSchemes.get(this.selectedTeam).third,
                    pointBackgroundColor: teamColorSchemes.get(this.selectedTeam).third,
                    backgroundColor: teamColorSchemes.get(this.selectedTeam).third,
                    borderColor: teamColorSchemes.get(this.selectedTeam).third,
                    hoverBorderWidth: 0,
                    borderWidth: 0
                }],
                labels: [[], [], ['Basket']]
            },
            options: {
                tooltips: {
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.labels[tooltipItem.datasetIndex][tooltipItem.index].toString();
                        }
                    }

                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontSize: 18,
                        fontColor: 'black'
                    }

                }, scales: scales,
                annotation: {
                    drawTime: "beforeDatasetsDraw",
                    events: ['dblclick'],
                    annotations: [
                        {
                            id: 'paint',
                            type: 'box',
                            xScaleID: 'x-axis-1',
                            yScaleID: 'y-axis-1',
                            xMin: -79,
                            xMax: 79,
                            yMin: -4,
                            yMax: 138,
                            backgroundColor: teamColorSchemes.get(this.selectedTeam).third,
                            borderColor: 'black',
                            borderWidth: 1
                        }
                    ]
                }
            }
        })

    }

    extractShotData() {
        if (this.selectedTeamShotChartDetails) {
            this.resetData();
            this.selectedTeamShotChartDetails.singleShotList.forEach(shot => {
                shot.shotMadeFlag == 1 ? this.appendToMade(shot) : this.appendToMiss(shot);
            });
            this.addMadeShotsToGraph();
            this.addMissedShotsToGraph();
            this.chart.update();
        }
    }

    resetData() {
        this.madeShotCords = [];
        this.madeShotDetails = [];
        this.missedShotCords = [];
        this.missedShotDetails = [];
    }

    appendToMade(shot: any) {
        this.madeShotDetails.push(`${shot.playerName} : ${shot.action_type} from ${shot.shot_distance}ft`);
        this.madeShotCords.push(new ShotCords(shot));
    }
    appendToMiss(shot: any) {
        this.missedShotDetails.push(`${shot.playerName} : ${shot.action_type} from ${shot.shot_distance}ft`);
        this.missedShotCords.push(new ShotCords(shot));
    }

    addMadeShotsToGraph() {
        this.chart.data.datasets[0].data = this.madeShotCords
        this.chart.data.labels[0] = this.madeShotDetails;
        this.chart.data.datasets[0].pointRadius = 6;
        this.chart.data.datasets[0].borderColor = 'black';
    }
    addMissedShotsToGraph() {
        this.chart.data.datasets[1].data = this.missedShotCords
        this.chart.data.labels[1] = this.missedShotDetails;
        this.chart.data.datasets[1].pointRadius = 6;
        this.chart.data.datasets[1].borderColor = 'black';
    }
    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Creating Shot Chart ...',
            translucent: true,
        });
        return await loading.present();
    }

    nextStat() {
        !this.slides.isEnd()
            ? this.slides.slideNext() : this.slides.slideTo(0);
    }

    returnChartDetailsSting(stat: any, i) {
        return `${stat.shotZone}: Chart Subject(s) shooting ${stat.shotZoneAvg}% compared to League Average of ${this.getShotZoneLeagueAvg(stat.shotZone)}%`
    }

    getShotZoneLeagueAvg(shotZone) {
        let avg = "0";
        this.selectedTeamShotChartDetails.leagueAvgList.forEach(value => {
            if (value.shotZone == shotZone) {
                avg = value.shotZoneAvg;
            }
        })
        return avg;
    }
}