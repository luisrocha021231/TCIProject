import { Component, inject, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Student } from '../../models/student.interface';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export default class StudentsComponent implements OnInit {

  // para poder hacer uso de mi StudentsService
  private studentsService = inject(StudentsService);
  private router = inject(Router);

  students :Student[] = []

  ngOnInit(): void {
    this.loadAll();
      
  }

  loadAll(){
    this.studentsService.getAllStudents()
    .subscribe(students => {
      this.students = students;
    });
  }

  deleteStudents(){
    this.studentsService.deleteAllStudents().subscribe(() => {
      this.studentsService.getAllStudents().subscribe(students => {
        this.students = students;
      }); 
    })
  }

  deleteStudent(student: Student){
    this.studentsService.deleteStudentById(student.id).subscribe(() => {
    this.loadAll();
    });
  }

  getStatusClass(status: string): string {
    return status === 'Activo' ? 'text-success' : 'text-danger';
  }

}


