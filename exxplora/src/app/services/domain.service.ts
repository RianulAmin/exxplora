import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Domain } from '../interfaces/domain';
import { ProjectInfo } from '../interfaces/project-info';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(private http: HttpClient) { }


  getAllDomains() : Observable<ApiResponse<Domain[]>> {
    return this.http.get<ApiResponse<Domain[]>>(environment.API_ENDPOINT + "domain")
  }

  getProjectsByDomainId(id: number) : Observable<ApiResponse<ProjectInfo[]>> {
    return this.http.get<ApiResponse<ProjectInfo[]>>(environment.API_ENDPOINT + "domain/" + id)
  }

}
