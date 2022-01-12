import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  nome_usuario: string;
  email_usuario: string;
  telefone_usuario: string;
  senha_usuario: string;

  anggota: any;
  members: any = [];

  tabBarElement: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private storage: Storage,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
    ) {

      const loader = this.loadingCtrl.create({
        content: "Carregando...",
        duration: 2000
      });
      loader.present();

      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
       this.anggota = res;

       if(this.anggota){
        this.load();
      }

    });

  }

  load(){
    let body = {
      id_usuario: this.anggota.id_usuario,
      nome_usuario: this.anggota.nome_usuario,
      email_usuario: this.anggota.email_usuario,
      telefone_usuario: this.anggota.telefone_usuario,
      senha_usuario: this.anggota.senha_usuario,
      status_usuario: this.anggota.status_usuario,
      aksi: 'profile'
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data=>{
        this.members = data.profiles;
    });

  }

  sair(){
    this.storage.clear();
    this.storage.remove('id_usuario');
    this.storage.remove('nome_usuario');
    this.storage.remove('email_usuario');
    this.storage.remove('telefone_usuario');
    this.storage.remove('senha_usuario');
    this.storage.remove('status_loja');
    this.tabBarElement.style.display = 'none';
    this.navCtrl.setRoot(LoginPage);
  }

  deslogar(){

    let alert = this.alertCtrl.create({
      title: 'Deseja mesmo sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Sair',
          handler: data => {
            this.sair();
          }
        }
      ]
    });
    alert.present();
  }

  salvar(){

    console.log(this.anggota.id_usuario, this.nome_usuario, this.email_usuario, this.telefone_usuario, this.senha_usuario );

    const loader = this.loadingCtrl.create({
      content: "Salvando...",
      duration: 3000
    });
    loader.present();

    let body = {
      id_usuario: this.anggota.id_usuario,
      nome_usuario: this.nome_usuario,
      email_usuario: this.email_usuario,
      telefone_usuario: this.telefone_usuario,
      senha_usuario: this.senha_usuario,
      aksi: 'salvarpessoais'
    };

    this.apiProvider.postData(body, 'api.php').subscribe((data) => {
      var alertpesan = data.msg;
      if(data.success){
        this.navCtrl.setRoot(PerfilPage);
        const toast = this.toastCtrl.create({
          message: 'Dados salvos com sucesso!',
          duration: 4000
        });
        toast.present();
      }else{
        const toast = this.toastCtrl.create({
          message: alertpesan,
          duration: 4000
        });
        toast.present();
      }
    });

  }

}
