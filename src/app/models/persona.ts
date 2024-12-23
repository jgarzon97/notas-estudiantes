export class Persona {
    cedula: string;
    nombres: string;
    apellidos: string;
    sexo: 'M' | 'F';
    fechaNacimiento: Date;

    constructor(cedula: string, nombres: string, apellidos: string, sexo: 'M' | 'F', fechaNacimiento: Date) {
        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
    }
}
