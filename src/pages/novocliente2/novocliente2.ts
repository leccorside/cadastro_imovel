import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Novocliente3Page } from '../novocliente3/novocliente3';

@IonicPage()
@Component({
  selector: 'page-novocliente2',
  templateUrl: 'novocliente2.html',
})
export class Novocliente2Page {

  nome_cliente: string = '';
  nacionalidade_cliente: string = '';
  cpf_cliente: string = '';
  rg_cliente: string = '';
  orgao_emissor_cliente: string = '';
  nascimento_cliente: any;
  profissao_cliente: string = '';
  escolaridade_cliente: string = '';
  estado_civil_cliente: string = '';
  nome_conjuge_cliente: string = '';
  cpf_conju_cliente: string = '';
  rg_conju_cliente: string = '';
  nasci_conju_cliente: any;
  profi_conju_cliente: string = '';
  escol_conju_cliente: string = '';
  contato_conju_cliente: string = '';

  datapadra: Date = new Date();

  public email_cliente:any = [];

  escolaridades: any = [];
  escolaridades2: any = [];
  civis: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private apiProvider: ApiProvider
    ) {

      var date_to_parse = new Date();
      var year = date_to_parse.getFullYear().toString();
      var month = (date_to_parse.getMonth() + 1).toString();
      var day = date_to_parse.getDate().toString();

      this.nascimento_cliente = day + '/' + month + '/' + year;

      this.nasci_conju_cliente = day + '/' + month + '/' + year;

      this.parseDate();
      this.parseDate2();

      //let post = navParams.get('post');
      this.email_cliente = navParams.get('email_cliente');

      console.log(this.email_cliente);

  }

  parseDate(){
    var firstStape, secondStape;
    if (this.nascimento_cliente.substring(5,6) === "0"){
        firstStape = this.nascimento_cliente.substring(0,5);
        if (this.nascimento_cliente.substring(8,9) === "0"){
            firstStape = firstStape + this.nascimento_cliente.substring(6,8);
            secondStape = this.nascimento_cliente.substring(9);
        }
        else{
            secondStape = this.nascimento_cliente.substring(6);
        }
        this.nascimento_cliente = firstStape + secondStape;
    }

    this.nascimento_cliente = this.nascimento_cliente.replace('-','/');
  }

  parseDate2(){
    var firstStape, secondStape;
    if (this.nasci_conju_cliente.substring(5,6) === "0"){
        firstStape = this.nasci_conju_cliente.substring(0,5);
        if (this.nasci_conju_cliente.substring(8,9) === "0"){
            firstStape = firstStape + this.nasci_conju_cliente.substring(6,8);
            secondStape = this.nasci_conju_cliente.substring(9);
        }
        else{
            secondStape = this.nasci_conju_cliente.substring(6);
        }
        this.nasci_conju_cliente = firstStape + secondStape;
    }

    this.nasci_conju_cliente = this.nasci_conju_cliente.replace('-','/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Novocliente2Page');
    this.escolaridades = [];
    this.escolaridades2 = [];
    this.civis = [];
    this.loadEscolaridade();
    this.loadEscolaridade2();
    this.loadEstadoCivil();
  }

  loadEscolaridade(){

    let body = {
      aksi: 'escolaridades',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let escolaridade of data.result){
        this.escolaridades.push(escolaridade);
      }
    });
  }

  loadEscolaridade2(){

    let body = {
      aksi: 'escolaridades',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let escolaridade of data.result){
        this.escolaridades.push(escolaridade);
      }
    });
  }

  loadEstadoCivil(){

    let body = {
      aksi: 'estadocivil',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let civil of data.result){
        this.civis.push(civil);
      }
    });
  }

  passo2(){

    if(this.nacionalidade_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha a nacionalidade.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.cpf_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o CPF',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.rg_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o RG',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.orgao_emissor_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha orgão emissor.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.nascimento_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione a data de nascimento',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.profissao_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha a profissão.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.escolaridade_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha a escolaridade.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.estado_civil_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o estado civil.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.estado_civil_cliente == "Casado" && this.nome_conjuge_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o nome do conjuge.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.estado_civil_cliente == "Casado" && this.cpf_conju_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o CPF do conjuge.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.estado_civil_cliente == "Casado" && this.rg_conju_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o RG do conjuge.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.estado_civil_cliente == "Casado" && this.nasci_conju_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione a data de nascimento do conjuge.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.estado_civil_cliente == "Casado" && this.profi_conju_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha a profissão do conjuge.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.estado_civil_cliente == "Casado" && this.escol_conju_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha a escolaridade do conjuge.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.estado_civil_cliente == "Casado" && this.contato_conju_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o contato do conjuge.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

    else{

      let body = {
        email_cliente: this.email_cliente,
        //nome_cliente: this.nome_cliente,
        nacionalidade_cliente: this.nacionalidade_cliente,
        cpf_cliente: this.cpf_cliente,
        rg_cliente: this.rg_cliente,
        orgao_emissor_cliente: this.orgao_emissor_cliente,
        nascimento_cliente: this.nascimento_cliente,
        profissao_cliente: this.profissao_cliente,
        escolaridade_cliente: this.escolaridade_cliente,
        estado_civil_cliente: this.estado_civil_cliente,
        nome_conjuge_cliente: this.nome_conjuge_cliente,
        cpf_conju_cliente: this.cpf_conju_cliente,
        rg_conju_cliente: this.rg_conju_cliente,
        nasci_conju_cliente: this.nasci_conju_cliente,
        profi_conju_cliente: this.profi_conju_cliente,
        escol_conju_cliente: this.escol_conju_cliente,
        contato_conju_cliente: this.contato_conju_cliente,
        aksi: 'cadastrar_cliente2'
      };

      this.apiProvider.postData(body, 'api.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

          //this.mySlider.slideNext();
          this.navCtrl.setRoot(Novocliente3Page, {
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
