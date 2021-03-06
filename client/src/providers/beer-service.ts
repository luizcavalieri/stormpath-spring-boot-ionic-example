import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { StormpathConfiguration } from 'angular-stormpath';

@Injectable()
export class BeerService {
  public API;
  public BEER_API;

  constructor(public http: Http, public config: StormpathConfiguration) {
    this.API = config.endpointPrefix;
    this.BEER_API = this.API + '/beers';
  }

  getGoodBeers(): Observable<any> {
    return this.http.get(this.API + '/good-beers')
      .map((response: Response) => response.json());
  }

  get(id: string) {
    return this.http.get(this.BEER_API + '/' + id)
      .map((response: Response) => response.json());
  }

  remove(id: string) {
    return this.http.delete(this.BEER_API + '/' + id)
      .map((response: Response) => response.json());
  }

  save(beer: any): Observable<any> {
    let result: Observable<Response>;
    if (beer['href']) {
      result = this.http.put(beer.href, beer);
    } else {
      result = this.http.post(this.BEER_API, beer)
    }
    return result.map((response: Response) => response.json())
      .catch(error => Observable.throw(error));
  }
}
