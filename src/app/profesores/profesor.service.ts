import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Profesor } from './profesor';
import {Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private urlEndPoint: string = 'http://localhost:8080/api/profesores';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Profesor[])
    );
  }

  create(profesor: Profesor) : Observable<any>{
    return this.http.post<Profesor>(this.urlEndPoint, profesor, {headers: this.httpHeaders} ).pipe(
      map((response: any) => response.profesor as Profesor),
      catchError(e => {
        this.router.navigate(['/profesores']);
        console.log(e.error.mensaje);
        // Swal.fire({
        //   icon: 'error',
        //   title: e.error.mensaje,
        //   text: e.error.error,
        // });
        return throwError(e);
      })
    )
  }

  getProfesor(id): Observable<Profesor>{
    return this.http.get<Profesor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/profesores']);
        console.log(e.error.mensaje);
        // Swal.fire({
        //   icon: 'error',
        //   title: e.error.mensaje,
        //   text: e.error.error,
        // });
        return throwError(e);
      })
    );
  }

  update(profesor: Profesor): Observable<any>{
    return this.http.put(`${this.urlEndPoint}/${profesor.id}`, profesor, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.profesor as Profesor),
      catchError(e => {
        this.router.navigate(['/profesores']);
        console.log(e.error.mensaje);
        // Swal.fire({
        //   icon: 'error',
        //   title: e.error.mensaje,
        //   text: e.error.error,
        // });
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Profesor>{
    return this.http.delete<Profesor>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/profesores']);
        console.log(e.error.mensaje);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: e.error.mensaje,
        // });
        return throwError(e);
      })
    );
  }

}
