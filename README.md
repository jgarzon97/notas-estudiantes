# Proyecto: Sistema de Evaluación de Estudiantes

## Descripción

Este proyecto se basa en la creación de una estructura que permite gestionar los datos de una persona, y en particular de un estudiante. A través de herencia o en una sola clase, se agregan los atributos necesarios para representar a un estudiante, así como los procedimientos para calcular las calificaciones y determinar el estado aprobatorio.

## Requisitos

1. **Clase Persona**: Esta clase debe tener los siguientes atributos:
   - `Cedula`: Cédula de identidad de la persona.
   - `Nombres`: Nombre(s) de la persona.
   - `Apellidos`: Apellido(s) de la persona.
   - `Sexo`: Sexo de la persona (masculino, femenino, otro).
   - `FechaNacimiento`: Fecha de nacimiento de la persona.

2. **Clase Estudiante**: La clase estudiante hereda de la clase persona o la incluye como atributos. Además de los atributos de la persona, debe tener los siguientes:
   - `Código`: Código único del estudiante.
   - `ParcialI`: Nota del primer parcial.
   - `ParcialII`: Nota del segundo parcial.
   - `CalificaciónFinal (CF)`: Promedio de las dos notas parciales.
   - `ExamenRecuperación (ER)`: Nota del examen de recuperación (si es necesario).
   - `NotaDefinitiva (ND)`: Nota definitiva, calculada si es necesario.

3. **Cálculos**:
   - Calificación Final (CF): Promedio de las notas de los dos parciales.
     \[
     CF = \frac{P1 + P2}{2}
     \]
   - El estado del estudiante se determina con la Calificación Final:
     - Si \( CF \geq 7 \), el estudiante está "Aprobado".
     - Si \( CF < 5.5 \), el estudiante está "Reprobado".
     - Si \( 5.5 \leq CF < 7 \), el estudiante entra en un examen de recuperación:
       - Si la Nota Definitiva (ND) es calculada, se usa la fórmula:
         \[
         ND = CF \times 0.4 + ER \times 0.6
         \]
       - Si \( ND \geq 7 \), el estudiante está "Aprobado". Si no, está "Reprobado".
