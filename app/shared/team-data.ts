export class TeamDetails {
roster:Player[] = [];
constructor(obj?){
    if(obj)
    {
        obj.forEach((players:Player[]) => {
            this.roster.push(new Player(players));
        });
    }
}
}


export class Player{
    player:string;
    playerId:number;

    constructor(obj?){
        this.player = obj && obj.PLAYER_NAME;
        this.playerId = obj && obj.PLAYER_ID;
    }
}