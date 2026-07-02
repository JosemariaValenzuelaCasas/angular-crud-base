import { Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../core/interfaces/student';
@Component({
  selector: 'app-student-form',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm {
  student = input<Student | null>(null);
  close = output<void>();
  save = output<Student>();

  form: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      id: [null],
      dni: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      promotion: ['', Validators.required],
      /*description: [''],*/
      status: ["A"]
    });

    // Reacciona automáticamente cuando el input 'student' cambia
    effect(() => {
      const currentStudent = this.student();
      if (currentStudent) {
        this.form.patchValue(currentStudent);
      } else {
        this.form.reset({ status: "A" });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
