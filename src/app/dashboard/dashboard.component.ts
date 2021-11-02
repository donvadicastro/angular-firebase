import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {Character} from "../management/character";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  characters: Observable<Character[]>;

  constructor(private store: AngularFirestore) {
    this.characters = this.store.collection('characters').valueChanges({idField: 'id'}) as Observable<Character[]>;
  }

  ngOnInit(): void {
  }

}
