import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenMenuComponent } from './garden-menu.component';

describe('GardenMenuComponent', () => {
  let component: GardenMenuComponent;
  let fixture: ComponentFixture<GardenMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
