import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  meForm: FormGroup = this.fb.group({
    displayName: [{value: '', disabled: true}, Validators.required],
    email: [{value: '', disabled: true}, Validators.required],
  });

  constructor(private fb: FormBuilder,
              private store: AngularFirestore,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.authStateChanged$.subscribe(x => x && this.meForm.patchValue(x.toJSON()));
  }
}
