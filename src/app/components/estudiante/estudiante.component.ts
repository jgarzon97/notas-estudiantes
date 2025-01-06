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
  mostrarModalEstadisticas: boolean = false;
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
      this.nuevoEstudiante.sexo &&
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

  abrirModalEstadisticas(): void {
    this.mostrarModalEstadisticas = true;
  }

  cerrarModalEstadisticas(): void {
    this.mostrarModalEstadisticas = false;
  }

  calcularPorcentajeAprobadosReprobados() {
    const total = this.estudiantes.length;
    const aprobados = this.estudiantes.filter(e => e.estado === 'Aprobado').length;
    const reprobados = total - aprobados;
    return {
      aprobados: ((aprobados / total) * 100).toFixed(2),
      reprobados: ((reprobados / total) * 100).toFixed(2)
    };
  }

  calcularPorcentajeAprobadosPorSexo() {
    const total = this.estudiantes.length;
    const masculinos = this.estudiantes.filter(e => e.sexo === 'M' && e.estado === 'Aprobado').length;
    const femeninos = this.estudiantes.filter(e => e.sexo === 'F' && e.estado === 'Aprobado').length;
    const totalMasculinos = this.estudiantes.filter(e => e.sexo === 'M').length;
    const totalFemeninos = this.estudiantes.filter(e => e.sexo === 'F').length;

    return {
      masculino: totalMasculinos > 0 ? ((masculinos / totalMasculinos) * 100).toFixed(2) : '0.00',
      femenino: totalFemeninos > 0 ? ((femeninos / totalFemeninos) * 100).toFixed(2) : '0.00'
    };
  }

  calcularPromedioGeneralYMejores() {
    const promedio =
      this.estudiantes.reduce((acc, estudiante) => acc + estudiante.calificacionFinal, 0) / this.estudiantes.length;
    const mejoresEstudiantes = this.estudiantes.filter(e => e.calificacionFinal > promedio);

    return {
      promedio: promedio.toFixed(2),
      mejoresEstudiantes: mejoresEstudiantes
    };
  }

  get estudiantes(): Estudiante[] {
    return this.estudianteService.getEstudiantes();
  }
}
