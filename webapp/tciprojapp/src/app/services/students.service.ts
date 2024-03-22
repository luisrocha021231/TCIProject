import { HttpClient } from '@angular/common/http';
import { APP_ID, inject, Injectable } from '@angular/core';
import { Student } from '../models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  // se inyecta el cliente http
private http = inject(HttpClient);

private URL_API = 'http://localhost:9090/api/contacts';

  getAllStudents(){
    return this.http.get<Student[]>(this.URL_API);
  }

  getStudentById(id : number){

    return this.http.get<Student>(this.URL_API + '/'+id); //get('http://localhost:9090/api/contacts/${id}')
  }

  createStudent(student: Student){
    return this.http.post<Student>(this.URL_API, student);
  }

  updateStudent(id: number, student : Student){
    return this.http.put<Student>(this.URL_API+'/'+id, student);

  }

  deleteStudentById(id: number){
    return this.http.delete<Student>(this.URL_API+'/'+id);
  }

  deleteAllStudents(){
    return this.http.delete<Student>(this.URL_API);
  }

}
