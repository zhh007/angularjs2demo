import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observer, Observable } from "rxjs/Rx";

import { PRModel } from './model/pr.model'
import { PRListResponse } from './model/prlistresponse.model'
import { GetSupplierResponse } from './model/getsupplierresponse.model'

@Injectable()
export class PRService {
  private observer: Observer<boolean>;
  private _baseURL: string = "http://localhost:55970/api/PR/";

  constructor(private _http: Http) {

  }

  list(pageindex: number, pagesize: number): Observable<PRListResponse> {
    var url = this._baseURL + "List";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var d = {
      PageIndex: pageindex,
      PageSize: pagesize
    }
    var content = JSON.stringify(d);

    return this._http.post(url, content, options)
      .map(resp => {
        let result = resp.json();
        return result;
      })
      ._catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getsupplier(): Observable<GetSupplierResponse> {
    var url = this._baseURL + 'GetSupplierList';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var content = null;
    return this._http.post(url, content, options)
      .map(resp => {
        let result = resp.json();
        return result;
      })
      ._catch((error: any) => Observable.throw(error || 'Server error'));
  }

  save(pr: PRModel) {
    var url = this._baseURL + "Add";
    if(pr.ID > 0){
      url = this._baseURL + "Update";
    }

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var content = JSON.stringify(pr);

    return this._http.post(url, content, options);
  }

  get(id: number): Observable<PRModel> {
    var url = this._baseURL + "Get";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var d = {
      ID: id
    }
    var content = JSON.stringify(d);
    return this._http.post(url, content, options)
      .map(resp => {
        let result = resp.json();
        return result.data;
      })
      ._catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
