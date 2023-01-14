import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductImgComponent } from './add-product-img.component';

describe('AddProductImgComponent', () => {
  let component: AddProductImgComponent;
  let fixture: ComponentFixture<AddProductImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
