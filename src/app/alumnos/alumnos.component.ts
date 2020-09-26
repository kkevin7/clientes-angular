import { AlumnoService } from './alumno.service';
import { Component, OnInit } from '@angular/core';
import { Alumno } from './alumno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  alumnos: Alumno[];

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
     this.alumnoService.getAlumnos().subscribe(
       (alumnos) => this.alumnos = alumnos
     );
  }

  printPage() {
    window.print();
  }

  delete(alumno: Alumno): void{
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al alumno ${alumno.nombre} ${alumno.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deseo eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.delete(alumno.id).subscribe(
          response => {
            this.alumnos = this.alumnos.filter(cli => cli !== alumno );
            Swal.fire(
              'Eliminado!',
              'El registro fue eliminado con éxito.',
              'success'
            );
          }
        );

      }
    })
  }

}
