import { TestBed, inject } from '@angular/core/testing';

import { PageInfoService } from './page-info.service';

describe('PageInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageInfoService]
    });
  });

  it('should be created', inject([PageInfoService], (service: PageInfoService) => {
    expect(service).toBeTruthy();
  }));
});
