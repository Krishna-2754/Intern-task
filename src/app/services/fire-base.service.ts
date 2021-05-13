import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor(
    private firestore: AngularFirestore
  ) {
  }

  getEmployees() {
    return this.firestore.collection('news').snapshotChanges();
  }

  addEmployee(payload: INews) {
    return this.firestore.collection('news').add(payload);
  }

  updateEmployee(newsId: string, payload: INews) {
    return this.firestore.doc('news/' + newsId).update(payload);
  }

  deleteEmployee(newsId: string) {
    return this.firestore.doc('news/' + newsId).delete();
  }

}

export interface INews {
  id?: string;
  News_Title: string;
  News_category: string;
  News_description: string;
}
