import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuario } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'https://identitytoolkit.googleapis.com/v1/';
  apiKey = 'AIzaSyA_Dz_qmK3LS6Y4IrCQfivQJMQ2jJVZ_oc';

  token: {} = null;

  private itemsCollection: AngularFirestoreCollection<Usuario>;

  constructor(private afs: AngularFirestore,
              private http: HttpClient,
              private storage: Storage,
              private nav: NavController,
              public afAuth: AngularFireAuth) { }

  getUsuario() {
    this.itemsCollection = this.afs.collection<Usuario>('usuario');
    return this.itemsCollection.valueChanges();
  }

  postUsuario( usuario: Usuario) {

    return new Promise( resolve => {
      this.postResgistroAuth(usuario)
        .subscribe( res => {
          console.log( res );
          usuario.uid = res['localId'];
          this.itemsCollection.add(usuario);
          this.guardarToken( res['idToken'], res['localId'] );
          resolve( true );
      }, (err) => {
        console.log(err.error.error.message);
        this.token = null;
        resolve( false );
      });

    });

  }

  postResgistroAuth(usuario: Usuario) {
   return this.http.post(`${this.url}accounts:signUp?key=${this.apiKey}`, usuario);
  }

  postLoginAuth( usuario: Usuario){
    return new Promise ( resolve => {

      this.http.post(`${this.url}accounts:signInWithPassword?key=${this.apiKey}`, usuario)
              .subscribe( res => {
                this.guardarToken( res['idToken'], res['localId'] );
                resolve( true );
              }, (err) => {
                console.log(err.error.error.message);
                this.token = null;
                resolve( false );
              });

    });

  }

  login() {
    return new Promise ( resolve => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( res => {
        const idToken =  res.credential['idToken'];
        const uid = res.user.uid;
        this.guardarToken(idToken, uid);
        resolve( true );
      }).catch( err => {
        resolve( false );
      });

    });
  }
  logout() {
    // retornamos una promesa
    return new Promise( resolve => {
      this.afAuth.auth.signOut()
      .then( res => {
        this.eliminarToken();
        resolve(true);
      })
      .catch( err => {
        console.log( err );
        resolve(false);
      });

    });
  }

  async guardarToken( idToken: any, uid: any ){
    const user = {
      idToken,
      uid
    };
    this.token = uid;
    // return localStorage.setItem('sesion', JSON.stringify( user ));
    return await this.storage.set('sesion', JSON.stringify(user));
  }

  async cargarToken(){
    this.token = await this.storage.get('sesion') || null;
  }

  async eliminarToken(){
    await this.storage.remove('sesion');
    // this.storage.clear();
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.token){
      this.nav.navigateRoot('/login');
      return Promise.resolve( false);
    } else {
      return Promise.resolve( true );
    }

  }

}

