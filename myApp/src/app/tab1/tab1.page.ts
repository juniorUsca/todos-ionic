import { Component } from '@angular/core';
import { ItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  todos = ["asd", "asddss", "aaa"]

  delete = (slidingItem: ItemSliding) => {
    console.log(slidingItem)
    slidingItem.close();
  }

  open = (slidingItem: ItemSliding) => {
    console.log(slidingItem)
  }


}
