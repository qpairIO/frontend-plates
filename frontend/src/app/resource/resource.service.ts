import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
//import {Resource, ResourceWithoutId, ResourceString} from '@tsmean/shared';
import {Resource, ResourceWithoutId} from '@tsmean/shared';
import {Project} from '../organization/project.model';
import {ApiUrl} from './api-url-injection-token';
import {catchError, map, share} from 'rxjs/operators';

@Injectable()
export class ResourceService {
  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) {
  }

  /**
   * Url to web api, appended with resource name
   * yields e.g http://myserver/api/v1/users
   */
  resourcesUrl(resourceName: string, customAPI?:string) {
    if(customAPI){
      return customAPI + '/' + resourceName;
    }else{
      return this.apiUrl + '/' + resourceName;
    }
  }

  postModel(url:string, params:any){
    const $data = this.http
      .post(url, params)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  updateModel(url:string, params:any){
    const $data = this.http
      .put(url, params)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  // removeModel(url:string){
  //   const $data = this.http
  //     .delete(url)
  //     .pipe(
  //       map((resp: any) => resp),
  //       share()
  //     );
  //   return $data.pipe(
  //     catchError(this.handleError)
  //   );
  // }

  removeModel(url:string){
    const $data = this.http
      .delete(url)
      .pipe(
        map((resp: any) => resp.data),
        share()
      );

    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getModel(url:string){
    const $data = this.http
      .get(url)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getFile(url:string){
    const $data = this.http
      .get(url , {responseType : 'text'})
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getResources(resourceName: string, customAPI?: string): Observable<Resource[]> {
    const $data = this.http
      .get(this.resourcesUrl(resourceName, customAPI))
      .pipe(
        map((resp: any) => resp.data),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getResource(resourceId: number, resourceName: string, customAPI?: string): Observable<Resource> {
    const $data = this.http
      .get(this.resourcesUrl(resourceName, customAPI) + '/' + resourceId)
      .pipe(
        map((resp: any) => resp.data),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getProject(resourceId: string, resourceName: string, customAPI?: string): Observable<Project> {
    const $data = this.http
      .get(this.resourcesUrl(resourceName, customAPI) + '/' + resourceId+ '/tests')
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getLogs(resourceId: string, resourceName: string, customAPI?: string): Observable<Project> {
    const $data = this.http
      .get(this.resourcesUrl(resourceName, customAPI) + resourceId)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getInstance(gridName: string, resourceName: string, customAPI?: string): Observable<Project> {
    const $data = this.http
      .get(this.resourcesUrl(resourceName, customAPI) + gridName)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getGrids(resourceId: string, resourceName: string, customAPI?: string): Observable<Project> {
    const $data = this.http
      .get(this.resourcesUrl(resourceName, customAPI) + '/' + resourceId+ '/grids')
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  createProject(params:any, resourceName: string, customAPI?: string): Observable<Project[]> {
    const $data = this.http
      .post(this.resourcesUrl(resourceName, customAPI), params)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  runTestParams(params:any, customAPI: string): Observable<Project> {
    const $data = this.http
      .post(customAPI, params)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  saveTestConfig(params:any, resourceName: string, customAPI?: string): Observable<Project> {
    const $data = this.http
      .post(this.resourcesUrl(resourceName, customAPI), params)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  createGrid(params:any, resourceName: string, customAPI?: string): Observable<Project[]> {
    const $data = this.http
      .post(this.resourcesUrl(resourceName, customAPI), params)
      .pipe(
        map((resp: any) => resp),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  getResourcesByPost(params:any, resourceName: string, customAPI?: string): Observable<Project[]> {
    const $data = this.http
      .post(this.resourcesUrl(resourceName, customAPI), params)
      .pipe(
        map((resp: any) => resp['body-json'].data),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  createResource(newResource: ResourceWithoutId, resourceName: string, customAPI?: string): Observable<Resource> {
    const $data = this.http
      .post(this.resourcesUrl(resourceName, customAPI), newResource)
      .pipe(
        map((resp: any) => resp.data),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  updateResource(resource: Resource, resourceName: string, customAPI?: string): Observable<Resource> {
    const $data = this.http
      .put(this.resourcesUrl(resourceName, customAPI), resource)
      .pipe(
        map((resp: any) => resp.data),
        share()
      );
    return $data.pipe(
      catchError(this.handleError)
    );
  }

  // TODO: what do you get back?
  deleteResource(resourceId: number, resourceName: string, customAPI?: string): Observable<void> {
    const $data = this.http
      .delete(this.resourcesUrl(resourceName, customAPI) + '/' + resourceId)
      .pipe(
        map((resp: any) => resp.data),
        share()
      );

    return $data.pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
