import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private sanitizer: DomSanitizer) { }

  public domain = 'http://dusdkushtia.rexsystemsbd.com/';

  imageUrlGet = (imageName: any) => {
    const url = `${this.domain}/Upload/${imageName}`
    return url
  }

  getEmbedYoutubeUrl = (url: any) => {
    // console.log(url)
    if(url.includes('watch?v=')) {
      const updateUrl = url.replace('watch?v=', "embed/");
      return updateUrl;
    }
  //  let updateUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
     return url
  }
  
}
