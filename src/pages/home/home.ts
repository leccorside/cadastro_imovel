import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { VerclientePage } from '../vercliente/vercliente';
import { NovoclientePage } from '../novocliente/novocliente';
import { Novocliente14Page } from '../novocliente14/novocliente14';
import { Novocliente13Page } from '../novocliente13/novocliente13';
import { Novocliente12Page } from '../novocliente12/novocliente12';
import { Novocliente11Page } from '../novocliente11/novocliente11';
import { Novocliente10Page } from '../novocliente10/novocliente10';
import { Novocliente9Page } from '../novocliente9/novocliente9';
import { Novocliente8Page } from '../novocliente8/novocliente8';
import { Novocliente7Page } from '../novocliente7/novocliente7';
import { Novocliente6Page } from '../novocliente6/novocliente6';
import { LocalizacaoPage } from '../localizacao/localizacao';
import { EditarclientePage } from '../editarcliente/editarcliente';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  clientes: any = [];
  searchQuery: string = '';

  private isLoading3 = false;
  private ndaencontrado = false;

  private isLoading = false;
  private isLoading2 = false;

  constructor(
    public navCtrl: NavController,
    private apiProvider: ApiProvider,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) {


  }

  ionViewDidLoad(){
    this.clientes = [];

    if(this.clientes){
      this.loadclientes();
      this.loadclientes2();
    }
  }

  loadclientes(){

    this.isLoading2 = true;
    this.ndaencontrado = false;

    let body = {
      aksi: 'clientes2',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      this.isLoading2 = false;
      for(let cliente of data.result){
        this.clientes.push(cliente);
      }
    });
  }

  loadclientes2(){

    console.log(this.searchQuery);


    if(!this.isLoading3 && this.searchQuery.length > 0){
      this.isLoading3 = true;
      this.isLoading2 = true;
      this.ndaencontrado = true;

      let body = {
        resultado_busca: this.searchQuery,
        aksi: 'clientes_busca'
      };

      //this.ndaencontrado = false;

      this.apiProvider.postData(body, 'api.php').subscribe(data => {
        this.isLoading2 = false;
        this.isLoading3 = false;

        for(let cliente of data.result){
          this.clientes.push(cliente);
          this.ndaencontrado = false;
        }
      });

    }

  }

  onSearch(){
    this.clientes = [];
    this.loadclientes2();
  }

  clearSearch(){
    this.searchQuery = '';
    this.clientes = [];
    this.loadclientes();
    this.ndaencontrado = false;
  }

  visualizar(cliente){
    this.navCtrl.push(VerclientePage, {post:cliente});
  }

  editar(cliente){
    console.log(cliente.id_cliente);
    this.navCtrl.push(EditarclientePage, {post:cliente});
  }

  deletar(cliente){

    console.log(cliente.id_cliente);

    const confirm = this.alertCtrl.create({
      title: 'Deseja deletar este cliente?',
      message: 'Caso delete o produto ele será excluído definitivamente do banco de dados.',
      buttons: [
          {
              text: 'Não',
              handler: () => {
                  console.log('Disagree clicked');
              }
          },
          {
            text: 'Sim',
            handler: () => {
                this.deletar2(cliente);
            }
        }
    ]
  });
  confirm.present();

  }

  deletar2(cliente){
    let body = {
      id_cliente: cliente.id_cliente,
      aksi: 'delete_cliente'
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data=>{
        //this.produtos = data.result;
    });

    //ATUALIZA A LISTA AO DELETAR
    let index = this.clientes.indexOf(cliente);

    if(index > -1){
      this.clientes.splice(index, 1);
    }

    const toast = this.toastCtrl.create({
      message: 'Cliente deletado com sucesso!',
      duration: 3000
    });
    toast.present();
  }

  inativar(cliente){
    let body = {
      id_cliente: cliente.id_cliente,
      aksi: 'inativar_cliente'
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data=>{
        //this.produtos = data.result;
    });

    //ATUALIZA A LISTA AO DELETAR
    let index = this.clientes.indexOf(cliente);

    if(index > -1){
      this.clientes.splice(index, 1);
    }

    this.navCtrl.setRoot(TabsPage);

    const toast = this.toastCtrl.create({
      message: 'Cliente Inativado!',
      duration: 3000
    });
    toast.present();

  }

  ativar(cliente){
    let body = {
      id_cliente: cliente.id_cliente,
      aksi: 'ativar_cliente'
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data=>{
        //this.produtos = data.result;

    });

    //ATUALIZA A LISTA AO DELETAR
    let index = this.clientes.indexOf(cliente);

    if(index > -1){
      this.clientes.splice(index, 1);
    }

    this.navCtrl.setRoot(TabsPage);

    const toast = this.toastCtrl.create({
      message: 'Cliente Ativado!',
      duration: 3000
    });
    toast.present();

  }

  novoCliente(){
    this.navCtrl.push(NovoclientePage, {});
  }

  img1(){
    this.navCtrl.push(Novocliente6Page, {});
  }

  img2(){
    this.navCtrl.push(Novocliente7Page, {});
  }

  img3(){
    this.navCtrl.push(Novocliente8Page, {});
  }

  img4(){
    this.navCtrl.push(Novocliente9Page, {});
  }

  img5(){
    this.navCtrl.push(Novocliente10Page, {});
  }

  img6(){
    this.navCtrl.push(Novocliente11Page, {});
  }

  img7(){
    this.navCtrl.push(Novocliente12Page, {});
  }

  img8(){
    this.navCtrl.push(Novocliente13Page, {});
  }

  img9(){
    this.navCtrl.push(Novocliente14Page, {});
  }

  loc(){
    this.navCtrl.push(LocalizacaoPage, {});
  }

}
