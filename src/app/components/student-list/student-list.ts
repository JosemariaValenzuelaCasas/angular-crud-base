import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentForm } from '../student-form/student-form';
import { Student } from '../../core/interfaces/student';
import { StudentService } from '../../core/services/student';
import {CommonModule}  from '@angular/common';
@Component({
  selector: 'app-student-list',
  imports: [StudentForm, CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit{
  private studentService = inject(StudentService);
  
  Students = signal<Student[]>([]);
  isModalOpen = signal(false);
  selectedStudent = signal<Student | null>(null);

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (data) => this.Students.set(data), // Actualizamos la signal con .set()
      error: (err) => console.error('Error cargando datos', err)
    });
  }

  openModal(item?: Student) {
    this.selectedStudent.set(item || null);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedStudent.set(null);
  }

  handleSave(item: Student) {
    if (item.id) {
      this.studentService.update(item.id, item).subscribe(() => {
        this.loadStudents();
        this.closeModal();
      });
    } else {
      this.studentService.create(item).subscribe(() => {
        this.loadStudents();
        this.closeModal();
      });
    }
  }

  toggleStatus(student: Student) {
    if (!student.id) return;
    
    const request = student.status === 'A'
      ? this.studentService.logicalDelete(student.id)
      : this.studentService.restore(student.id);

    request.subscribe(() => this.loadStudents());
  }

  // --- BORRADO FÍSICO (Descomentar para usar) ---
  
  deleteStudentFisico(id: string | undefined) {
    if (!id) return;
    
    // Alerta nativa de confirmación antes del DELETE real a la BD
    if (confirm('¿Estás seguro de que deseas eliminar este registro permanentemente?')) {
      this.studentService.physicalDelete(id).subscribe({
        next: () => this.loadStudents(),
        error: (err) => console.error('Error al eliminar físicamente', err)
      });
    }
  }

}
