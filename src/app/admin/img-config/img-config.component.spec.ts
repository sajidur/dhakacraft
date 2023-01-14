import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgConfigComponent } from './img-config.component';

describe('ImgConfigComponent', () => {
  let component: ImgConfigComponent;
  let fixture: ComponentFixture<img loading="lazy"ConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
