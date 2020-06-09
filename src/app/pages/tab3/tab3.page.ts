import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Marker, WayPoint } from '../../interfaces/interfaces';

declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  map = null;
  directionsService = new google.maps.DirectionsService(); // nos da los calculos de la ruta
  directionsDisplay = new google.maps.DirectionsRenderer(); // nos dibuja la ruta

  origen = { lat: 17.978363, lng: -93.063792};
  destino = { lat: 17.9980664 , lng: -92.920169218 };

  wayPoint: WayPoint [] = [
    {
      location: {lat: 17.988342, lng: -92.974269},
      stopover: true
    },
    {
      location: {lat: 17.973981, lng: -93.129499},
      stopover: true
    },
    {
      location: {lat: 18.006270, lng: -93.141313},
      stopover: true
    },
    {
      location: {lat: 18.062280, lng: -93.161853},
      stopover: true
    },
    {
      location: {lat: 18.068205, lng: -93.174391},
      stopover: true
    }
  ];

  constructor(private geo: Geolocation) {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap(){

    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');

    // a qui ira le geolocation de ionic
    const myLatLng = {lat: 18.1961136 , lng: -93.123379212};

    this.map = new google.maps.Map(mapEle, {
      center: this.origen, // centramos desde el punto de origen
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map); // renderizamos todo al mapa con esta linea
    this.directionsDisplay.setPanel(indicatorsEle); // pintamos el panel

    google.maps.event.addListenerOnce( this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();

    });

  }
  private calculateRoute(){
    this.directionsService.route({
      origin: this.destino,
      destination: this.destino,
      waypoints: this.wayPoint,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if ( status === google.maps.DirectionsStatus.OK ){
        this.directionsDisplay.setDirections(response);
      } else {
        alert('error ' + status);
      }
    });
  }

  // añadimos el marker
  /*addMarker( marker: Marker ){
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }*/

  // recoremos el arreglo de markers y los añadimos
  /*renderMarkers(){
    this.markers.forEach( marker => {
      this.addMarker( marker );
    });
  }*/

}
