import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-related-services',
  standalone: true,
  imports: [NgFor],
  templateUrl: './related-services.component.html',
  styleUrl: './related-services.component.css'
})
export class RelatedServicesComponent {
  relatedServices: any[] = [];

}
