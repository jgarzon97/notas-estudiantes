import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {
  private estudiantes: Estudiante[] = [
    new Estudiante('E-1', 'Juan', 'Pérez', 'M', new Date('2000-01-01'), 6, 5.47),
    new Estudiante('E-2', 'Ana', 'Gómez', 'F', new Date('1999-02-20'), 9, 6.5),
    new Estudiante('E-3', 'Luis', 'Martínez', 'M', new Date('1998-11-10'), 7.5, 8)
  ];

  getEstudiantes(): Estudiante[] {
    return this.estudiantes;
  }

  agregarEstudiante(estudiante: Estudiante): void {
    this.estudiantes.push(estudiante);
  }

  modificarEstudiante(index: number, estudiante: Estudiante): void {
    this.estudiantes[index] = estudiante;
  }

  eliminarEstudiante(index: number): void {
    this.estudiantes.splice(index, 1);
  }

  calcularEstadisticas(): { aprobados: number; reprobados: number } {
    const total = this.estudiantes.length;
    const aprobados = this.estudiantes.filter(e => e.estado === 'Aprobado').length;
    const reprobados = total - aprobados;
    return { aprobados: (aprobados / total) * 100, reprobados: (reprobados / total) * 100 };
  }

  calcularPromedioGeneral(): number {
    const totalNotas = this.estudiantes.reduce((sum, e) => sum + e.calificacionFinal, 0);
    return totalNotas / this.estudiantes.length;
  }

  estudiantesMayoresAlPromedio(): Estudiante[] {
    const promedio = this.calcularPromedioGeneral();
    return this.estudiantes.filter(e => e.calificacionFinal > promedio);
  }
}
