import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
    selector: 'recent-search',
    templateUrl: 'recent-search.component.html',
    styleUrls: ['recent-search.component.scss'],
})
export class RecentSearchComponent {

    constructor(private modalController: ModalController) { }
    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}