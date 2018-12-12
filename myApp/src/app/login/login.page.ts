import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: String
  password: String

  constructor(
    private http: HTTP,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  login = () => {
    console.log(this.email, this.password)

    this.http.post('http://144.217.91.75/users/authenticate',{
      email: this.email,
      password: this.password,
    }, {})
      .then(data => {
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        this.router.navigate(['/list', {
          userId: JSON.parse(data.data)._id,
          token: JSON.parse(data.data).token,
        }]);

      })
      .catch(error => {
        console.log("mal")
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

}
