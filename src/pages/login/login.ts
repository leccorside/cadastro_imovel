import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { EsquecisenhaPage } from '../esquecisenha/esquecisenha';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email_usuario: string = '';
  senha_usuario: string = '';

  anggota: any;
  members: any = [];

  tabBarElement: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController
    ) {
      //this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewWillEnter(){
    //this.tabBarElement.style.display = 'none';
    this.storage.get('session_storage').then((res)=>{
       this.anggota = res;

       if(this.anggota){
        this.load();
        this.navCtrl.setRoot(TabsPage);
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

  login(){

    if(this.email_usuario == ""){

      let toast = this.toastCtrl.create({
        message: 'Preencha o e-mail',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

    }

    else if(this.senha_usuario == ""){

      let toast = this.toastCtrl.create({
        message: 'Preencha a senha',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

    }

    else{

      const loader = this.loadingCtrl.create({
        content: "Aguarde...",
        duration: 3000
      });
      loader.present();

      let body = {
        email_usuario: this.email_usuario,
        senha_usuario: this.senha_usuario,
        aksi: 'login'
      };

      this.apiProvider.postData(body, 'api.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

          this.storage.set('session_storage', data.result);

          this.navCtrl.setRoot(TabsPage);

          let toast = this.toastCtrl.create({
            message: 'Seja bem-vindo!',
            duration: 2000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });

          toast.present();

        }else{

          let toast = this.toastCtrl.create({
            message: alertpesan,
            duration: 5000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });

          toast.present();

        }
      });
    }

  }

  esqueci(){
    this.navCtrl.push(EsquecisenhaPage, {});
  }

}
