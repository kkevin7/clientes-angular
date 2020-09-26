import { AlumnoService } from '../alumnos/alumno.service';
import { GradoService } from '../alumnos/grado.service';
import { Component, OnInit } from '@angular/core';
import { Alumno } from '../alumnos/alumno';
import { Grado } from '../alumnos/grado';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {


  alumno: Alumno = new Alumno();
  grados: Grado[];
  gradoSelected: Grado[];
  titulo: string = "Crear Alumno";

  constructor(
    private alumnoService: AlumnoService,
    private gradoService: GradoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.cargarAlumno();

    this.gradoService.getGrados().subscribe(
      (grados) => this.grados = grados
    );
  }

  capturar(): void{
    this.alumno.grado = this.grados.find(grado => grado.id === Number(this.gradoSelected));
  }

  printPage() {
    window.print();
  }

  cargarAlumno(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.alumnoService.getAlumno(id).subscribe(
          (alumno) => {
            this.alumno = alumno;
            this.gradoSelected = alumno.grado;
          }
        )
      }
    })
  }

  create(): void {
    this.alumnoService.create(this.alumno).subscribe(
      alumno => {
        this.router.navigate(['/alumnos']);
        Swal.fire({
          title: 'Nuevo Alumno',
          text: `Alumno ${alumno.nombre} creado con éxito!`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  update(): void{
    this.alumnoService.update(this.alumno).subscribe(
      alumno => {
        this.router.navigate(['/alumnos']);
        Swal.fire({
          title: 'Actaulizado Alumno',
          text: `Alumno ${alumno.nombre} actualizado con éxito!`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }
    )
  }

}
