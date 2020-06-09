import { Component } from '@angular/core';
import { GastoService } from '../../services/gasto.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  sliderOptions = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(public _sg: GastoService) {
    this._sg.getGastos();
  }


  action( id: string){
    this._sg.presentActionSheet( id );
  }

}
