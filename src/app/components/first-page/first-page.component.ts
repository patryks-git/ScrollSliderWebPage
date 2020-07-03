import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudCrudService } from 'src/app/services/crudcrud.service';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit, OnDestroy {

  users: User[];
  userForm: FormGroup;
  message = null;
  subs: Subscription[] = [];

  constructor(
    public crudCrudService: CrudCrudService,
    public formBuilder: FormBuilder
  ) { 
    this.userForm = this.formBuilder.group({
      _id: [null, []],
      login: ['', [ Validators.required ] ],
      email: ['', [ Validators.required ] ],
      type: [null, [ Validators.required ] ],
      isAdmin: [null, []],
      filterStartsWith: [null, []],
    });	

    Object.keys(this.userForm.controls).forEach(controlName => {
      this.subs.push(
        this.userForm.get(controlName).valueChanges.subscribe(value => {
          this.message = "You changed " + controlName;
        })
      );
    });

    this.subs.push(
      this.userForm.get('filterStartsWith').valueChanges.subscribe(filter => {
        this.crudCrudService.getUsers().pipe(
          map(x => x.filter(y => y.login.toLowerCase().startsWith(filter)))
        ).subscribe(
          result => {
            this.users = result;
          }, 
          error => {
            this.message = 'Error occured';
            console.error(error);
          }
        );
      })
    );
  }

  ngOnInit() {
    this.crudCrudService.getUsers().subscribe(
      result => {
        this.users = result;
      }, 
      error => {
        this.message = 'Error occured';
        console.error(error);
      }
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getUserInfo() {
    this.crudCrudService.getUser(this.userForm.value._id).subscribe(
      user => {
        this.userForm.patchValue({
          _id: user._id,
          login: user.login,
          email: user.email,
          type: user.type,
          isAdmin: user.isAdmin
        });
      },
      error => {
        this.message = 'Error occured';
        console.error(error);
      }
    )
  }

  addNewUser() {
    if (this.userForm.valid) {
      let newUser = {
        login: this.userForm.value.login,
        email: this.userForm.value.email,
        type: this.userForm.value.type,
        isAdmin: this.userForm.value.isAdmin
      } as User;
      if (this.users.find(x => x.login === newUser.login)) {
        this.message = "User with this login already exists."
      } else {
        this.crudCrudService.createUser(newUser).subscribe(
          user => {
            this.userForm.reset();
            this.users.push(user);
            this.userForm.patchValue({
              filterStartsWith: ''
            });
            this.message = "User successfully created."
          },
          error => {
            this.message = 'Error occured';
            console.error(error);
          }
        );
      }
    } else {
      this.message = "Form is invalid. Fill all the required fields."
    }
  }

  deleteUser() {
    this.crudCrudService.deleteUser(this.userForm.value._id).subscribe(
      result => {
        let index = this.users.findIndex(x => x._id === this.userForm.value._id);
        if (index > -1) {
          this.users.splice(index, 1);
        }
        this.userForm.reset();
        this.userForm.patchValue({
          _id: null,
          filterStartsWith: ''
        });
        this.message = 'User successfully deleted.';
      }, 
      error => {
        this.message = 'Error occured';
        console.error(error);
      }
    );
  }
}
