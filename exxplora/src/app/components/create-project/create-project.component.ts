import { Component } from '@angular/core';
import { Domain } from '../../interfaces/domain';
import { DomainService } from '../../services/domain.service';
import { CreateProject } from '../../interfaces/create-project';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  createProjectData: CreateProject  = {
    title: '',
    description:'',
    endDate: new Date(),
    domains: [],
  }

  domains: Domain[] = [];

  constructor(private domainService: DomainService, private projectService: ProjectService, private router: Router) {}

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
    const index = this.createProjectData.domains.indexOf(domainId);
    if (index > -1) {
      this.createProjectData.domains.splice(index, 1);
    } else {
      this.createProjectData.domains.push(domainId);
    }
  }

  isDomainSelected(domainId: number): boolean {
    return this.createProjectData.domains.includes(domainId);
  }

  onSubmit(): void {
    const projectData = {
      title: this.createProjectData.title,
      description: this.createProjectData.description,
      endDate: this.createProjectData.endDate.toISOString(),
      domains: this.createProjectData.domains
    };

    console.log('Project submitted:', projectData);
    this.projectService.createProject(projectData).subscribe(
      res => {
        console.log(res)
        if(!res.IsError){
          alert("Project Created")
          this.router.navigate([''])
        }
        else {
          alert("Failed to  create project")
        }
      },
      err => {
        alert("Error occured. " + err)
      }
    )
  }

  onCancel(): void {
    // Implement cancel logic
  }
}
