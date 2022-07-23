import { TestBed } from '@angular/core/testing';

import { QuoteServicesService } from './quote-services.service';

describe('QuoteServicesService', () => {
  let service: QuoteServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
