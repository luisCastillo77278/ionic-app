import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';

import { map } from 'rxjs/operators';
import { Gastos } from '../interfaces/interfaces';
import { ActionSheetController, NavController } from '@ionic/angular';
import { AlertasService } from './alertas.service';


@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private itemsCollection: AngularFirestoreCollection<Gastos>;
  gastos: Gastos[] = [];
  usuario: any = {};

  constructor(private afs: AngularFirestore,
              private actionSheetCtrl: ActionSheetController,
              private navCtrl: NavController,
              private storage: Storage,
              private alerta: AlertasService) {

              }


  async cargarToken() {
    const data = await this.storage.get('sesion');
    this.usuario = JSON.parse(data) || {};
  }

  async getGastos() {

    await this.cargarToken();

    this.itemsCollection = await this.afs.collection<Gastos>('gastos', ref => ref.orderBy('hora', 'asc')
    .where('uid', '==', this.usuario.uid || '')
    .limit(10));
    return this.itemsCollection.snapshotChanges()
                                .pipe(
                                  map(
                                    gastos => {
                                      this.gastos = [];
                                      return gastos.map(
                                        a => {
                                          const data = a.payload.doc.data();
                                          const id = a.payload.doc.id;

                                          this.gastos.unshift( {id, ...data});

                                        },
                                        console.log(this.gastos)
                                      );

                                    }
                                  )
                                ).subscribe();

  }

  postGasto( gasto: Gastos ) {
    gasto.uid = this.usuario.uid;
    console.log(gasto);
    return this.itemsCollection.add( gasto );

  }

  deleteGasto( id: string){
    this.afs.collection('gastos').doc(`${id}`).delete().
    then( resultado => console.log('eliminado'))
    .catch( err => console.log('error en la eliminacion'));
  }

  // mensajes y alertas
  async presentActionSheet(id: string ) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteGasto( id);
          this.alerta.mensaje(' Se elimino el gasto');
        }
      }, {
        text: 'Modificar',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
