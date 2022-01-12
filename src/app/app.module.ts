import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { EsquecisenhaPage } from '../pages/esquecisenha/esquecisenha';
import { ApiProvider } from '../providers/api/api';
import { VerclientePage } from '../pages/vercliente/vercliente';
import { EditarclientePage } from '../pages/editarcliente/editarcliente';
import { NovoclientePage } from '../pages/novocliente/novocliente';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Novocliente2Page } from '../pages/novocliente2/novocliente2';
import { Novocliente4Page } from '../pages/novocliente4/novocliente4';
import { Novocliente3Page } from '../pages/novocliente3/novocliente3';
import { Novocliente5Page } from '../pages/novocliente5/novocliente5';
import { Novocliente6Page } from '../pages/novocliente6/novocliente6';

import { Camera } from '@ionic-native/camera';

import { Novocliente7Page } from '../pages/novocliente7/novocliente7';
import { Novocliente8Page } from '../pages/novocliente8/novocliente8';
import { Novocliente9Page } from '../pages/novocliente9/novocliente9';
import { Novocliente14Page } from '../pages/novocliente14/novocliente14';
import { Novocliente13Page } from '../pages/novocliente13/novocliente13';
import { Novocliente10Page } from '../pages/novocliente10/novocliente10';
import { Novocliente11Page } from '../pages/novocliente11/novocliente11';
import { Novocliente12Page } from '../pages/novocliente12/novocliente12';
import { LocalizacaoPage } from '../pages/localizacao/localizacao';
import { Geolocation } from '@ionic-native/geolocation';
import { EditarlocalizacaoPage } from '../pages/editarlocalizacao/editarlocalizacao';
import { DocumentosPage } from '../pages/documentos/documentos';
import { BuscaPage } from '../pages/busca/busca';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PerfilPage,
    LoginPage,
    EsquecisenhaPage,
    VerclientePage,
    EditarclientePage,
    NovoclientePage,
    Novocliente2Page,
    Novocliente3Page,
    Novocliente4Page,
    Novocliente5Page,
    Novocliente6Page,
    Novocliente7Page,
    Novocliente8Page,
    Novocliente9Page,
    Novocliente10Page,
    Novocliente11Page,
    Novocliente12Page,
    Novocliente13Page,
    Novocliente14Page,
    LocalizacaoPage,
    EditarlocalizacaoPage,
    DocumentosPage,
    BuscaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrMaskerModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          backButtonText: ''
        }
      },
      monthNames: ['janeiro', 'fevereiro', 'marÇO', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
      monthShortNames: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
      dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado' ],
      dayShortNames: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PerfilPage,
    LoginPage,
    EsquecisenhaPage,
    VerclientePage,
    EditarclientePage,
    NovoclientePage,
    Novocliente2Page,
    Novocliente3Page,
    Novocliente4Page,
    Novocliente5Page,
    Novocliente6Page,
    Novocliente7Page,
    Novocliente8Page,
    Novocliente9Page,
    Novocliente10Page,
    Novocliente11Page,
    Novocliente12Page,
    Novocliente13Page,
    Novocliente14Page,
    LocalizacaoPage,
    EditarlocalizacaoPage,
    DocumentosPage,
    BuscaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
