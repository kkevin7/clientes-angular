import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Alumno } from './alumno';
import {Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private urlEndPoint: string = 'http://localhost:8080/api/alumnos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Alumno[])
    );
  }

  create(cliente: Alumno) : Observable<any>{
    return this.http.post<Alumno>(this.urlEndPoint, cliente, {headers: this.httpHeaders} ).pipe(
      map((response: any) => response.cliente as Alumno),
      catchError(e => {
        this.router.navigate(['/alumnos']);
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error,
        });
        return throwError(e);
      })
    )
  }

  getAlumno(id): Observable<Alumno>{
    return this.http.get<Alumno>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/alumnos']);
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error,
        });
        return throwError(e);
      })
    );
  }

  update(cliente: Alumno): Observable<any>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Alumno),
      catchError(e => {
        this.router.navigate(['/alumnos']);
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error,
        });
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Alumno>{
    return this.http.delete<Alumno>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/alumnos']);
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.error.mensaje,
        });
        return throwError(e);
      })
    );
  }

}
