import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [{
    id: 1,
    name: 'Wojtek',
    studentNumber: 110470116021,
    university: 'GTU'
  },
  {
    id: 2,
    name: 'Kajtek',
    studentNumber: 110470116023,
    university: 'GTUU'
  },
  {
    id: 3,
    name: 'Bajtek',
    studentNumber: 110470116022,
    university: 'GTU'
  }];

  constructor() { }

  public getStudents(): Observable<Student[]> {
    return new Observable<Student[]>(observer => {
      setTimeout(() => {
        observer.next(this.students);
      }, 1000);
    });
  }

  public getStudents2(): Observable<Student[]> {
    return of(this.students);
  }

  public getStudentPromise(): Promise<Student[]> {
    return new Promise<Student[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.students);
        reject('Wystąpił błąd');
      }, 1000);
    })
  }

  //createStudent
  //updateStudent
  //deleteStudent
}
