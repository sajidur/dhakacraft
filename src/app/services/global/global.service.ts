import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  public domain = 'https://dhakacraftapi.rexsystemsbd.com';

  imageUrlGet = (imageName: any) => {
    const url = `${this.domain}/Upload/${imageName}`
    return url
  }
  
}
