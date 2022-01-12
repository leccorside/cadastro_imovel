import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-documentos',
  templateUrl: 'documentos.html',
})
export class DocumentosPage {

  url: string = 'https://developeranddesigner.com.br/cad_imovel/api/pdf/';

  clientes: any = [];
  docs: any = [];
  searchQuery: string = '';
  id_cliente: any;

  pdfs: any;

  private isLoading3 = false;
  private ndaencontrado = false;

  private isLoading = false;
  private isLoading2 = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private apiProvider: ApiProvider,
    public toastCtrl: ToastController,
    ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentosPage');

    this.clientes = [];
    this.docs = [];

    if(this.clientes){
      this.loadclientes();
      this.loadclientes2();
    }

    this.loadDocs();

  }

  abrirLink(){
    window.open(this.url);
  }


  gerarPdf(id_cliente, nome_cliente, email_cliente, telefone_cliente){

    console.log(id_cliente);
    console.log(nome_cliente);
    console.log(email_cliente);
    console.log(telefone_cliente);

    const loader = this.loadingCtrl.create({
      content: "Gerando...",
      duration: 4000
    });
    loader.present();

    let body = {
      id_cliente: id_cliente,
      nome_cliente: nome_cliente,
      email_cliente: email_cliente,
      telefone_cliente: telefone_cliente,
      aksi: 'gerarpdf',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let pdf of data.result){
        this.pdfs.push(pdf);

      }
    });

    window.open(this.url+id_cliente+'.pdf');

  }

  loadDocs(){
    let body = {
      id_cliente: this.id_cliente,
      aksi: 'documentos',
    };

    this.apiProvider.postData(body, 'api.php').subscribe(data => {
      for(let doc of data.result){
        this.docs.push(doc);
      }
    });
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


}
