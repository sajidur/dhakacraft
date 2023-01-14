import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  allCategory: any[] = [];
  constructor(private http: HttpClient, public globalSrv: GlobalService) {}

  editHomeMenu: any;
  editImgConfig: any;

  categoryUrl = `${this.globalSrv.domain}/api/Category`;
  contactUsUrl = `${this.globalSrv.domain}/api/ContactUs`;
  imgConfigUrl = `${this.globalSrv.domain}/api/ImageConfig`;
  pageContentUrl = `${this.globalSrv.domain}/api/PageContent`;
  newsEventSliderUrl = `${this.globalSrv.domain}/api/NewsContent`;
  productUrl = `${this.globalSrv.domain}/api/Product`;

  loginUrl = `${this.globalSrv.domain}/api/User`;

 

  productSearchUrl = `${this.globalSrv.domain}/api/Product/Search`;

  imgUploadUrl = `${this.globalSrv.domain}/api/Upload`;

  newsEventSliderList = new BehaviorSubject<any>(null);
  newsEventSliderListCast = this.newsEventSliderList
    .asObservable()
    .pipe(filter((value) => !!value));

  //Post contact us form service
  postContactUs(body: any): Observable<any> {
    return this.http.post(this.contactUsUrl, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  //File upload
  uploadFile(file: any) {
    console.log('<======== File Upload Service Called========>');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.imgUploadUrl, formData).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  // Post all news, event, slider img
  postNewsEventSliderImg(body: any): Observable<any> {
    return this.http.post(`${this.newsEventSliderUrl}`, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  // Get all news, event, slider img
  getAllNewsEventSliderImg(): Observable<any> {
    return this.http.get(`${this.newsEventSliderUrl}`).pipe(
      map((x: any) => {
        this.newsEventSliderList.next(x);
        return x;
      }),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  //Login
  login(body: any): Observable<any> {
    return this.http.post(this.loginUrl, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  //Delete By Id
  deleteNewsEventSliderById = (Id: any) => {
    return this.http
      .post(`${this.newsEventSliderUrl}/Delete?id=${Id}`, {})
      .pipe(
        map((x: any) => x),
        catchError((error: Response) => {
          return throwError(() => error);
        })
      );
  };

  //Add category
  postCategory = (body: any): Observable<any> => {
    return this.http.post(`${this.categoryUrl}/Save`, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  // Get all news, event, slider img
  getAllCategory(): Observable<any> {
    return this.http.get(`${this.categoryUrl}`).pipe(
      map((x: any) => {
        this.allCategory = x;
        return x;
      }),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  //Get all product
  getProductByCategoryId(Id: any): Observable<any> {
    return this.http.get(`${this.productUrl}/GetTopList?categoryId=${Id}`).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  //Add Product
  addProduct = (body: any): Observable<any> => {
    return this.http.post(`${this.productUrl}/Save`, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  //Save Img Product
  saveImgProduct = (body: any): Observable<any> => {
    return this.http.post(`${this.productUrl}/SaveProductImage`, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  //Get product by product Id
  getProductByProductId = (Id: any): Observable<any> => {
    return this.http
      .get(`${this.productUrl}/GetByProductId?productId=${Id}`)
      .pipe(
        map((x: any) => x),
        catchError((error: Response) => {
          return throwError(() => error);
        })
      );
  };

  //Delete product By Product Id
  deleteProductByProductId = (Id: any): Observable<any> => {
    // const body = {
    //   ProductId: Id,
    // };
    return this.http.post(`${this.productUrl}/ProductDelete?Id=${Id}`, {}).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  //Delete product By Product Id
  deleteProductImg = (Id: any): Observable<any> => {
    return this.http
      .post(`${this.productUrl}/ProductImageDelete?Id=${Id}`, {})
      .pipe(
        map((x: any) => x),
        catchError((error: Response) => {
          return throwError(() => error);
        })
      );
  };

  editProduct = (body: any, Id: any) => {
    body.Id = Id;
    return this.http.post(`${this.productUrl}/ProductEdit`, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  // Get Image Config
  getAllImageConfig(): Observable<any> {
    return this.http.get(`${this.imgConfigUrl}/GetAll`).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  //Delete product By Product Id
  deleteImgConfigById = (Id: any): Observable<any> => {
    return this.http.post(`${this.imgConfigUrl}/Delete?id=${Id}`, {}).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  postImgConfig = (body: any): Observable<any> => {
    return this.http.post(`${this.imgConfigUrl}/Post`, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  editImageConfig = (body: any, Id: any): Observable<any> => {
    body.Id = Id;
    return this.http.post(`${this.imgConfigUrl}/Edit`, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  searchProductByName(name: any): Observable<any> {
    return this.http.get(`${this.productSearchUrl}?search=${name}`).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  // Get All
  getAllPageContent(): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json"
    //     }),
    //   }
    return this.http.get(`${this.pageContentUrl}/GetAll`).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  //Delete By Id
  deletePageContentById = (Id: any): Observable<any> => {
    return this.http.post(`${this.pageContentUrl}/Delete?id=${Id}`, {}).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  postPageContent = (body: any): Observable<any> => {
    return this.http.post(`${this.pageContentUrl}/Post`, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };

  editPageContent = (body: any, Id: any): Observable<any> => {
    body.Id = Id;
    return this.http.post(`${this.pageContentUrl}/Edit`, body).pipe(
      map((x: any) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  };
}
