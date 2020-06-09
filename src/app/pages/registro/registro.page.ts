import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  slidesOption = {
    allowSlidePrev: false,
    allowSlideNext: false
  }

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    password: '',
    email: ''
  };
 
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuario()
    .subscribe();
  }

  async registrar(){
    const valido = await this.usuarioService.postUsuario( this.usuario );
    if ( valido ) {
      console.log( 'todo bien en el registro' );
    } else {
      console.log( 'nada bien en el registro' );
    }
  }

}
