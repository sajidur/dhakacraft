import { TestBed } from '@angular/core/testing';

import { MenuControllerService } from './menu-controller.service';

describe('MenuControllerService', () => {
  let service: MenuControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
