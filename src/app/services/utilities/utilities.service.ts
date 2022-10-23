import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  contactUsUrl = `https://dhakacraftapi.rexsystemsbd.com/api/contactus/contact`

  constructor(
    private http: HttpClient
    ) {

  }

  postContactUs(body: any): Observable<any> {
    return this.http.post(this.contactUsUrl, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(()=>error);
      })
    );
  }


  // getAllImages(): Observable<any> {
  //   return this.http.get(this.assetAPI + '/all').pipe(
  //     map((x: Response) => x),
  //     map((x: any) => x),
  //     catchError((error: Response) => {
  //       return throwError(error);
  //     })
  //   );
  // }

  // getAssetById(id) {
  //   return this.http.get(this.assetAPI + '/' + id).pipe(
  //     map((x: Response) => x),
  //     map((x: any) => x),
  //     catchError((error: Response) => {
  //       return throwError(error);
  //     })
  //   );
  // }


}
