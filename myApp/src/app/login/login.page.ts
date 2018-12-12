import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: String
  password: String

  constructor(private http: HTTP) { }

  ngOnInit() {
  }

  login = () => {
    console.log(this.email, this.password)

    this.http.post('http://192.168.99.100/users/authenticate',{
      email: this.email,
      password: this.password,
    }, {})
      .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

}
