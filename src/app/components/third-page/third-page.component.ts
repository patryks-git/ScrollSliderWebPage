import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.scss']
})
export class ThirdPageComponent implements OnInit {

  students: Student[];

  constructor(public studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudentPromise().then(data => {
      this.students = data;

    },
    err => {
      console.error(err);
    })
  }

  public async promise1() {
    var table = []
    table.push(await this.studentService.getStudentPromise());

    table.push(await this.studentService.getStudentPromise());

    var data = Promise.all([this.studentService.getStudentPromise(), this.studentService.getStudentPromise()])
  }
}
