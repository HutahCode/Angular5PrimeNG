import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidate } from '../models/candidate';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class CandidateInfoService {

  webApiUri: string = 'http://localhost:56708/api/Candidate';

  constructor(private http: HttpClient) { }

  getAllCandidates() {
    return this.http.get<Candidate[]>(this.webApiUri);
  }

  saveCandidate(candidate: Candidate) {
    const body = JSON.stringify(candidate);
    return this.http.post<any>(this.webApiUri, body, httpOptions);
  }

  deleteCandiate(id: number) {
    return this.http.delete<any>(this.webApiUri + '/' + id);
  }
}
