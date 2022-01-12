import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EditarlocalizacaoPage } from '../editarlocalizacao/editarlocalizacao';

@IonicPage()
@Component({
  selector: 'page-editarcliente',
  templateUrl: 'editarcliente.html',
})
export class EditarclientePage {

  //DADOS PESSOAIS
  nome_cliente: string;
  email_cliente: string;
  telefone_cliente: string;
  cpf_cliente: string;
  rg_cliente: string;
  orgao_emissor_cliente: string;
  profissao_cliente: string;
  escolaridade_cliente: string;
  estado_civil_cliente: string;
  nacionalidade_cliente: string;
  renda_cliente: string;
  renda_conj_cliente: string;
  nascimento_cliente: string;

  //ENDEREÇO
  endereco_cliente: string;
  endereco_cliente2: string;
  quadra_cliente: string;
  lote_cliente: string;

  //CONJUGE
  nome_conjuge_cliente: string;
  cpf_conju_cliente: string;
  rg_conju_cliente: string;
  profi_conju_cliente: string;
  escol_conju_cliente: string;
  nasci_conju_cliente: string;
  contato_conju_cliente: string;

  //IMOVEL
  nucleo_urbano_informal: string;
  status_lote_cliente: string;
  inscricao_imobiliaria: string;
  unidade_contruida1: string;
  unidade_contruida2: string;
  unidade_contruida3: string;
  unidade_contruida4: string;
  unidade_contruida5: string;
  unidade_contruida6: string;
  unidade_contruida7: string;
  unidade_contruida8: string;
  unidade_contruida9: string;
  unidade_contruida10: string;
  infra_agua_cesan_cliente: string;
  infra_energia_edp_cliente: string;
  infra_esgoto_cliente: string;
  infra_calcamento_cliente: string;
  imovel_regularizado_cliente: string;

  //OUTROS
  revista_cliente: string;
  prog_social_cliente: string;
  receb_valor_prog_social_cliente: string;
  valor_prog_social_cliente: string;

  public post:any = [];
  clientes: any = [];
  escolaridades: any = [];
  civis: any = [];
  nucleos: any = [];
  status: any = [];
  status2: any = [];
  status3: any = [];
  status4: any = [];

  dados:string;

  img_rg_frente_cliente: string = '';
  img_rg_tras_cliente: string = '';
  img_rg_frente_conjuge: string = '';
  img_rg_tras_conjuge: string = '';
  img_cert_casa_cliente: string = '';
  img_pact_anti_cliente: string = '';
  img_comp_end_cliente: string = '';
  img_comp_rend_cliente: string = '';
  img_doc_imovel_cliente: string = '';
  img_iptu_cliente: string = '';
  img_facha_cliente: string = '';

  cameraData1: string;
  cameraData2: string;
  cameraData3: string;
  cameraData4: string;
  cameraData5: string;
  cameraData6: string;
  cameraData7: string;
  cameraData8: string;
  cameraData9: string;
  cameraData10: string;
  cameraData11: string;
  cameraData12: string;
  cameraData13: string;

  base64Image1: string;
  base64Image2: string;
  base64Image3: string;
  base64Image4: string;
  base64Image5: string;
  base64Image6: string;
  base64Image7: string;
  base64Image8: string;
  base64Image9: string;
  base64Image10: string;
  base64Image11: string;
  base64Image12: string;
  base64Image13: string;

  className1: string = 'img-mini';
  className2: string = 'none';
  className3: string = 'img-mini';
  className4: string = 'none';
  className5: string = 'img-mini';
  className6: string = 'none';
  className7: string = 'img-mini';
  className8: string = 'none';
  className9: string = 'img-mini';
  className10: string = 'none';
  className11: string = 'img-mini';
  className12: string = 'none';
  className13: string = 'img-mini';
  className14: string = 'none';
  className15: string = 'img-mini';
  className16: string = 'none';
  className17: string = 'img-mini';
  className18: string = 'none';
  className19: string = 'img-mini';
  className20: string = 'none';
  className21: string = 'img-mini';
  className22: string = 'none';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera
    ) {

      const loader = this.loadingCtrl.create({
        content: "Aguarde...",
        duration: 2000
      });
      loader.present();

      this.post = navParams.get('post');

      var date_to_parse = new Date();
      var year = date_to_parse.getFullYear().toString();
      var month = (date_to_parse.getMonth() + 1).toString();
      var day = date_to_parse.getDate().toString();

      this.nascimento_cliente = day + '/' + month + '/' + year;

      this.nasci_conju_cliente = day + '/' + month + '/' + year;

      this.parseDate();
      this.parseDate2();
  }

  classBlock() {
    this.className1 = 'img-preview';
    this.className2 = 'img-preview';
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

    this.nascimento_cliente = this.nascimento_cliente.replace('-','/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarclientePage');
    this.clientes = [];
    this.escolaridades = [];
    this.civis = [];
    this.nucleos = [];
    this.status = [];
    this.status2 = [];
    this.status3 = [];
    this.status4 = [];
    this.loadCliente();
    this.loadEscolaridade();
    this.loadEstadoCivil();
    this.loadNucleo();
    this.loadStatus();
    this.loadStatus2();
    this.loadStatus3();
    this.loadStatus4();
    this.dados = "pessoais";
  }

  editarLocalizacao(){
    //console.log(this.post.id_cliente);
    this.navCtrl.push(EditarlocalizacaoPage, {post:this.post.id_cliente, post2:this.post.email_cliente});
  }

  loadCliente(){

    let body = {
      id_cliente: this.post.id_cliente,
      aksi: 'cliente_id'
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let cliente of data.result){
        this.clientes.push(cliente);
      }
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

  loadStatus2(){

    let body = {
      aksi: 'statusgeral',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let statu2 of data.result){
        this.status2.push(statu2);
      }
    });
  }

  loadStatus3(){

    let body = {
      aksi: 'statusgeral2',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let statu3 of data.result){
        this.status3.push(statu3);
      }
    });
  }

  loadStatus4(){

    let body = {
      aksi: 'statusgeral3',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let statu4 of data.result){
        this.status4.push(statu4);
      }
    });
  }

  salvar1(){

    const loader = this.loadingCtrl.create({
      content: "Salvando...",
      duration: 3000
    });
    loader.present();

    console.log( this.post.id_cliente);

    let body = {
      id_cliente: this.post.id_cliente,
      nome_cliente: this.nome_cliente,
      email_cliente: this.email_cliente,
      telefone_cliente: this.telefone_cliente,
      cpf_cliente: this.cpf_cliente,
      rg_cliente: this.rg_cliente,
      orgao_emissor_cliente: this.orgao_emissor_cliente,
      profissao_cliente: this.profissao_cliente,
      escolaridade_cliente: this.escolaridade_cliente,
      estado_civil_cliente: this.estado_civil_cliente,
      nacionalidade_cliente: this.nacionalidade_cliente,
      renda_cliente: this.renda_cliente,
      renda_conj_cliente: this.renda_conj_cliente,
      endereco_cliente: this.endereco_cliente,
      endereco_cliente2: this.endereco_cliente2,
      quadra_cliente: this.quadra_cliente,
      lote_cliente: this.lote_cliente,
      nome_conjuge_cliente: this.nome_conjuge_cliente,
      cpf_conju_cliente: this.cpf_conju_cliente,
      rg_conju_cliente: this.rg_conju_cliente,
      profi_conju_cliente: this.profi_conju_cliente,
      escol_conju_cliente: this.escol_conju_cliente,
      contato_conju_cliente: this.contato_conju_cliente,
      aksi: 'editar_cliente'
    };

    this.apiProvider.postData(body, 'api.php').subscribe((data) => {
      var alertpesan = data.msg;
      if(data.success){
        //this.navCtrl.pop();
        this.navCtrl.setRoot(TabsPage);
        const toast = this.toastCtrl.create({
          message: 'Dados salvos com sucesso!',
          duration: 2000
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

  salvarimovel(){

    const loader = this.loadingCtrl.create({
      content: "Salvando...",
      duration: 3000
    });
    loader.present();

    console.log( this.post.id_cliente);

    let body = {
      id_cliente: this.post.id_cliente,
      nucleo_urbano_informal: this.nucleo_urbano_informal,
      status_lote_cliente: this.status_lote_cliente,
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
      infra_agua_cesan_cliente: this.infra_agua_cesan_cliente,
      infra_energia_edp_cliente: this.infra_energia_edp_cliente,
      infra_esgoto_cliente: this.infra_esgoto_cliente,
      infra_calcamento_cliente: this.infra_calcamento_cliente,
      imovel_regularizado_cliente: this.imovel_regularizado_cliente,
      aksi: 'editar_imovel'
    };

    this.apiProvider.postData(body, 'api.php').subscribe((data) => {
      var alertpesan = data.msg;
      if(data.success){
        //this.navCtrl.pop();
        this.navCtrl.setRoot(TabsPage);
        //this.dados = "imovel";
        const toast = this.toastCtrl.create({
          message: 'Dados salvos com sucesso!',
          duration: 2000
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

  salvaroutros(){

    const loader = this.loadingCtrl.create({
      content: "Salvando...",
      duration: 3000
    });
    loader.present();

    console.log( this.post.id_cliente);

    let body = {
      id_cliente: this.post.id_cliente,
      revista_cliente: this.revista_cliente,
      prog_social_cliente: this.prog_social_cliente,
      receb_valor_prog_social_cliente: this.receb_valor_prog_social_cliente,
      valor_prog_social_cliente: this.valor_prog_social_cliente,
      aksi: 'editar_outros'
    };

    this.apiProvider.postData(body, 'api.php').subscribe((data) => {
      var alertpesan = data.msg;
      if(data.success){
        //this.navCtrl.pop();
        this.navCtrl.setRoot(TabsPage);
        //this.dados = "imovel";
        const toast = this.toastCtrl.create({
          message: 'Dados salvos com sucesso!',
          duration: 2000
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

  /*####################### RG FRENTE ###########################3*/
  escolherImagem1() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a imagem',
      buttons: [
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.openCamera1();
          }
        },{
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.openGaleria1();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCamera1(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData1 = imageData;
      this.base64Image1 = 'data:image/jpeg;base64,' + imageData;
      this.salvarImagem1();
      this.className1 = 'none';
      this.className2 = 'img-mini';

    }, (err) => {
     // Handle error
    });
  }

  openGaleria1(){

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData1 = imageData;
      this.base64Image1 = 'data:image/jpeg;base64,' + imageData;
      this.salvarImagem1();
      this.className1 = 'none';
      this.className2 = 'img-mini';

    }, (err) => {
     // Handle error
    });

  }

  salvarImagem1(){

    let body = {
      email_cliente: this.post.email_cliente,
      img_rg_frente_cliente: this.cameraData1,
      aksi: 'salvarimagem1'
    };

    this.apiProvider.postData(body, 'api.php').subscribe((data) => {
      var alertpesan = data.msg;
      if(data.success){

        const loader = this.loadingCtrl.create({
          content: "Salvando...",
          duration: 2000
        });
        loader.present();

        //this.navCtrl.setRoot(EditarclientePage);
        //this.dados = "fotos";

       /* const toast = this.toastCtrl.create({
          message: 'Imagem alterada com sucesso!',
          duration: 3000
        });
        toast.present();*/

      }else{
        const toast = this.toastCtrl.create({
          message: alertpesan,
          duration: 4000
        });
        toast.present();
      }
    });

  }

  /*####################### RG TRÁS ###########################3*/
  escolherImagem2() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a imagem',
      buttons: [
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.openCamera2();
          }
        },{
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.openGaleria2();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCamera2(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData2 = imageData;
      this.base64Image2 = 'data:image/jpeg;base64,' + imageData;
      this.salvarImagem2();
      this.className3 = 'none';
      this.className4 = 'img-mini';

    }, (err) => {
     // Handle error
    });
  }

  openGaleria2(){

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData2 = imageData;
      this.base64Image2 = 'data:image/jpeg;base64,' + imageData;
      this.salvarImagem2();
      this.className3 = 'none';
      this.className4 = 'img-mini';

    }, (err) => {
     // Handle error
    });

  }

  salvarImagem2(){

    let body = {
      email_cliente: this.post.email_cliente,
      img_rg_tras_cliente: this.cameraData2,
      aksi: 'salvarimagem2'
    };

    this.apiProvider.postData(body, 'api.php').subscribe((data) => {
      var alertpesan = data.msg;
      if(data.success){

        const loader = this.loadingCtrl.create({
          content: "Salvando...",
          duration: 2000
        });
        loader.present();

        //this.navCtrl.setRoot(EditarclientePage);
        //this.dados = "fotos";

        /*const toast = this.toastCtrl.create({
          message: 'Imagem alterada com sucesso!',
          duration: 3000
        });
        toast.present();*/

      }else{
        const toast = this.toastCtrl.create({
          message: alertpesan,
          duration: 4000
        });
        toast.present();
      }
    });

  }

  /*####################### RG CONJUGE TRÁS ###########################3*/
  escolherImagem3() {
      const actionSheet = this.actionSheetCtrl.create({
        title: 'Selecione a imagem',
        buttons: [
          {
            text: 'Câmera',
            icon: 'camera',
            handler: () => {
              this.openCamera3();
            }
          },{
            text: 'Galeria',
            icon: 'image',
            handler: () => {
              this.openGaleria3();
            }
          }
        ]
      });
      actionSheet.present();
  }

  openCamera3(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        this.cameraData3 = imageData;
        this.base64Image3 = 'data:image/jpeg;base64,' + imageData;
        this.salvarImagem3();
        this.className5 = 'none';
        this.className6 = 'img-mini';

      }, (err) => {
       // Handle error
      });
  }

  openGaleria3(){

      const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        this.cameraData3 = imageData;
        this.base64Image3 = 'data:image/jpeg;base64,' + imageData;
        this.salvarImagem3();
        this.className5 = 'none';
        this.className6 = 'img-mini';

      }, (err) => {
       // Handle error
      });

  }

  salvarImagem3(){

      let body = {
        email_cliente: this.post.email_cliente,
        img_rg_tras_cliente: this.cameraData2,
        aksi: 'salvarimagem3'
      };

      this.apiProvider.postData(body, 'api.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

          const loader = this.loadingCtrl.create({
            content: "Salvando...",
            duration: 2000
          });
          loader.present();

          //this.navCtrl.setRoot(EditarclientePage);
          //this.dados = "fotos";

          /*const toast = this.toastCtrl.create({
            message: 'Imagem alterada com sucesso!',
            duration: 3000
          });
          toast.present();*/

        }else{
          const toast = this.toastCtrl.create({
            message: alertpesan,
            duration: 4000
          });
          toast.present();
        }
      });

  }

/*####################### RG CONJUGE TRÁS ###########################3*/
escolherImagem4() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a imagem',
      buttons: [
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.openCamera4();
          }
        },{
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.openGaleria4();
          }
        }
      ]
    });
    actionSheet.present();
}

openCamera4(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData4 = imageData;
      this.base64Image4 = 'data:image/jpeg;base64,' + imageData;
      this.salvarImagem4();
      this.className7 = 'none';
      this.className8 = 'img-mini';

    }, (err) => {
     // Handle error
    });
}

openGaleria4(){

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData4 = imageData;
      this.base64Image4 = 'data:image/jpeg;base64,' + imageData;
      this.salvarImagem4();
      this.className7 = 'none';
      this.className8 = 'img-mini';

    }, (err) => {
     // Handle error
    });

}

salvarImagem4(){

    let body = {
      email_cliente: this.post.email_cliente,
      img_rg_tras_conjuge: this.cameraData4,
      aksi: 'salvarimagem4'
    };

    this.apiProvider.postData(body, 'api.php').subscribe((data) => {
      var alertpesan = data.msg;
      if(data.success){

        const loader = this.loadingCtrl.create({
          content: "Salvando...",
          duration: 2000
        });
        loader.present();

        //this.navCtrl.setRoot(EditarclientePage);
        //this.dados = "fotos";

        /*const toast = this.toastCtrl.create({
          message: 'Imagem alterada com sucesso!',
          duration: 3000
        });
        toast.present();*/

      }else{
        const toast = this.toastCtrl.create({
          message: alertpesan,
          duration: 4000
        });
        toast.present();
      }
    });

}

/*####################### CERTIDÃO DE CASAMENTO ###########################3*/
escolherImagem5() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Selecione a imagem',
    buttons: [
      {
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.openCamera5();
        }
      },{
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.openGaleria5();
        }
      }
    ]
  });
  actionSheet.present();
}

openCamera5(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData5 = imageData;
    this.base64Image5 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem5();
    this.className9 = 'none';
    this.className10 = 'img-mini';

  }, (err) => {
   // Handle error
  });
}

openGaleria5(){

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData5 = imageData;
    this.base64Image5 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem5();
    this.className9 = 'none';
    this.className10 = 'img-mini';

  }, (err) => {
   // Handle error
  });

}

salvarImagem5(){

  let body = {
    email_cliente: this.post.email_cliente,
    img_cert_casa_cliente: this.cameraData5,
    aksi: 'salvarimagem5'
  };

  this.apiProvider.postData(body, 'api.php').subscribe((data) => {
    var alertpesan = data.msg;
    if(data.success){

      const loader = this.loadingCtrl.create({
        content: "Salvando...",
        duration: 2000
      });
      loader.present();

      //this.navCtrl.setRoot(EditarclientePage);
      //this.dados = "fotos";

      /*const toast = this.toastCtrl.create({
        message: 'Imagem alterada com sucesso!',
        duration: 3000
      });
      toast.present();*/

    }else{
      const toast = this.toastCtrl.create({
        message: alertpesan,
        duration: 4000
      });
      toast.present();
    }
  });

}

/*####################### PACTO ANTENUPCIAL ###########################3*/
escolherImagem6() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Selecione a imagem',
    buttons: [
      {
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.openCamera6();
        }
      },{
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.openGaleria6();
        }
      }
    ]
  });
  actionSheet.present();
}

openCamera6(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData6 = imageData;
    this.base64Image6 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem6();
    this.className11 = 'none';
    this.className12 = 'img-mini';

  }, (err) => {
   // Handle error
  });
}

openGaleria6(){

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData6 = imageData;
    this.base64Image6 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem6();
    this.className11 = 'none';
    this.className12 = 'img-mini';

  }, (err) => {
   // Handle error
  });

}

salvarImagem6(){

  let body = {
    email_cliente: this.post.email_cliente,
    img_pact_anti_cliente: this.cameraData6,
    aksi: 'salvarimagem6'
  };

  this.apiProvider.postData(body, 'api.php').subscribe((data) => {
    var alertpesan = data.msg;
    if(data.success){

      const loader = this.loadingCtrl.create({
        content: "Salvando...",
        duration: 2000
      });
      loader.present();

      //this.navCtrl.setRoot(EditarclientePage);
      //this.dados = "fotos";

      /*const toast = this.toastCtrl.create({
        message: 'Imagem alterada com sucesso!',
        duration: 3000
      });
      toast.present();*/

    }else{
      const toast = this.toastCtrl.create({
        message: alertpesan,
        duration: 4000
      });
      toast.present();
    }
  });

}

/*####################### COMPROVANTE DE ENDEREÇO ###########################3*/
escolherImagem7() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Selecione a imagem',
    buttons: [
      {
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.openCamera7();
        }
      },{
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.openGaleria7();
        }
      }
    ]
  });
  actionSheet.present();
}

openCamera7(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData7 = imageData;
    this.base64Image7 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem7();
    this.className13 = 'none';
    this.className14 = 'img-mini';

  }, (err) => {
   // Handle error
  });
}

openGaleria7(){

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData7 = imageData;
    this.base64Image7 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem7();
    this.className13 = 'none';
    this.className14 = 'img-mini';

  }, (err) => {
   // Handle error
  });

}

salvarImagem7(){

  let body = {
    email_cliente: this.post.email_cliente,
    img_comp_end_cliente: this.cameraData7,
    aksi: 'salvarimagem7'
  };

  this.apiProvider.postData(body, 'api.php').subscribe((data) => {
    var alertpesan = data.msg;
    if(data.success){

      const loader = this.loadingCtrl.create({
        content: "Salvando...",
        duration: 2000
      });
      loader.present();

      //this.navCtrl.setRoot(EditarclientePage);
      //this.dados = "fotos";

      /*const toast = this.toastCtrl.create({
        message: 'Imagem alterada com sucesso!',
        duration: 3000
      });
      toast.present();*/

    }else{
      const toast = this.toastCtrl.create({
        message: alertpesan,
        duration: 4000
      });
      toast.present();
    }
  });

}

/*####################### COMPROVANTE DE RENDIMENTOS ###########################3*/
escolherImagem8() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Selecione a imagem',
    buttons: [
      {
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.openCamera8();
        }
      },{
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.openGaleria8();
        }
      }
    ]
  });
  actionSheet.present();
}

openCamera8(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData8 = imageData;
    this.base64Image8 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem8();
    this.className15 = 'none';
    this.className16 = 'img-mini';

  }, (err) => {
   // Handle error
  });
}

openGaleria8(){

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData8 = imageData;
    this.base64Image8 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem8();
    this.className15 = 'none';
    this.className16 = 'img-mini';

  }, (err) => {
   // Handle error
  });

}

salvarImagem8(){

  let body = {
    email_cliente: this.post.email_cliente,
    img_comp_rend_cliente: this.cameraData8,
    aksi: 'salvarimagem8'
  };

  this.apiProvider.postData(body, 'api.php').subscribe((data) => {
    var alertpesan = data.msg;
    if(data.success){

      const loader = this.loadingCtrl.create({
        content: "Salvando...",
        duration: 2000
      });
      loader.present();

      //this.navCtrl.setRoot(EditarclientePage);
      //this.dados = "fotos";

      /*const toast = this.toastCtrl.create({
        message: 'Imagem alterada com sucesso!',
        duration: 3000
      });
      toast.present();*/

    }else{
      const toast = this.toastCtrl.create({
        message: alertpesan,
        duration: 4000
      });
      toast.present();
    }
  });

}

/*####################### DOCUMENTOS DO IMÓVEL ###########################3*/
escolherImagem9() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Selecione a imagem',
    buttons: [
      {
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.openCamera9();
        }
      },{
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.openGaleria9();
        }
      }
    ]
  });
  actionSheet.present();
}

openCamera9(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData9 = imageData;
    this.base64Image9 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem9();
    this.className17 = 'none';
    this.className18 = 'img-mini';

  }, (err) => {
   // Handle error
  });
}

openGaleria9(){

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData9 = imageData;
    this.base64Image9 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem9();
    this.className17 = 'none';
    this.className18 = 'img-mini';

  }, (err) => {
   // Handle error
  });

}

salvarImagem9(){

  let body = {
    email_cliente: this.post.email_cliente,
    img_doc_imovel_cliente: this.cameraData9,
    aksi: 'salvarimagem9'
  };

  this.apiProvider.postData(body, 'api.php').subscribe((data) => {
    var alertpesan = data.msg;
    if(data.success){

      const loader = this.loadingCtrl.create({
        content: "Salvando...",
        duration: 2000
      });
      loader.present();

      //this.navCtrl.setRoot(EditarclientePage);
      //this.dados = "fotos";

      /*const toast = this.toastCtrl.create({
        message: 'Imagem alterada com sucesso!',
        duration: 3000
      });
      toast.present();*/

    }else{
      const toast = this.toastCtrl.create({
        message: alertpesan,
        duration: 4000
      });
      toast.present();
    }
  });

}

/*####################### IPTU ###########################3*/
escolherImagem10() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Selecione a imagem',
    buttons: [
      {
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.openCamera10();
        }
      },{
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.openGaleria10();
        }
      }
    ]
  });
  actionSheet.present();
}

openCamera10(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData10 = imageData;
    this.base64Image10 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem10();
    this.className19 = 'none';
    this.className20 = 'img-mini';

  }, (err) => {
   // Handle error
  });
}

openGaleria10(){

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData10 = imageData;
    this.base64Image10 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem10();
    this.className19 = 'none';
    this.className20 = 'img-mini';

  }, (err) => {
   // Handle error
  });

}

salvarImagem10(){

  let body = {
    email_cliente: this.post.email_cliente,
    img_iptu_cliente: this.cameraData10,
    aksi: 'salvarimagem10'
  };

  this.apiProvider.postData(body, 'api.php').subscribe((data) => {
    var alertpesan = data.msg;
    if(data.success){

      const loader = this.loadingCtrl.create({
        content: "Salvando...",
        duration: 2000
      });
      loader.present();

      //this.navCtrl.setRoot(EditarclientePage);
      //this.dados = "fotos";

      /*const toast = this.toastCtrl.create({
        message: 'Imagem alterada com sucesso!',
        duration: 3000
      });
      toast.present();*/

    }else{
      const toast = this.toastCtrl.create({
        message: alertpesan,
        duration: 4000
      });
      toast.present();
    }
  });

}

/*####################### FACHADA ###########################3*/
escolherImagem11() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Selecione a imagem',
    buttons: [
      {
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.openCamera11();
        }
      },{
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.openGaleria11();
        }
      }
    ]
  });
  actionSheet.present();
}

openCamera11(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData11 = imageData;
    this.base64Image11 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem11();
    this.className21 = 'none';
    this.className22 = 'img-mini';

  }, (err) => {
   // Handle error
  });
}

openGaleria11(){

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData11 = imageData;
    this.base64Image11 = 'data:image/jpeg;base64,' + imageData;
    this.salvarImagem11();
    this.className21 = 'none';
    this.className22 = 'img-mini';

  }, (err) => {
   // Handle error
  });

}

salvarImagem11(){

  let body = {
    email_cliente: this.post.email_cliente,
    img_facha_cliente: this.cameraData11,
    aksi: 'salvarimagem11'
  };

  this.apiProvider.postData(body, 'api.php').subscribe((data) => {
    var alertpesan = data.msg;
    if(data.success){

      const loader = this.loadingCtrl.create({
        content: "Salvando...",
        duration: 2000
      });
      loader.present();

      //this.navCtrl.setRoot(EditarclientePage);
      //this.dados = "fotos";

      /*const toast = this.toastCtrl.create({
        message: 'Imagem alterada com sucesso!',
        duration: 3000
      });
      toast.present();*/

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
