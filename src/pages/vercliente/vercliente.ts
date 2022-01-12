import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-vercliente',
  templateUrl: 'vercliente.html',
})
export class VerclientePage {

  public post:any = [];
  clientes: any = [];

  public site_google: string  = 'https://www.google.com/maps/place/';

  dados:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
    ) {

      const loader = this.loadingCtrl.create({
        content: "Aguarde...",
        duration: 3000
      });
      loader.present();

      this.post = navParams.get('post');

  }


  ionViewDidLoad() {
    this.clientes = [];
    this.loadCliente();
    this.dados = "pessoais";
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

  mapa(){
    window.open(this.site_google+this.post.latitude_cliente+','+this.post.longitude_cliente);
  }


}
