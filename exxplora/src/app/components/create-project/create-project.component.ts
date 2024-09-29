import { Component } from '@angular/core';
import { Domain } from '../../interfaces/domain';
import { DomainService } from '../../services/domain.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  title: string = '';
  description: string = '';
  deadline: Date = new Date();
  selectedDomains: number[] = [];

  domains: Domain[] = [];

  constructor(private domainService: DomainService) {}

  ngOnInit(): void {
    this.domainService.getAllDomains().subscribe(
      res => {
        this.domains = res.Data;
      },
      error => {
        console.error('Error fetching domains:', error);
      }
    );
  }

  toggleDomainSelection(domainId: number): void {
    const index = this.selectedDomains.indexOf(domainId);
    if (index > -1) {
      this.selectedDomains.splice(index, 1);
    } else {
      this.selectedDomains.push(domainId);
    }
  }

  isDomainSelected(domainId: number): boolean {
    return this.selectedDomains.includes(domainId);
  }

  onSubmit(): void {
    const projectData = {
      title: this.title,
      description: this.description,
      deadline: this.deadline,
      relatedDomains: this.selectedDomains
    };

    console.log('Project submitted:', projectData);
    // Implement the submission logic
  }

  onCancel(): void {
    // Implement cancel logic
  }
}
