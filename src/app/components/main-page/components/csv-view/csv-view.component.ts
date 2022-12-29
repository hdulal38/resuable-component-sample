import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-csv-view',
  templateUrl: './csv-view.component.html',
  styleUrls: ['./csv-view.component.scss'],
})
export class CsvViewComponent implements OnInit {
  csvError = false;
  csvHeader: string[] = [];
  csvBody: string[] = [];
  importedList: any = [];
  csvRecords: any = [];
  title: string = 'Title';
  maxFileSize = 2097152;
  @Input() csvUploaded = false;
  @Input() buttonText: string = 'Import';
  @Output() importDataEvent = new EventEmitter();

  header = false;
  checkedAll: boolean = false;

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private toast: ToastrService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {}
  changeHandler($event: any) {
    const files = $event.srcElement.files;
    if (files[0].size > this.maxFileSize) {
      this.toast.error('File size exceeded 2MB');
      return;
    }
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe({
        next: (result): void => {
          this.checkedAll = false;
          this.importedList = [];
          this.csvRecords = result;
          this.csvUploaded = true;
          this.csvError = false;
        },
        error: (error: NgxCSVParserError): void => {
          this.csvUploaded = true;
          this.csvError = true;
        },
      });
  }
  handleCheckBox($event: any, i: number) {
    if ($event.target.checked) {
      this.importedList.push(this.csvRecords[i + 1]);
    } else {
      const index = this.importedList.indexOf(this.csvRecords[i + 1]);
      this.importedList.splice(index, 1);
    }
  }
  checkAll() {
    if (this.checkedAll) {
      this.importedList = [...this.csvRecords];
      this.importedList.splice(0, 1);
    } else {
      this.importedList = [];
    }
  }
  isChecked(i: number) {
    return this.importedList.indexOf(this.csvRecords[i + 1]) !== -1;
  }
  handleImport() {
    const importedObjectArray: Object[] = [];

    this.importedList.forEach((dataUnit: string[], index: number) => {
      let temp = {};
      for (let i = 0; i < dataUnit.length; i++) {
        temp = { ...temp, [this.csvRecords[0][i]]: dataUnit[i] };
      }
      importedObjectArray.push(temp);
    });
    this.importDataEvent.emit(importedObjectArray);
    this.close();
  }

  close() {
    this.modal.dismissAll();
  }
}
