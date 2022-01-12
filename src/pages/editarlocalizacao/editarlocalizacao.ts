import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiProvider } from '../../providers/api/api';

declare var google;

@IonicPage()
@Component({
  selector: 'page-editarlocalizacao',
  templateUrl: 'editarlocalizacao.html',
})
export class EditarlocalizacaoPage {

  public id_cliente:any = [];
  public email_cliente:any = [];

  latitude_cliente: string = '';
  logitude_cliente: string = '';

  map: any;
  position: any;

  public post:any = [];
  public post2:any = [];
  clientes: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private geolocation: Geolocation,
    private apiProvider: ApiProvider,
    public toastCtrl: ToastController,
    ) {

      this.id_cliente = navParams.get('post');
      this.email_cliente = navParams.get('post2');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarlocalizacaoPage');
    console.log(this.id_cliente);
    console.log(this.email_cliente);
    this.clientes = [];
    this.geolocation.getCurrentPosition().then(position => {console.log(position.coords.latitude)});
    this.geolocation.getCurrentPosition().then(position => {console.log(position.coords.longitude)});
    this.loadCliente();
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

    //console.log(this.email_cliente);
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

          this.viewCtrl.dismiss();

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

  loadCliente(){

    let body = {
      id_cliente: this.id_cliente,
      aksi: 'cliente_id'
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let cliente of data.result){
        this.clientes.push(cliente);
      }
    });
  }

}
