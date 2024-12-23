import { Component } from '@angular/core';
import { EstudianteComponent } from './components/estudiante/estudiante.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EstudianteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P1H2-ColeccionObjetosAngular';
}
