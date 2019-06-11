import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
function _window(): any {
  // return the global native browser window object
  return window;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const oauthScript = document.createElement('script');
    oauthScript.src = 'https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js';

    document.body.appendChild(oauthScript);
  }

  handleClick(e) {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    // Sign-up an account to get one
    _window().OAuth.initialize('91jGR__wIHvWGekerSGbNCgxuao');

    // Popup Github and ask for authorization
    _window().OAuth.popup('github').then((provider) => {

      // Prompts 'welcome' message with User's name on successful login
      // Check console logs for additional User info
      provider.me().then((data) => {
        console.log('data: ', data);
        alert('Welcome ' + data.name + '!');
      });

      // You can also call Github's API using .get()
      provider.get('/user').then((data) => {
        console.log('self data:', data);
      });
    });
  }
}
