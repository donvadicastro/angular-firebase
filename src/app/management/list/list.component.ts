import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {Character} from "../character";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private readonly collectionName = 'characters';

  characters: Observable<Character[]>;

  constructor(private store: AngularFirestore) {
    this.characters = this.store.collection(this.collectionName).valueChanges({idField: 'id'}) as Observable<Character[]>;
  }

  ngOnInit(): void {
  }

  onDelete(id: string) {
    this.store.collection(this.collectionName).doc(id).delete();
  }
}
