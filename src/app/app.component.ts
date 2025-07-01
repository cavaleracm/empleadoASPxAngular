import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { EmpleadoComponent } from "./components/empleado/empleado.component";
import { TablaComponent } from './components/tabla/tabla.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, EmpleadoComponent,TablaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmpleadosASPxAngular';
}


