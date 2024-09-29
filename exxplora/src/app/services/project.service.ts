import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CreateProject } from '../interfaces/create-project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  createProject(projectInfo: any) : Observable<ApiResponse<CreateProject>> {
    return this.http.post<ApiResponse<CreateProject>>(environment.API_ENDPOINT + "project", projectInfo)
  }
}
