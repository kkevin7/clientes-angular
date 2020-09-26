import { RouterModule, Routes } from '@angular/router';
import { ClienteService } from './clientes/cliente.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import {FormsModule} from '@angular/forms';
import { ProfesoresComponent } from './profesores/profesores.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ReporteComponent } from './reporte/reporte.component';
import { FormAlumnoComponent } from './alumnos/form-alumno.component';
import { FormProfesorComponent } from './profesores/form-profesor.component';

const routes: Routes = [
  {path: '', redirectTo: '/alumnos', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/form', component: FormAlumnoComponent},
  {path: 'alumnos/form/:id', component: FormAlumnoComponent},
  {path: 'profesores', component: ProfesoresComponent},
  {path: 'profesores/form', component: FormProfesorComponent},
  {path: 'profesores/form/:id', component: FormProfesorComponent},
  {path: 'reporte/:id', component: ReporteComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    ProfesoresComponent,
    AlumnosComponent,
    ReporteComponent,
    FormAlumnoComponent,
    FormProfesorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
