import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any;
  private env: string;

  constructor(private _http: HttpClient) { }
  load() {
    return new Promise((resolve, reject) => {
     if (environment.state === 'production') {
        this.env = 'production';
      } else { this.env = 'local'; }
      this._http.get('./assets/config/' + this.env + '.json')
        .pipe(map((response: any) => response.json()))
        .subscribe((data) => {
            this.config = data;
            resolve(true);
          },
          (error: any) => {
            console.error(error);
            // return Observable.throw(error.json().error || 'Server error');
          });
    });
  }

  // Gets API route based on the provided key
  getApi(key: string): string {
    return this.config['API_ENDPOINTS'][key];
  }
  // Gets a value of specified property in the configuration file
  get(key: any) {
    return this.config[key];
  }

}

export function ConfigFactory(config: ConfigService) {
  return () => config.load();
}

export function init() {
  return {
    provide: APP_INITIALIZER,
    useFactory: ConfigFactory,
    deps: [ConfigService],
    multi: true
  };
}

const ConfigModule = {
  init: init
};

export { ConfigModule };

