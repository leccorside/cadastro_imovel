import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';

declare var google;

@IonicPage()
@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html',
})
export class LocalizacaoPage {

  latitude_cliente: string = '';
  logitude_cliente: string = '';

  public email_cliente2: string = 'sasdasdasss@gmail.com';
  public email_cliente:any = [];

  map: any;
  position: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public toastCtrl: ToastController,
    private apiProvider: ApiProvider
    ) {

      this.email_cliente = navParams.get('email_cliente');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalizacaoPage');
    console.log(this.geolocation.getCurrentPosition());
    this.gerarMapa();

  }

  gerarMapa(){

    this.geolocation.getCurrentPosition()
    .then((resp)=>{
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      const mapOptions = {
        zoom: 18,
        center: position
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      const marker = new google.maps.Marker({
        position: position,
        map: this.map
      });

    }).catch((error) => {
      console.log('Erro ao recuperar sua localização.', error);
    });


  }

  localizar(){
      this.geolocation.getCurrentPosition().then(position => {console.log(position.coords.latitude)});
      this.geolocation.getCurrentPosition().then(position => {console.log(position.coords.longitude)});

      this.geolocation.getCurrentPosition().then(position => {

        let body = {
          email_cliente: this.email_cliente,
          latitude_cliente: position.coords.latitude,
          longitude_cliente: position.coords.longitude,
          aksi: 'salvarlocalizacao'
        };

        this.apiProvider.postData(body, 'api.php').subscribe((data) => {
          var alertpesan = data.msg;
          if(data.success){

            //this.mySlider.slideNext();
            this.navCtrl.setRoot(HomePage, {
              email_cliente:this.email_cliente
            });

          }else{
            const toast = this.toastCtrl.create({
              message: alertpesan,
              duration: 5000
            });
            toast.present();
          }
        });

      });

    }

  }


