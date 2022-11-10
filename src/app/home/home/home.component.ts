import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ContactFromComponent } from 'src/app/contact-from/contact-from.component';
import { GlobalService } from 'src/app/services/global/global.service';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
const FileSaver = require('file-saver');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  currentYear: number;
  private subscriptions: Array<Subscription> = [];
  newsEventSlideList: any[] = [];
  topBarList: any[] = [];
  topBarObj: any;
  categoryList: any[] = [];
  homeCategory: any[] = [];
  gardenCategory: any[] = [];
  personalCategory: any[] = [];
  christmasCategory: any[] = [];
  imgConfigList: any[] = [];
  requestCatalog: any[] = [];
  requestCatalogObj: any = {};
  searchedProduct: any[] = [];
  searchFieldValue: any;
  pageContent: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public menuControllerSrv: MenuControllerService,
    public dialog: MatDialog,
    private viewportScroller: ViewportScroller,
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService
  ) {}

  ngOnInit() {
    this.formHandler();
    this.stickyChatButton();
    this.currentYear = new Date().getFullYear();
    this.getAllNewsEventSlider();
    this.getAllCategory();
    this.getAllImageConfig();
    this.getAllPageContent()
  }

  formHandler = () => {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  };

  // Get all news, event, slider list
  getAllNewsEventSlider = () => {
    this.spinner.show();
    this.utilitiesSrv.getAllNewsEventSliderImg().subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('newsEventSliderListRes', result);
        this.newsEventSlideList = result;
        if (this.newsEventSlideList?.length) {
          this.topBarList = this.newsEventSlideList.filter(
            (e) => e.Type === 'Topbar'
          );
          if (this.topBarList?.length) {
            this.topBarObj = this.topBarList[this.topBarList.length - 1];
          }
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('newsEventSliderListErr', err);
      },
    });
  };

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  getAllCategory = () => {
    // this.spinner.show();
    this.utilitiesSrv.getAllCategory().subscribe({
      next: (result) => {
        // this.spinner.hide();
        console.log('categoryListRes', result);
        if (result && result?.length) {
          this.categoryList = result;
          this.homeCategory = this.categoryList.filter((e) => e.MenuId === 1);
          this.gardenCategory = this.categoryList.filter((e) => e.MenuId === 2);
          this.personalCategory = this.categoryList.filter(
            (e) => e.MenuId === 3
          );
          this.christmasCategory = this.categoryList.filter(
            (e) => e.MenuId === 4
          );
        }
      },
      error: (err) => {
        // this.spinner.hide();
        console.log('categoryListErr', err);
      },
    });
  };

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  mouseOver = (dropdownContent: any) => {
    // console.log('over')
    $('.' + dropdownContent).css('display', 'block');
  };
  mouseOut = (dropdownContent: any) => {
    // console.log('out')
    $('.' + dropdownContent).css('display', 'none');
  };

  ourStoryItem = (item: any, scrollToRequiredId: any) => {
    $('.dropdown-content1').css('display', 'none');
    this.menuControllerSrv.ourStoryMenuItem = item;
    //  this.router.navigate(['our-story']);
    // this.router.navigate(['our-story']).then(() => {
    //   if (scrollToRequiredId) {
    //     setTimeout(() => {
    //       this.viewportScroller.scrollToAnchor('our-story');
    //     }, 1000);
    //   }
    // });
    // ('');
    this.router.navigateByUrl(`our-story?Id=${item?.Id}`);
      if (scrollToRequiredId) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor('our-story');
        }, 2000);
      }
  };

  homeMenuItem = (categoryId: any) => {
    $('.dropdown-content2').css('display', 'none');
    // this.menuControllerSrv.homeMenuItem = item
    this.router.navigateByUrl(`home?categoryId=${categoryId}`);
  };

  gardenMenu = (item: any) => {
    $('.dropdown-content3').css('display', 'none');
    this.menuControllerSrv.gardenMenuItem = item;
    this.router.navigate(['garden']);
  };

  personalItem = (item: any) => {
    $('.dropdown-content4').css('display', 'none');
    this.menuControllerSrv.personalMenuItem = item;
    this.router.navigate(['personal-accessories']);
  };

  christmasItem = (item: any) => {
    $('.dropdown-content5').css('display', 'none');
    this.menuControllerSrv.christmasMenuItem = item;
    this.router.navigate(['christmas']);
  };

  downloadAnnualReportPdf = () => {
    const pdfUrl = '../../../assets/pdf/AnnualReport.pdf';
    const pdfName = 'DhakaHandiCraftAnnualReport';
    FileSaver.saveAs(pdfUrl, pdfName);
  };

  goToContactUs = (id: any) => {
    let scrollHere: any;
    scrollHere = document.getElementById(id);
    let rect = scrollHere.getBoundingClientRect().top;
    window.scrollTo({
      top: rect,
      behavior: 'smooth',
    });
  };

  stickyChatButton = () => {
    $(window).on('scroll', function () {
      const scroll: any = $(window).scrollTop();
      if (scroll < 150) {
        $('#float-message-btn').css('display', 'none');
        // $('#sticky-header').removeClass('sticky');
        // $('#back-top').fadeIn(500);
      } else {
        $('#float-message-btn').css('display', 'block');
        // $('#sticky-header').addClass('sticky');
        // $('#back-top').fadeIn(500);
      }
    });
  };

  handleContactForm = (data: any) => {
    const dialogRef = this.dialog.open(ContactFromComponent, {
      disableClose: true,
      width: '50%',
      height: '85%',
      maxWidth: '90vw',
      data: data,
    });
  };

  goToNewsAndEventDetails = (Id: any) => {
    this.router.navigateByUrl('news-event?Id=' + Id);
  };

  closeLeaveMessage() {
    $('#leave-message').css('display', 'none');
    $('#float-message-btn').css('display', 'block');
  }

  // Open message send dialog modal
  openLeaveMessagePopup() {
    $('#float-message-btn').css('display', 'none');
    $('#leave-message').css('display', 'block');
  }

  getAllImageConfig = () => {
    // this.spinner.show();
    this.utilitiesSrv.getAllImageConfig().subscribe({
      next: (result) => {
        // this.spinner.hide();
        console.log('imgConfigListRes', result);
        if (result.length) {
          this.imgConfigList = result;
          this.requestCatalog = this.imgConfigList.filter(
            (e) => e.ImagePosition === 'Request Catalog'
          );
          if (this.requestCatalog.length) {
            this.requestCatalogObj =
              this.requestCatalog[this.requestCatalog.length - 1];
          }
        }
      },
      error: (err) => {
        // this.spinner.hide();
        console.log('imgConfigListErr', err);
      },
    });
  };

  searchBoxChanged = (e: any) => {
    console.log(e?.target?.value);
    let searchName = e?.target?.value;
    if (
      searchName === '' ||
      searchName === null ||
      searchName === undefined ||
      searchName?.length <= 2
    ) {
      this.searchedProduct = []
      return;
    }
    this.searchProductByName(searchName)
  };

  searchProductByName = (name: any) => {
    this.utilitiesSrv.searchProductByName(name).subscribe({
      next: (result) => {
        // this.spinner.hide();
        console.log('searchRes', result);
        this.searchedProduct = []
        if (result?.length) {
           this.searchedProduct = result
        }
      },
      error: (err) => {
        // this.spinner.hide();
        this.searchedProduct = []
        console.log('searchErr', err);
      },
    });
  }

  clearSearchField = () => {
    this.searchFieldValue = '';
    this.searchedProduct = [];
  }
  handleSearchBtn = () => {
    this.searchProductByName(this.searchFieldValue)
  }

  productDetails = (Id: any) => {
    this.searchedProduct = [];
    this.searchFieldValue = '';
    this.router.navigateByUrl(`details?productId=${Id}`);
  };



 getAllPageContent = () => {
   this.spinner.show();
   this.utilitiesSrv.getAllPageContent().subscribe({
     next: (result) => {
       this.spinner.hide();
       console.log('pageListRes', result);
       if(result) {
         this.pageContent = result.filter((e:any) => e.PageName !== 'Who We Are');
       }
     },
     error: (err) => {
       this.spinner.hide();
       console.log('pageListErr', err);
     },
   });
 }

}
