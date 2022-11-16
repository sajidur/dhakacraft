import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private sanitizer: DomSanitizer) { }

  public domain = 'https://dhakacraftapi.rexsystemsbd.com';

  imageUrlGet = (imageName: any) => {
    const url = `${this.domain}/Upload/${imageName}`
    return url
  }

  getEmbedYoutubeUrl = (url: any) => {
    console.log(url)
    let updateUrl = ''
    if(url.includes('watch?v=')) {
      updateUrl = url.replace('watch?v=', "embed/");
    }
  //  let updateUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
     return updateUrl
  }
  
}
