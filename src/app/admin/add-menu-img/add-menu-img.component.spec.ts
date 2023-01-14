import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuImgComponent } from './add-menu-img.component';

describe('AddMenuImgComponent', () => {
  let component: AddMenuImgComponent;
  let fixture: ComponentFixture<AddMenuImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMenuImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
