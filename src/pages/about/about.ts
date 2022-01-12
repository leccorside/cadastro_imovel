import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public post:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let post = navParams.get('post');

   // this.post = navParams.get('post');

   console.log(post);

  }

}
