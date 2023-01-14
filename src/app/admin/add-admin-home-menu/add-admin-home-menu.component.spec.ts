import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminHomeMenuComponent } from './add-admin-home-menu.component';

describe('AddAdminHomeMenuComponent', () => {
  let component: AddAdminHomeMenuComponent;
  let fixture: ComponentFixture<AddAdminHomeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminHomeMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminHomeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
