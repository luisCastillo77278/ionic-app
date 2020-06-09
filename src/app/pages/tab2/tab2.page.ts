import { Component } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gastos } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private _sg: GastoService,
              private alerta: AlertasService) {}

  gasto: Gastos = {
    ondometro: '',
    precio_l: '',
    costo_t: '',
    total_c: '',
    hora: new Date().getTime()
  };

  agregarGasto( ){
    this._sg.postGasto(this.gasto).then( () => {
      this.alerta.mensaje( 'Se guardo el gasto' );
      this.gasto = {
        ondometro: '',
        precio_l: '',
        costo_t: '',
        total_c: '',
        hora: new Date().getTime()
      };
    });
  }

}
