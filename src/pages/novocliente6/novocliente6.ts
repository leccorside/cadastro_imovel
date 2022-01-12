import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Novocliente7Page } from '../novocliente7/novocliente7';
import { Novocliente10Page } from '../novocliente10/novocliente10';

@IonicPage()
@Component({
  selector: 'page-novocliente6',
  templateUrl: 'novocliente6.html',
})
export class Novocliente6Page {

  img_rg_frente_cliente: string = '';
	img_rg_tras_cliente: string = '';

  cameraData1: string;
  cameraData2: string;

  base64Image1: string;
  base64Image2: string;

  className1: string = 'img-mini';
  className2: string = 'none';
  className3: string = 'img-mini';
  className4: string = 'none';

  public email_cliente2: string = 'sasdasdasss@gmail.com';
  public email_cliente:any = [];
  public estado_civil_cliente:any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private apiProvider: ApiProvider,
    public loadingCtrl: LoadingController
    ) {

      this.email_cliente = navParams.get('email_cliente');
      this.estado_civil_cliente = navParams.get('estado_civil_cliente');

      console.log(this.email_cliente);
      console.log(this.estado_civil_cliente);
      console.log(this.email_cliente2);

  }

  classBlock() {
    this.className1 = 'img-preview';
    this.className2 = 'img-preview';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Novocliente6Page');
  }

  proximo1(){

      const loader = this.loadingCtrl.create({
        content: "Cadastrando...",
        duration: 3000
      });
      loader.present();

      console.log(this.cameraData1);
      console.log(this.cameraData2);
      console.log(this.email_cliente2);

      let body = {
        email_cliente: this.email_cliente,
        img_rg_frente_cliente: this.cameraData1,
        img_rg_tras_cliente: this.cameraData2,
        aksi: 'salvarrgcliente'
      };

      this.apiProvider.postData(body, 'api.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

            if(
              this.estado_civil_cliente == "Solteiro" ||
              this.estado_civil_cliente == "Viúvo" ||
              this.estado_civil_cliente == "Divorciado"
            ){

              this.navCtrl.setRoot(Novocliente10Page, {
                email_cliente:this.email_cliente,
                estado_civil_cliente:this.estado_civil_cliente
              });

            }else{

              this.navCtrl.setRoot(Novocliente7Page, {
                email_cliente:this.email_cliente,
                estado_civil_cliente:this.estado_civil_cliente
              });

            }

        }else{
          const toast = this.toastCtrl.create({
            message: alertpesan,
            duration: 4000
          });
          toast.present();
        }
      });

  }

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
      this.className1 = 'none';
      this.className2 = 'img-mini';
    }, (err) => {
     // Handle error
    });

  }

  /**############################################################################## */

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
      this.className3 = 'none';
      this.className4 = 'img-mini';
    }, (err) => {
     // Handle error
    });

  }

}
