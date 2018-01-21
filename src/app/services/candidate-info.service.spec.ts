import { TestBed, inject } from '@angular/core/testing';

import { CandidateInfoService } from './candidate-info.service';

describe('CandidateInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateInfoService]
    });
  });

  it('should be created', inject([CandidateInfoService], (service: CandidateInfoService) => {
    expect(service).toBeTruthy();
  }));
});
