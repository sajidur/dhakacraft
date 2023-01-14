import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImgConfigComponent } from './add-img-config.component';

describe('AddImgConfigComponent', () => {
  let component: AddImgConfigComponent;
  let fixture: ComponentFixture<AddImgConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImgConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImgConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
