import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { apis } from "../shared/interface";

@Injectable()
export class NbaApiService {
  @Output() requestSent = new EventEmitter<any>();
  @Output() resetSettings = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }

  notifyChartOfRequest(payload: any) {
    this.requestSent.emit(payload);
  }
  notifyResetOfChartSettings() {
    this.resetSettings.emit();
  }

  getTeamDetails(team_name: string): Observable<any> {
    return this.http.get(`${apis.API_GK_URL}/teamDetails`, {
      params: new HttpParams().set("team_name", team_name)
    });
  }

  getShotChartDetails(payload: any): Observable<any> {
    return this.http.get(`${apis.API_GK_URL}/team/shotChart`, {
      params: new HttpParams().set("subject", payload.subject)
        .set("qtr", payload.qtr).set("shotType", payload.shotType)
        .set("timeInterval", payload.timeInterval)
    });
  }
}
