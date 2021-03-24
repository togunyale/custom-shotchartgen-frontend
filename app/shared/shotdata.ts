export class ShotChartDetails {
    singleShotList: SingleShotInfo[] = [];
    leagueAvgList: ShotZoneStats[] = [];
    subjectAvgList: ShotZoneStats[] = [];
    constructor(obj?) {
        if (obj && obj.shot_data) {
            obj.shot_data.forEach(shotInfo => {
                this.singleShotList.push(new SingleShotInfo(shotInfo));
            });
        }

        if (obj && obj.league_avg) {
            obj.league_avg.forEach(stat => {
                this.leagueAvgList.push(new ShotZoneStats(stat));
            });
        }

        if (obj && obj.subject_avg) {
            obj.subject_avg.forEach(stat => {
                this.subjectAvgList.push(new ShotZoneStats(stat));
            });
        }
    }
}

export class ShotZoneStats {
    shotZone: string;
    shotZoneAvg: string;

    constructor(obj?) {
        this.shotZone = obj && obj.SHOT_ZONE_BASIC;
        this.shotZoneAvg = obj && obj.LEAGUE_AVG || obj.PLAYER_AVG;
    }
}



export class ShotCords {
    x: number;
    y: number;
    distance: string;
    action: string;
    playerName: string


    constructor(obj?) {
        this.x = obj && obj.loc_X;
        this.y = obj && obj.loc_Y;
        this.distance = obj && obj.shot_distance;
        this.action = obj && obj.action_type;
        this.playerName = obj && obj.playerName;
    }
}



export class SingleShotInfo {
    playerId: number;
    playerName: string;
    period: number;
    loc_X: number;
    loc_Y: number;
    shotAttemptedFlag: number;
    shotMadeFlag: number;
    shot_distance: number;
    action_type: string;
    constructor(obj?) {
        this.playerId = obj && obj.PLAYER_ID;
        this.playerName = obj && obj.PLAYER_NAME;
        this.period = obj && obj.PERIOD;
        this.loc_X = obj && obj.LOC_X;
        this.loc_Y = obj && obj.LOC_Y;
        this.shotAttemptedFlag = obj && obj.SHOT_ATTEMPTED_FLAG
        this.shotMadeFlag = obj && obj.SHOT_MADE_FLAG
        this.shot_distance = obj && obj.SHOT_DISTANCE;
        this.action_type = obj && obj.ACTION_TYPE;
    }
}

