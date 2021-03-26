import { Injectable } from "@angular/core";
import { LoadingController, ModalController, ToastController } from "@ionic/angular";
import { HelpPageComponent } from "../components/help-page/help-page.component";
// import { HelpPageComponent } from "../components/help-page/help-page.component";

@Injectable()
export class SecondaryService {
    constructor(private loadingController: LoadingController, private toastController: ToastController, private modalController: ModalController) { }

    async presentLoading(msg: string) {
        const loading = await this.loadingController.create({
            message: `${msg} ...`,
            translucent: true,
        });
        return await loading.present();
    }

    dismissLoadingNotice() {
        this.loadingController.dismiss();
    }

    async presentErrorToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: 'danger',
            position: 'top',
            cssClass: "error-msg",
            header: "Query Submission Error:"
        });
        toast.present();
    }

    async presentHelpModal() {
        const modal = await this.modalController.create({
            component: HelpPageComponent
        });
        return await modal.present();
    }

}