import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { AlertasService } from '../../services/alertas.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  slidesOption = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  usuario: Usuario = {
    email: '',
    password: ''
  };

  constructor(private usuarioService: UsuarioService,
              private nav: NavController,
              private alerta: AlertasService) { }

  ngOnInit() {
  }

  async iniciarSesionGoogle(){
   const valido = await this.usuarioService.login();

   if ( valido ) {
     console.log('todo bien login google en casa');
     this.nav.navigateRoot('/main/tabs/tab1');
   } else {
     this.alerta.alerta('Error no se pudo conectar con Google');
     console.log('nada bien en casa login google');
   }

  }

  async iniciarSesion(){
    const valido = await this.usuarioService.postLoginAuth(this.usuario);

    if ( valido ){
      console.log(' todo bien en casa');
      this.nav.navigateRoot('/main/tabs/tab1');
    } else {
      this.alerta.alerta('Error usuario/contraseña no validos');
      console.log( 'nada bien en casa' );
    }

  }

}
