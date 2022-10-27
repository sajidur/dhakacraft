import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { GlobalService } from '../global/global.service';


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {


  constructor(
    private http: HttpClient,
    public globalSrv: GlobalService
    ) {

    }


  contactUsUrl = `${this.globalSrv.domain}/api/contactus/contact`
  imgUploadUrl = `${this.globalSrv.domain}/api/Upload`
  newsEventSliderUrl = `${this.globalSrv.domain}/api/NewsContent`
  
  newsEventSliderList = new BehaviorSubject<any>(null);
  newsEventSliderListCast = this.newsEventSliderList.asObservable().pipe(filter((value) => !!value));

  //Post contact us form service
  postContactUs(body: any): Observable<any> {
    return this.http.post(this.contactUsUrl, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(()=>error);
      })
    );
  }

  //File upload
  uploadFile(file: any) {
    console.log('<======== File Upload Service Called========>');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.imgUploadUrl, formData)  .pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(()=>error);
      })
    );
  }

   // Post all news, event, slider img
   postNewsEventSliderImg(body: any): Observable<any> {
    return this.http.post(this.newsEventSliderUrl, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(()=>error);
      })
    );
    }

  // Get all news, event, slider img
  getAllNewsEventSliderImg(): Observable<any> {
    return this.http.get(this.newsEventSliderUrl).pipe(
      map((x: any) => {
        this.newsEventSliderList.next(x)
        return x
      }),
      catchError((error: Response) => {
        return throwError(()=>error);
      })
    );
  }


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
