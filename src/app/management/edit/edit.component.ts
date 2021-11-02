import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private readonly collectionName = 'characters';

  characterForm: FormGroup = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    score: [0, Validators.required],
    description: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: AngularFirestore) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.store
        .collection(this.collectionName)
        .doc(this.activatedRoute.snapshot.params['id'])
        .valueChanges({idField: 'id'})
        .subscribe(doc => doc && this.characterForm.setValue(doc));
    }
  }

  onSubmit() {
    let id = this.activatedRoute.snapshot.params['id'];
    let data = this.characterForm.value;

    if (id) {
      this.store.collection(this.collectionName).doc(id).update(data).then(() =>
        this.router.navigate(["management", "list"]));
    } else {
      this.store.collection(this.collectionName).add(data).then(() =>
        this.router.navigate(["management", "list"]));
    }
  }
}
