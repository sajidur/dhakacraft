import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristmasMenuComponent } from './christmas-menu.component';

describe('ChristmasMenuComponent', () => {
  let component: ChristmasMenuComponent;
  let fixture: ComponentFixture<ChristmasMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristmasMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristmasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
