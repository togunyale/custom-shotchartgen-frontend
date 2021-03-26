import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
    selector: 'help-page',
    templateUrl: 'help-page.component.html',
    styleUrls: ['help-page.component.scss'],
})
export class HelpPageComponent {
    constructor(private modalController: ModalController) { }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}