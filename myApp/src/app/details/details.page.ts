import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Platform,
} from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private platform: Platform
  ) { }

  async ngOnInit() {
    const params = this.route.snapshot.params
    /*if(!params.userId || !params.token) {
      this.router.navigate(['/']);
      return
    }*/
    
    //this.token = params.token
    //this.userId = params.userId
    this.todo = JSON.parse(params.todo)

    await this.platform.ready();
    await this.loadMap();
  }

  ionViewDidEnter () {
  }


  loadMap () {

    // This code is necessary for browser
    /*Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `https://`)',
      'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `http://`)'
    });*/

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    //let element: HTMLElement = document.getElementById('map-canvas');
    this.map = GoogleMaps.create('map-canvas', mapOptions);

    /*let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });*/
  }

  todo: any
  map: GoogleMap

}
