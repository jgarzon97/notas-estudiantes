export class Estudiante {
    codigo: string;
    nombres: string;
    apellidos: string;
    sexo: string;
    fechaNacimiento: Date;
    parcial1: number;
    parcial2: number;
    calificacionFinal: number;
    estado: string;
    examenRecuperacion?: number;

    constructor(
        codigo: string,
        nombres: string,
        apellidos: string,
        sexo: string,
        fechaNacimiento: Date,
        parcial1: number,
        parcial2: number
    ) {
        this.codigo = codigo;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.parcial1 = parcial1;
        this.parcial2 = parcial2;
        this.calificacionFinal = 0;
        this.estado = '';
        this.calcularCalificacionFinal();
    }

    calcularCalificacionFinal(examenRecuperacion?: number): void {
        const promedio = (this.parcial1 + this.parcial2) / 2;

        if (promedio >= 7) {
            this.calificacionFinal = promedio;
            this.estado = 'Aprobado';
        } else if (promedio < 5.5) {
            this.calificacionFinal = promedio;
            this.estado = 'Reprobado';
        } else {
            if (examenRecuperacion !== undefined) {
                this.calificacionFinal = promedio * 0.4 + examenRecuperacion * 0.6;
                this.estado = this.calificacionFinal >= 7 ? 'Aprobado' : 'Reprobado';
            } else {
                this.calificacionFinal = promedio;
                this.estado = 'Pendiente Recuperación';
            }
        }
    }
}
