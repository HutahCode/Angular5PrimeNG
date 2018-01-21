import { Component, OnInit } from '@angular/core';

import { Candidate } from './../../models/candidate';

import { CandidateInfoService } from './../../services/candidate-info.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidateList: Candidate[];
  candidate: Candidate;

  constructor(private candidateService: CandidateInfoService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllCandidates();
  }

  getAllCandidates() {
    this.candidateService.getAllCandidates().subscribe(
      data => {
          this.candidateList = data;
      }
    );
  }

  selectCandidate(candidate: Candidate) {
    this.candidate = Object.assign({}, candidate);
  }

  addNewCandidate() {
    this.candidate = new Candidate();
    this.candidate.favouriteCollection = [];
  }

  saveCandidate(candidate: Candidate) {
      const candidateFilterdList = this.candidateList.filter(c => c.id === candidate.id);
      console.log(candidateFilterdList);
      if ( candidateFilterdList.length === 0) {
        this.candidateList.push(candidate);
      } else {
         candidateFilterdList[0].id = candidate.id;
         candidateFilterdList[0].name = candidate.name;
         candidateFilterdList[0].dob = candidate.dob;
         candidateFilterdList[0].gender = candidate.gender;
         candidateFilterdList[0].favouriteCollection = candidate.favouriteCollection;
      }
      this.candidate = null;
  }

  deleteCandidate(candidate: Candidate) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove candidate?',
      accept: () => {
          this.candidateService.deleteCandiate(candidate.id).subscribe(
            data => {
                if (data.success) {
                    this.candidateList = this.candidateList.filter(c => c !== candidate);
                }
            }
        );
      }
    });
  }

  closeDialogForm() {
    this.candidate = null;
  }

}
