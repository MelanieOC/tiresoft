import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-table-infinite-scroll',
  templateUrl: './table-infinite-scroll.component.html',
  styleUrls: ['./table-infinite-scroll.component.scss']
})
export class TableInfiniteScrollComponent implements OnInit {

  @Input() data: any[]
  /*
  @Input() columns: any[]
  @Input() actionList: any[] = []
  @Input() search: boolean
  @Input() paginate: boolean*/

  sliceData = []

  constructor() { }

  ngOnInit(): void {
    this.sliceData = this.data.slice(0, 20)
  }

  onModalScrollDown() {
    if (this.sliceData.length < this.data.length) {
      const lengthArray = this.sliceData.length;
      const lengthArrayTwo = this.data.length;
      for (let i = lengthArray; i < lengthArray + 10 && i < lengthArrayTwo; i++) {
        this.sliceData.push(this.data[i])
      }
    }
  }
}
