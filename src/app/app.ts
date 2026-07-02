import { Component, signal } from '@angular/core';
import { StudentList } from './components/student-list/student-list';
@Component({
  selector: 'app-root',
  imports: [StudentList],
  template: '<app-student-list></app-student-list>',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-crud-base');
}
