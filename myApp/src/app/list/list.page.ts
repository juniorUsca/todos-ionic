import { Component, OnInit } from '@angular/core';
import { ItemSliding } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(
    private http: HTTP,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params
    if(!params.userId || !params.token) {
      this.router.navigate(['/']);
      return
    }
    
    this.userId = params.userId
    this.token = params.token

    console.log(this.userId)
    console.log(this.token)

    this.http.get('http://144.217.91.75/todos/', {}, {Authorization: `Bearer ${this.token}`})
      .then(data => {
        this.todos = JSON.parse(data.data)
        console.log(this.todos)
      })
      .catch(error => {
        console.log("ocurrio un error al traer los todos", error)
      });

  }

  userId: String
  token: String
  todos = []

  delete = (todo, slidingItem: ItemSliding) => {
    slidingItem.close();

    this.http.delete(`http://144.217.91.75/todos/${todo._id}`, {}, {Authorization: `Bearer ${this.token}`})
      .then(data => {
        this.http.get('http://144.217.91.75/todos/', {}, {Authorization: `Bearer ${this.token}`})
        .then(data => {
          this.todos = JSON.parse(data.data)
          console.log(this.todos)
        })
        .catch(error => {
          console.log("ocurrio un error al traer los todos", error)
        });
      })
      .catch(error => {
        console.log("ocurrio un error al eliminar el todo", error)
      });
  }

  open = (todo, slidingItem: ItemSliding) => {
    this.router.navigate(['/details', {
      todo: todo,
      token: this.token,
    }]);
  }

}
