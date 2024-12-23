import { Component } from '@angular/core';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
})

export class EstudianteComponent {
  mostrarModal: boolean = false;
  nuevoEstudiante: Estudiante = this.crearNuevoEstudiante();
  parcial1Invalido: boolean = false;
  parcial2Invalido: boolean = false;

  constructor(private estudianteService: EstudianteService) {}

  generarCodigo(): string {
    const estudiantes = this.estudianteService.getEstudiantes();
    const nuevoCodigo = estudiantes.length + 1;
    return `E-${nuevoCodigo}`;
  }

  crearNuevoEstudiante(): Estudiante {
    return new Estudiante(
      this.generarCodigo(),
      '',
      '',
      'M',
      new Date(),
      0,
      0
    );
  }

  agregarEstudiante(): void {
    if (
      this.nuevoEstudiante.nombres &&
      this.nuevoEstudiante.apellidos &&
      this.nuevoEstudiante.parcial1 >= 1 &&
      this.nuevoEstudiante.parcial1 <= 10 &&
      this.nuevoEstudiante.parcial2 >= 1 &&
      this.nuevoEstudiante.parcial2 <= 10
    ) {
      this.nuevoEstudiante.calcularCalificacionFinal();
      this.estudianteService.agregarEstudiante(this.nuevoEstudiante);

      this.nuevoEstudiante = this.crearNuevoEstudiante();
      this.cerrarModal();
    } else {
      alert('Las notas deben estar entre 1 y 10.');
    }
  }

  validarNota(campo: string): void {
    if (campo === 'parcial1') {
      this.parcial1Invalido = this.nuevoEstudiante.parcial1 < 1 || this.nuevoEstudiante.parcial1 > 10;
    } else if (campo === 'parcial2') {
      this.parcial2Invalido = this.nuevoEstudiante.parcial2 < 1 || this.nuevoEstudiante.parcial2 > 10;
    }
  }

  eliminarEstudiante(index: number): void {
    this.estudianteService.eliminarEstudiante(index);
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  get estudiantes(): Estudiante[] {
    return this.estudianteService.getEstudiantes();
  }
}
