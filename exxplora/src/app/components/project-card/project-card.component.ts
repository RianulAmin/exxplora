import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { ProjectInfo } from '../../interfaces/project-info';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent implements OnInit {
  projects: ProjectInfo[] = []

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getAllProject().subscribe(
      res => {
        if(!res.IsError) {
          this.projects = res.Data;
          console.log(this.projects);
        }
        else alert("failed to load projects")
      },
      err => {
        alert("Req failed")
      }
    )
  }
}
