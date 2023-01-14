import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsEventSliderImgComponent } from './add-news-event-slider-img.component';

describe('AddNewsEventSliderImgComponent', () => {
  let component: AddNewsEventSliderImgComponent;
  let fixture: ComponentFixture<AddNewsEventSliderImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewsEventSliderImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewsEventSliderImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
