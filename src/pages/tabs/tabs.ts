import { Component } from '@angular/core';
import { DocumentosPage } from '../documentos/documentos';

import { HomePage } from '../home/home';
import { PerfilPage } from '../perfil/perfil';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DocumentosPage;
  tab3Root = PerfilPage;

  constructor() {

  }
}
