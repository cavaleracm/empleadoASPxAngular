import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  imports: [ReactiveFormsModule, FormsModule],
})
export class EmpleadoComponent {
  empleadoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private EmpleadoService: EmpleadoService
  ) {
    this.empleadoForm = this.fb.group({
    nombre: [''],
    correo: [''],
    telefono: [''],
    fechaNacimiento: [''],
    sexo: ['']
    });
  }

  onSubmit(): void {
    this.EmpleadoService.add(this.empleadoForm.value).subscribe({
      next: () => {
        alert('Empleado registrado con éxito');
        this.empleadoForm.reset();
        this.EmpleadoService.notificarEmpleadoCreado();
      },
      error: (err) => console.error('Error al guardar', err)
    });
  }
}
