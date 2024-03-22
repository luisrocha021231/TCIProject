import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student.interface';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export default class StudentFormComponent implements OnInit{

  private formbuilder = inject(FormBuilder);
  private router = inject(Router);
  private activatedroute = inject(ActivatedRoute);
  private studentService = inject(StudentsService);

  form?: FormGroup;
  student?: Student;

  ngOnInit(): void {
      const id = this.activatedroute.snapshot.paramMap.get('id');
      
      if(id){
        this.studentService.getStudentById(parseInt(id))
        .subscribe(student => {
            this.student = student;
            this.form = this.formbuilder.group({
                                  name: [student.name, [Validators.required]],
                                  lastname: [student.lastname, [Validators.required]],
                                  birthdate:[student.birthdate, [Validators.required]],
                                  status: [student.status, [Validators.required]]
          });
        })
      } else {
        this.form = this.formbuilder.group({
          name: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          birthdate:['', [Validators.required]],
          status: ['', [Validators.required]]
});
      }
  }

  saveStudent(){
    const studentForm = this.form!.value;

    if(this.student){
      this.studentService.updateStudent(this.student.id, studentForm)
      .subscribe(() => {
      this.router.navigate(['/']);
    }

    );

    }else{
      this.studentService.createStudent(studentForm)
    .subscribe(() => {
      this.router.navigate(['/']);
    });
    }

  }


}
