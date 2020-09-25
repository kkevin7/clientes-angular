import { ClienteService } from './cliente.service';
import { CLIENTES } from './clientes.json';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
     this.clienteService.getClientes().subscribe(
       (clientes) => this.clientes = clientes
     );
  }

  printPage() {
    window.print();
  }

  delete(cliente: Cliente): void{
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deseo eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente );
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
