import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Candidate } from './../../models/candidate';
import { Favourite } from '../../models/favourite';
import { Gender } from '../../models/gender';

import { CandidateInfoService } from '../../services/candidate-info.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
  @Input() candidate: Candidate;
  @Output() saveCandidateEvent = new EventEmitter<Candidate>();
  @Output() closeDialogEvent = new EventEmitter();

  selectedGender: Gender;
  genderList: Gender[] ;
  display: boolean;

  constructor(private candidateService: CandidateInfoService) { }

  ngOnInit() {
    this.genderList = [
      { code: 'M', name: 'Male'},
      { code: 'F', name: 'Female'}
    ];
    this.display = true;

    if ( this.candidate.id > 0 ) {
      const item: Gender = this.genderList.find( f => f.code === this.candidate.gender );
      this.selectedGender = item;
      console.log(this.genderList);
    } else {
      this.selectedGender = this.genderList[0];
    }
  }

  addFavourite() {
    this.candidate.favouriteCollection.push({ favKey: '', favValue: '' });
  }

  getDOB(event) {
    this.candidate.dob = event;
 }

  saveCandidateInfo() {
    this.candidate.gender = this.selectedGender.code;
    this.candidateService.saveCandidate(this.candidate).subscribe(
      data => {
        if (data.success) {
          this.display = false;
          this.candidate.id = data.id;
          this.saveCandidateEvent.emit(this.candidate);
        }
      }
    );
  }

  deleteFavourite(favourite: Favourite) {
    const favIndex = this.candidate.favouriteCollection.indexOf(favourite);
    if (favIndex >= 0) {
      this.candidate.favouriteCollection.splice(favIndex, 1);
    }
  }

  closeFormDialog() {
    this.display = false;
    this.closeDialogEvent.emit();
  }
}
