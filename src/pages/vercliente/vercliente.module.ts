import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerclientePage } from './vercliente';

@NgModule({
  declarations: [
    VerclientePage,
  ],
  imports: [
    IonicPageModule.forChild(VerclientePage),
  ],
})
export class VerclientePageModule {}
