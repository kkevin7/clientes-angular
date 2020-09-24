import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'José',
      apellido: 'Pérez',
      email: 'jose.perez@gmail.com',
      createAt: '2020-09-24'
    },
    {
      id: 2,
      nombre: 'José',
      apellido: 'Pérez',
      email: 'jose.perez@gmail.com',
      createAt: '2020-09-24'
    },
    {
      id: 3,
      nombre: 'José',
      apellido: 'Pérez',
      email: 'jose.perez@gmail.com',
      createAt: '2020-09-24'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
