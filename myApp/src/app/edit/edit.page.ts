import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HTTP } from '@ionic-native/http/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private http: HTTP,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params
    if(!params.userId || !params.token) {
      this.router.navigate(['/']);
      return
    }
    
    this.token = params.token
    this.todo.userId = params.userId
    this.userId = params.userId
    if(params.todo) {
      this.todo = params.todo
      this.title = "Edit todo"
    }
    
  }

  token: String
  userId: String
  title: String = "New todo"
  todo = {
    title: '',
    description: '',
    attachs: [],
    lat: 0,
    lng: 0,
    userId: '',
  }

  save = () => {
    
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.todo.lat =  resp.coords.latitude
        this.todo.lng =  resp.coords.longitude
        this.create()
      })
      .catch((error) => {
        console.log('Error getting location', error);
        this.create()
      });
    
  }

  create = () => {
    this.http.post('http://144.217.91.75/todos/create', {...this.todo}, {Authorization: `Bearer ${this.token}`})
      .then(data => {
        //setTimeout(()=>{
          this.router.navigate(['/list', {
            userId: this.userId,
            token: this.token,
          }]);
          this.location.replaceState('/list');
        //})
      })
      .catch(error => {
        console.log("ocurrio un error al guardar el todo", error)
      });
  }

}
