import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-service',
  standalone: true,
  imports: [],
  templateUrl: './about-service.component.html',
  styleUrl: './about-service.component.css'
})
export class AboutServiceComponent {
@Input() description:string ='';
}
