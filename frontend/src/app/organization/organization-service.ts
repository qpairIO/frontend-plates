import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, share} from 'rxjs/operators';

import {Project} from './project.model';
import {ResourceService} from '../resource/resource.service';

@Injectable()
export class OrganizationService {
  public organizationId:any;
  public apiUrl:any;

  constructor(private resourceService: ResourceService, private http: HttpClient) {
    this.organizationId = {organizationId: '6f5d4e52-a766-44b4-a476-cf95629ba138'};
    this.apiUrl = "http://r3bjmf68ra.execute-api.us-east-1.amazonaws.com/";
  }
  private get resourceName(): string {
    return `project-data-by-event`;
  }

  private get projectAPI(): string {
    return `https://t5rtz6drn4.execute-api.us-east-1.amazonaws.com/dev`;
  }

  get(url:string){
    return this.resourceService.getModel(this.apiUrl + url);
  }

  getFile(url:string){
    return this.resourceService.getFile(this.apiUrl + url);
  }

  remove(url:string){
    return this.resourceService.removeModel(this.apiUrl + url);
  }

  create(url, params){
    return this.resourceService.postModel(this.apiUrl + url, params);
  }

  update(url, params){
    return this.resourceService.updateModel(this.apiUrl + url, params);
  }

  getProjects(url:string){
    return this.resourceService.getModel(this.apiUrl + url);
  }

  getTests(url:string){
    return this.resourceService.getModel(this.apiUrl + url);
  }

  getTest(url:string){
    return this.resourceService.getModel(this.apiUrl + url);
  }

  getProject(projectId:any): Observable<Project> {
    return this.resourceService.getProject(projectId , 'projects', 'http://localhost:1337/api/v1');
  }

  getOrganization(url){
    return this.resourceService.getModel(this.apiUrl + url);
  }

  getOrg(projectId:any): Observable<Project> {
    return this.resourceService.getProject(projectId , 'projects', 'http://localhost:1337/api/v1');
  }

  getGrids(projectId:any): Observable<Project> {
    return this.resourceService.getGrids(projectId , 'projects', 'http://localhost:1337/api/v1');
  }

  createProject(url, params){
    return this.resourceService.postModel(this.apiUrl + url, params);
  }

  saveTestConfig(params): Observable<Project> {
    return this.resourceService.saveTestConfig(params , 'saveTestConfig', 'http://35.173.21.206:8080/api/v0');
  }

  runTestParams(params): Observable<Project> {
    return this.resourceService.runTestParams(params , 'http://35.173.21.206:8080/api/v0');
  }  

  createGrid(params): Observable<Project[]> {
    return this.resourceService.createGrid(params , 'addParentGrid', 'http://35.173.21.206:8080/api/v0');
  }

  
  getInstance(gridName:any): Observable<Project> {
    return this.resourceService.getInstance(gridName , 'getInstance/' , 'http://nodeapi.deploybytes.com/api/v0');
    //return this.resourceService.getInstance(gridName , 'getInstance' + '?gridname=', 'http://nodeapi.deploybytes.com/api/v0');
  }

  getLogs(isTestResults, params): Observable<Project> {
    if(isTestResults){
      return this.resourceService.getLogs(params , '', 'https://s3.amazonaws.com/loadswarmjmx');
    }else{
      return this.resourceService.getLogs(params , '', 'http://nodeapi.deploybytes.com/api/v0/getGridPodLogs');
    }
  }

  createOrgByUser(userId, data): Observable<any>{
    const $data = this.http
      .post(this.apiUrl + ['users', userId, 'organizations'].join('/'), data)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  // createAnimalList(animal: AnimalListWithoutId): Observable<AnimalList> {
  //   return this.resourceService.createResource(animal, this.resourceName);
  // }

  // deleteAnimalList(animalListId: number): Observable<void> {
  //   return this.resourceService.deleteResource(animalListId, this.resourceName);
  // }

  // updateAnimalList(animal: AnimalList): Observable<AnimalList> {
  //   return this.resourceService.updateResource(animal, this.resourceName);
  // }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
