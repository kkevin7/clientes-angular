import { ProfesorService } from './profesor.service';
import { Component, OnInit } from '@angular/core';
import { Profesor } from './profesor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  profesores: Profesor[];

  constructor(private profesorService: ProfesorService) { }

  ngOnInit(): void {
     this.profesorService.getProfesores().subscribe(
       (profesores) => this.profesores = profesores
     );
  }

  printPage() {
    window.print();
  }

  delete(profesor: Profesor): void{
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al profesor ${profesor.nombre} ${profesor.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deseo eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesorService.delete(profesor.id).subscribe(
          response => {
            this.profesores = this.profesores.filter(cli => cli !== profesor );
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
