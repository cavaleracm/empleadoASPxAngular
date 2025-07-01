import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEmpleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleados.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
})
export class TablaComponent implements OnInit {
  empleados: IEmpleado[] = [];

  constructor(private empleadoService: EmpleadoService) {}

ngOnInit(): void {
  this.cargarEmpleados();
  this.empleadoService.empleadoCreado$.subscribe(() => {
    this.cargarEmpleados();
  });
}

  cargarEmpleados(): void {
    this.empleadoService.getList().subscribe({
      next: (data) => (this.empleados = data),
      error: (err) => console.error('Error al cargar empleados', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.delete(id).subscribe({
        next: () => this.cargarEmpleados(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  trackById(index: number, item: IEmpleado): number {
    return item.id;
  }
}
