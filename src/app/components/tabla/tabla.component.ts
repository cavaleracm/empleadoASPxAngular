import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEmpleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleados.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule], // 👈 Necesario para *ngFor, *ngIf y pipes como date
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'] // Si no usas estilos, puedes quitar esta línea
})
export class TablaComponent implements OnInit {
  empleados: IEmpleado[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
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

  // Opcional: para mejorar rendimiento del *ngFor
  trackById(index: number, item: IEmpleado): number {
    return item.id;
  }
}
