import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Novocliente5Page } from '../novocliente5/novocliente5';
import { Novocliente6Page } from '../novocliente6/novocliente6';

@IonicPage()
@Component({
  selector: 'page-novocliente4',
  templateUrl: 'novocliente4.html',
})
export class Novocliente4Page {

  infra_agua_cesan_cliente: string = '';
  infra_energia_edp_cliente: string = '';
  infra_esgoto_cliente: string = '';
  infra_calcamento_cliente: string = '';
  imovel_regularizado_cliente: string = '';

  anggota: any;
  members: any = [];

  datapadra: Date = new Date();

  public email_cliente:any = [];
  public estado_civil_cliente:any = [];

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Novocliente4Page');
  }

  passo4(){

    if(this.infra_agua_cesan_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione a infraestrutura de água CESAN.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.infra_energia_edp_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione a infraestrutura de energia EDP.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.infra_esgoto_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione a infraestrutura de esgotamento sanitário.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.infra_calcamento_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione a infraestrutura de calçamento.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.imovel_regularizado_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione se o imóvel é regularizado ou não.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else{

      let body = {
        email_cliente: this.email_cliente,
        infra_agua_cesan_cliente: this.infra_agua_cesan_cliente,
        infra_energia_edp_cliente: this.infra_energia_edp_cliente,
        infra_esgoto_cliente: this.infra_esgoto_cliente,
        infra_calcamento_cliente: this.infra_calcamento_cliente,
        imovel_regularizado_cliente: this.imovel_regularizado_cliente,
        aksi: 'cadastrar_cliente4'
      };

      this.apiProvider.postData(body, 'api.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

          if(this.imovel_regularizado_cliente == "Sim"){
            this.navCtrl.setRoot(Novocliente5Page, {
              email_cliente:this.email_cliente,
              estado_civil_cliente:this.estado_civil_cliente
            });
          }
          else{
            this.navCtrl.setRoot(Novocliente6Page, {
              email_cliente:this.email_cliente,
              estado_civil_cliente:this.estado_civil_cliente
            });
          }

          //this.mySlider.slideNext();


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
