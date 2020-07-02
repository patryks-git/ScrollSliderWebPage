import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {

  students$: Observable<Student[]> = this.studentService.getStudents();
  students2$: Observable<Student[]> = this.studentService.getStudents2();

  constructor(public studentService: StudentService) { }

  ngOnInit(): void {

  }

}
