import { Component, Input } from '@angular/core';
import { DomainService } from '../../services/domain.service';

@Component({
  selector: 'app-domain-card',
  templateUrl: './domain-card.component.html',
  styleUrl: './domain-card.component.css'
})
export class DomainCardComponent {
  
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() backgroundImage: string = '';
  @Input() projectCount: number = 0;
}
