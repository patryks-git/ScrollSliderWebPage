import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {

  users: User[];
  userForm: FormGroup;
  message = null;

  constructor(
    public githubService: GithubService,
    public formBuilder: FormBuilder
  ) { 
    this.userForm = this.formBuilder.group({
      login: ['', [ Validators.required ] ],
      id: [null, [ Validators.required ] ],
      type: [null, [ Validators.required ] ],
      siteAdmin: [null, []]
    });	

    Object.keys(this.userForm.controls).forEach(controlName => {
      this.userForm.get(controlName).valueChanges.subscribe(value => {
        this.message = "You changed " + controlName;
      });
    });
  }

  ngOnInit() {
    this.githubService.getUsers().pipe(
      map(x => x.filter(y => y.login.endsWith("y")))
    ).subscribe(
      result => {
        this.users = result;
      }, 
      error => {
        console.error(error);
      }
    )
  }

  getUserInfo() {
    // this.githubService.getUser(this.userForm.value.login).subscribe(
    //   user => {
    //     this.userForm.patchValue({
    //       login: user.login,
    //       id: user.id,
    //       type: user.type,
    //       siteAdmin: user.site_admin
    //     });
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // )
    let found = this.users.find(user => user.login === this.userForm.value.login);
    if (found !== null) {
      this.userForm.patchValue({
        login: found.login,
        id: found.id,
        type: found.type,
        siteAdmin: found.site_admin
      });
    }
  }

  addNewUser() {
    if (this.userForm.valid) {
      let newUser = this.userForm.value as User;
      if (this.users.find(x => x.login === newUser.login || x.id === newUser.id)) {
        this.message = "User with this login or id already exists."
      } else {
        this.users.push(newUser);
        this.userForm.reset();
        this.message = "User successfully created."
      }
    } else {
      this.message = "Form is invalid. Fill all the required fields."
    }
  }
}
