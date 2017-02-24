import { Injectable } from '@angular/core';
import {Http, Headers, URLSearchParams,RequestOptions} from "@angular/http";
import 'rxjs/Rx';
import {Observer, Observable} from "rxjs/Rx";

import {PRListRsponse} from "./prlistresponse"

@Injectable()
export class PRService {
    private _baseURL: string="http://localhost:23273/api/PR/";
    constructor(private _http: Http) {
        
    }

    
    list(pageindex : number) : Observable<PRListRsponse>{
        var url = this._baseURL + "List";

let headers = new Headers({ 'Content-Type': 'application/json'});
let options = new RequestOptions({ headers: headers });

//params.toString()
var d = {
      PageIndex: pageindex,
      PageSize: 10
    }
var content = JSON.stringify(d);

//     let options = new RequestOptionsArgs({
//     headers: headers,
//     //search: params
//     body: content
// });

url = 'http://localhost:20057/home/list';
        return this._http.post(url,content,options).map(responce => responce.json());
    }

    // private extractData(res: PRListRsponse) {
    //     let body = res.json();
    //     return body.data || { };
    // }
}