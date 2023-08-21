import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleInput } from './model/SingleInput';
import { BulkInput } from './model/BulkInput';

const BASE_URL = "http://localhost:5000/"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  predictOne(singleInput: SingleInput){
    let url = BASE_URL + "predict";
    return this.http.post(url, singleInput);
  }

  predictAll(bulkInput: BulkInput){
    let url = BASE_URL + "predictAll";
    return this.http.post(url, bulkInput);
  }
}
