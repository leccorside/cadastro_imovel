import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Novocliente4Page } from '../novocliente4/novocliente4';

@IonicPage()
@Component({
  selector: 'page-novocliente3',
  templateUrl: 'novocliente3.html',
})
export class Novocliente3Page {

  renda_cliente: string = '';
  renda_conj_cliente: string = '';
  renda_outros_cliente: string = '';
  prog_social_cliente: any;
  receb_valor_prog_social_cliente: any;
  valor_prog_social_cliente: string = '';

  anggota: any;
  members: any = [];

  datapadra: Date = new Date();

  public email_cliente:any = [];
  public estado_civil_cliente:any = [];



  //receb_valor_prog_social_cliente = 'Não';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private apiProvider: ApiProvider
    ) {

      this.email_cliente = navParams.get('email_cliente');
      this.estado_civil_cliente = navParams.get('estado_civil_cliente');

      console.log(this.email_cliente);
      console.log(this.estado_civil_cliente);

      this.prog_social_cliente = 'Não';
      this.receb_valor_prog_social_cliente = 'Não';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Novocliente3Page');
  }

  passo3(){
    //this.mySlider.lockSwipes(false);

    if(this.renda_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha a renda.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.prog_social_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione se participa de algum programa social.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.receb_valor_prog_social_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione se recebe valores de programas sociais.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

    else{

      let body = {
        email_cliente: this.email_cliente,
        renda_cliente: this.renda_cliente,
        renda_conj_cliente: this.renda_conj_cliente,
        renda_outros_cliente: this.renda_outros_cliente,
        prog_social_cliente: this.prog_social_cliente,
        receb_valor_prog_social_cliente: this.receb_valor_prog_social_cliente,
        valor_prog_social_cliente: this.valor_prog_social_cliente,
        aksi: 'cadastrar_cliente3'
      };

      this.apiProvider.postData(body, 'api.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

          //this.mySlider.slideNext();
          this.navCtrl.setRoot(Novocliente4Page, {
            email_cliente:this.email_cliente,
            estado_civil_cliente:this.estado_civil_cliente
          });

        }else{
          const toast = this.toastCtrl.create({
            message: alertpesan,
            duration: 5000
          });
          toast.present();
        }
      });

    }
  }

}
