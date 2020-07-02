import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { User } from 'src/app/models/user';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {

  users: User[];
  constructor(public githubService: GithubService) { }

  ngOnInit() {
    this.githubService.getUsers().pipe(
      map(x => x.filter(y => y.login.startsWith("m")))
    ).subscribe(
      result => {
        this.users = result;
      }, 
      error => {
        console.error(error);
      }
    )
  }


}
