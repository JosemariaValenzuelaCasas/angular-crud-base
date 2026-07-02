import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:9003/api/student'; // Cambia esto a la URL de tu API
  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  update(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  // Borrado lógico (puede ser un PATCH o un DELETE según tu API en Spring Boot)
  logicalDelete(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/delete`, {});
  }

  // Restaurar registro
  restore(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/restore`, {});
  }

  // Borrado Físico (Definitivo)
  physicalDelete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
