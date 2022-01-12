import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-esquecisenha',
  templateUrl: 'esquecisenha.html',
})
export class EsquecisenhaPage {

  email_usuario: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsquecisenhaPage');
  }

  recuperar(){

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

    }else{

      const loader = this.loadingCtrl.create({
        content: "Aguarde...",
        duration: 3000
      });
      loader.present();

      let body = {
        email_usuario: this.email_usuario,
        aksi: 'recupera_senha'
      };

      this.apiProvider.postData(body, 'api.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){
          this.navCtrl.setRoot(LoginPage);

          let toast = this.toastCtrl.create({
            message: 'Uma senha provisória foi enviada para seu e-mail.',
            duration: 5000,
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

}
