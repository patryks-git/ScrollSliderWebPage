import { Component, OnInit, OnDestroy } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit, OnDestroy {

  students: Student[] = [];
  private sub: Subscription;

  constructor(private studentservice: StudentService) { }
    
  ngOnInit() {
    this.sub = this.studentservice.getStudents()
      .pipe(
        map(x => x.filter(s => s.university === "GTU"))
      )
      .subscribe(
        (result: Student[]) => {
          this.students = result;
          console.log('ok');
        },
        error => {
          console.error('pojawił się błąd: ' + error);
        },
        () => {
          console.log('zakończyło się');
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
