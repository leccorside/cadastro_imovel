import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Novocliente6Page } from '../novocliente6/novocliente6';

@IonicPage()
@Component({
  selector: 'page-novocliente5',
  templateUrl: 'novocliente5.html',
})
export class Novocliente5Page {

  tipo_imovel_cliente: string = '';
  matricula_imovel_cliente: string = '';
  doc_imovel_cliente: string = '';
  doc_imovel_outro_cliente: string = '';
  area_contru_imovel_cliente: string = '';
  contru_regular_cliente: string = '';
  imovel_e_cliente: string = '';
  valor_atribu_imovel_cliente: string = '';

  public email_cliente:any = [];
  public estado_civil_cliente:any = [];

  tipos: any = [];

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
    console.log('ionViewDidLoad Novocliente5Page');
    this.tipos = [];
    this.loadTipos();
  }

  loadTipos(){
    let body = {
      aksi: 'tipoimovel',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let tipo of data.result){
        this.tipos.push(tipo);
      }
    });
  }

  passo5(){
    //this.mySlider.lockSwipes(false);

    if(this.tipo_imovel_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione o tipo do imóvel',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.matricula_imovel_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Insira a matrícula do imóvel.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.doc_imovel_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione o documento do imóvel.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.area_contru_imovel_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Insira o valor da área contruída.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.contru_regular_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione se o imóvel é regularizado ou não.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.imovel_e_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione se o imóvel é quitado ou financiado.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.valor_atribu_imovel_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Insira o valor atribuido ao imóvel.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

    else{

      let body = {
        email_cliente: this.email_cliente,
        tipo_imovel_cliente: this.tipo_imovel_cliente,
        matricula_imovel_cliente: this.matricula_imovel_cliente,
        doc_imovel_cliente: this.doc_imovel_cliente,
        doc_imovel_outro_cliente: this.doc_imovel_outro_cliente,
        area_contru_imovel_cliente: this.area_contru_imovel_cliente,
        contru_regular_cliente: this.contru_regular_cliente,
        imovel_e_cliente: this.imovel_e_cliente,
        valor_atribu_imovel_cliente: this.valor_atribu_imovel_cliente,
        aksi: 'cadastrar_cliente5'
      };

      this.apiProvider.postData(body, 'api.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

          //this.mySlider.slideNext();
          this.navCtrl.setRoot(Novocliente6Page, {
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
