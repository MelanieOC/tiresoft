import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MediaqueryService } from 'src/app/services/mediaquery.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableResponsiveComponent implements OnInit {
  @Input() data: any[]
  @Input() columns: any[]
  @Input() actionList: any[] = []
  @Input() search: boolean
  @Input() paginate: boolean

  @Output() onAction = new EventEmitter<any>();

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = []

  cols: any[] = []
  colsShow: any[] = []

  optionColum: any = null

  @ViewChild('paginator', { static: false }) set content(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort, { static: false }) set content2(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  expandedElement = null;

  private mediaService = new MediaqueryService('(min-width: 600px)');
  isDesktop: boolean;
  init$: Observable<boolean>

  constructor() { }

  ngOnInit(): void {
    this.colsShow = this.columns.filter(el => el.slug != 'options')
    this.optionColum = this.columns.find(el => el.slug == 'options')
    
    this.cols = this.columns.filter(el => !el.stick)

    this.init$ = this.mediaService.match$.pipe(
      map(value => {
        this.isDesktop = value
        if (value) {
          this.displayedColumns = this.columns.map(el => el.slug)
        } else {
          this.displayedColumns = this.columns.filter(el => el.stick).map(el => el.slug)
        }
        return value
      })
    )
  }


  ngOnChanges() {
    this.dataSource.data = this.data
  }

  expand(row) {
    if (!this.isDesktop) {
      this.expandedElement = this.expandedElement === row ? null : row
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(event, row, type) {
    event.stopPropagation();
    this.onAction.emit({ row, type })
  }



}
