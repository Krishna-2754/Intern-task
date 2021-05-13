import { Routes } from '@angular/router';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {FireBaseService, INews} from './services/fire-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public form: FormGroup;

  public newsList: INews[] = [];
  public newsDetails: INews;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fireBaseService: FireBaseService,
  ) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.fireBaseService.getEmployees().subscribe((res) => {
      this.newsList = res.map((news) => {
        return {
          ...news.payload.doc.data(),
          id: news.payload.doc.id
        } as INews;
      });
    });
  }

  openModal(content: TemplateRef<any>, newsId: string): void {
    this.newsDetails = this.newsList.find((news: INews) => news.id === newsId);

    this.formInit(this.newsDetails);
    this.modalService.open(content, {backdrop: 'static', centered: true});
  }

  formInit(data: INews): void {
    this.form = this.fb.group({
      News_Title: [data ? data.News_Title: '', Validators.required],
      News_category: [data ? data.News_category: '', Validators.required],
      News_description: [data ? data.News_description: '', Validators.required]
    });
  }

  addEmployee(): void {
    this.fireBaseService.addEmployee(this.form.value).then();
  }

  updateEmployee(newsId: string): void {
    this.fireBaseService.updateEmployee(newsId, this.form.value).then();
  }

  deleteEmployee(newsId: string): void {
    this.fireBaseService.deleteEmployee(newsId).then();
  }


}
