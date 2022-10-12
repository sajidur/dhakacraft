import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuControllerService {

  ourStoryMenuItem: any;
  homeMenuItem: any;
  personalMenuItem: any


  constructor(private http: HttpClient) { }
}
