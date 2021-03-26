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
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}