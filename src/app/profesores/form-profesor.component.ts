import { ProfesorService } from './profesor.service';
import { GradoService } from './grado.service';
import { Component, OnInit } from '@angular/core';
import { Profesor } from './profesor';
import { Grado } from './grado';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-profesor',
  templateUrl: './form-profesor.component.html',
  styleUrls: ['./form-profesor.component.css']
})
export class FormProfesorComponent implements OnInit {

  profesor: Profesor = new Profesor();
  titulo: string = "Crear Profesor";
  grados: Grado[];
  gradoSelected: Grado[];

  constructor(
    private profesorService: ProfesorService,
    private gradoService: GradoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.cargarProfesor();
    this.gradoService.getGrados().subscribe(
      (grados) => this.grados = grados
    );
  }

  capturar(): void{
    this.profesor.grado = this.grados.find(grado => grado.id === Number(this.gradoSelected));
  }

  cargarProfesor(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.profesorService.getProfesor(id).subscribe(
          (profesor) => {
            this.profesor = profesor
            this.gradoSelected = profesor.grado;
            console.log(profesor.grado);
          }
        )
      }
    })
  }

  create(): void {
    this.profesorService.create(this.profesor).subscribe(
      profesor => {
        this.router.navigate(['/profesores']);
        Swal.fire({
          title: 'Nuevo Profesor',
          text: `Profesor ${profesor.nombre} creado con éxito!`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  update(): void{
    this.profesorService.update(this.profesor).subscribe(
      profesor => {
        this.router.navigate(['/profesores']);
        Swal.fire({
          title: 'Actaulizado Profesor',
          text: `Profesor ${profesor.nombre} actualizado con éxito!`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }
    )
  }

}
