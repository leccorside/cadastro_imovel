import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { Novocliente2Page } from '../novocliente2/novocliente2';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-novocliente',
  templateUrl: 'novocliente.html',
})
export class NovoclientePage {

  @ViewChild('mySlider') mySlider: any;

  revista_cliente: string = '';
  nome_cliente: string = '';
  data_cliente: any;
  hora_cliente: any;
  nucleo_urbano_informal: string = '';
  quadra_cliente: string = '';
  lote_cliente: string = '';
  endereco_cliente: string = '';
  inscricao_imobiliaria: string = '';
  unidade_contruida1: string = '';
  unidade_contruida2: string = '';
  unidade_contruida3: string = '';
  unidade_contruida4: string = '';
  unidade_contruida5: string = '';
  unidade_contruida6: string = '';
  unidade_contruida7: string = '';
  unidade_contruida8: string = '';
  unidade_contruida9: string = '';
  unidade_contruida10: string = '';
  endereco_cliente2: string = '';
  email_cliente: string = '';
  telefone_cliente: string = '';
  observacoes_cliente: string = '';
  status_lote_cliente: string = '';

  anggota: any;
  members: any = [];

  datapadra: Date = new Date();

  escolaridades: any = [];
  civis: any = [];
  nucleos: any = [];
  status: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    private storage: Storage
    ) {

      var date_to_parse = new Date();
      var year = date_to_parse.getFullYear().toString();
      var month = (date_to_parse.getMonth() + 1).toString();
      var day = date_to_parse.getDate().toString();

      this.data_cliente = day + '/' + month + '/' + year;

      this.parseDate();

  }

  parseDate(){
    var firstStape, secondStape;
    if (this.data_cliente.substring(5,6) === "0"){
        firstStape = this.data_cliente.substring(0,5);
        if (this.data_cliente.substring(8,9) === "0"){
            firstStape = firstStape + this.data_cliente.substring(6,8);
            secondStape = this.data_cliente.substring(9);
        }
        else{
            secondStape = this.data_cliente.substring(6);
        }
        this.data_cliente = firstStape + secondStape;
    }

    this.data_cliente = this.data_cliente.replace('-','/');
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
       this.anggota = res;

       if(this.anggota){
        this.load();
      }

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoclientePage');
    this.escolaridades = [];
    this.civis = [];
    this.nucleos = [];
    this.status = [];
    this.loadEscolaridade();
    this.loadEstadoCivil();
    this.loadNucleo();
    this.loadStatus();
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

  loadNucleo(){

    let body = {
      aksi: 'nucleourbano',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let nucleo of data.result){
        this.nucleos.push(nucleo);
      }
    });
  }

  loadStatus(){

    let body = {
      aksi: 'statuslote',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let statu of data.result){
        this.status.push(statu);
      }
    });
  }

  anterior(){
    this.mySlider.slidePrev();
  }

  passo1(){
    //this.mySlider.lockSwipes(false);

    if(this.nome_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Digite o nome do cliente',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.data_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione a data da visita',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.hora_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Selecione a hora da visita.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.nucleo_urbano_informal == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o cúcleo urbano.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.quadra_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha a quadra do endereço.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.lote_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o lote do endereço.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else if(this.endereco_cliente == ""){
      let toast = this.toastCtrl.create({
        message: 'Preencha o endereço.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

    else{

      let body = {
        entrevistador_cliente: this.anggota.nome_usuario,
        //revista_cliente: this.revista_cliente,
        data_cliente: this.data_cliente,
        nome_cliente: this.nome_cliente,
        hora_cliente: this.hora_cliente,
        nucleo_urbano_informal: this.nucleo_urbano_informal,
        quadra_cliente: this.quadra_cliente,
        lote_cliente: this.lote_cliente,
        endereco_cliente: this.endereco_cliente,
        inscricao_imobiliaria: this.inscricao_imobiliaria,
        unidade_contruida1: this.unidade_contruida1,
        unidade_contruida2: this.unidade_contruida2,
        unidade_contruida3: this.unidade_contruida3,
        unidade_contruida4: this.unidade_contruida4,
        unidade_contruida5: this.unidade_contruida5,
        unidade_contruida6: this.unidade_contruida6,
        unidade_contruida7: this.unidade_contruida7,
        unidade_contruida8: this.unidade_contruida8,
        unidade_contruida9: this.unidade_contruida9,
        unidade_contruida10: this.unidade_contruida10,
        endereco_cliente2: this.endereco_cliente2,
        email_cliente: this.email_cliente,
        telefone_cliente: this.telefone_cliente,
        observacoes_cliente: this.observacoes_cliente,
        status_lote_cliente: this.status_lote_cliente,
        aksi: 'cadastrar_cliente'
      };

      this.apiProvider.postData(body, 'api.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

          //this.mySlider.slideNext();
          this.navCtrl.setRoot(Novocliente2Page, {email_cliente:this.email_cliente});

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

  passo2(){
    this.navCtrl.push(AboutPage, {post:this.email_cliente});

  }

  passo4(){
    this.mySlider.slideNext();
  }

  passo5(){
    this.mySlider.slideNext();
  }


}
