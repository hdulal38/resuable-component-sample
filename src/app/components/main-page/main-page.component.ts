import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CsvViewComponent } from './components/csv-view/csv-view.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  importedData: any[] = [];
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
  importFromCsv() {
    const ref = this.modalService.open(CsvViewComponent, { size: 'xl' });
    ref.componentInstance.title = 'Users';
    ref.componentInstance.importDataEvent.subscribe((data: any) => {
      this.importedData = [...data];
    });
  }
}
