import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private toast: ToastController,
              private alert: AlertController) { }

  async mensaje( message: string ){
    const toast = await this.toast.create({
      message,
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

  async alerta ( message: string ){
    const alert = await this.alert.create({
      message,
      buttons: ['ok'],
      backdropDismiss: false
    });

    await alert.present();
  }

}
