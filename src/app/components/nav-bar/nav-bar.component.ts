import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  @Input() title: string;

  constructor(private usuarioService: UsuarioService,
              private nav: NavController) { }

  ngOnInit() {}

  async salir(){
    const valido = await this.usuarioService.logout();

    if ( valido ){
      this.nav.navigateRoot('/login');

    } else {
      console.log( 'error al salir de la app');
    }
  }

}
