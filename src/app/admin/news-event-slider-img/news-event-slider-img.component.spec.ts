import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEventSliderImgComponent } from './news-event-slider-img.component';

describe('NewsEventSliderImgComponent', () => {
  let component: NewsEventSliderImgComponent;
  let fixture: ComponentFixture<NewsEventSliderImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsEventSliderImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsEventSliderImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
