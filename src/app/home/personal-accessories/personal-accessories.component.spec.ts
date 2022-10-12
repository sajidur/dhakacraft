import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAccessoriesComponent } from './personal-accessories.component';

describe('PersonalAccessoriesComponent', () => {
  let component: PersonalAccessoriesComponent;
  let fixture: ComponentFixture<PersonalAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAccessoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
