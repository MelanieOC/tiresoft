import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  version: string

  openedMenu: boolean = false;

  confiOpenedFlag: boolean = false;
  warehousesOpenedFlag: boolean = false;

  @ViewChild('sideMenu', { static: true }) sidemenu;

  user = null
  client$: Observable<any>

  url: string;

  routeChange$: Observable<any>

  constructor(
    private dbs: DatabaseService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData()
    this.client$ = this.dbs.customerSelect$
    this.user = this.auth.user.value
    this.routeChange$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(event => {
        this.url = event.url;
        if (this.isOver()) {
          //this.userService.openedMenu = false
          this.sidemenu.close();
        }
      })
    )
  }

  toggleSideMenu(): void {
    if (this.isOver()) {
      this.sidemenu.toggle()
    }

  }

  confiOpened(): void {
    this.confiOpenedFlag = true;
  }

  confiClosed(): void {
    this.confiOpenedFlag = false;
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  deselectClient() {
    this.dbs.customerSelect.next(null)
    localStorage.removeItem('client_tiresoft')
  }

  logout() {
    this.auth.logout()
    this.dbs.customerSelect.next(null)
  }

  getAllData() {
    const formR = new FormData();
    formR.append('id_accesibilidad', '0');
    let allData = combineLatest(
      this.dbs.getNuts().pipe(
        map(res => {
          let caps = res['tuercas']
          return Object.values(caps)
        })
      ),
      this.dbs.getObservation().pipe(
        map(res => {
          let caps = res['observaciones']
          let arr = []
          Object.keys(caps).forEach(k => {
            let ops = []
            if (caps[k]) {
              ops = Object.values(caps[k]).map((p, k) => {
                return {
                  name: p,
                  value: k + 1
                }
              })
            }
            arr.push({
              name: k,
              options: ops,
              multi: !k.includes('rregular'),
              check: false,
              value: ''
            })
          })
          return arr
        })
      ),
      this.dbs.getReasons(formR).pipe(
        map(res => {
          return res['inaccesibilidad']
        })
      ),
      this.dbs.getTypeCap().pipe(
        map(res => {
          let caps = res['tipo_tapa']
          let arr = []
          Object.keys(caps).forEach(k => {
            arr.push({
              id: k,
              name: caps[k]
            })
          })
          return arr
        })
      ),
      this.dbs.getDuales().pipe(
        map(res => {
          let caps = res['duales']
          let arr = []
          Object.keys(caps).forEach(k => {
            arr.push({
              id: k,
              name: caps[k],
              check: false
            })
          })
          return arr
        })
      ),
      this.dbs.getAccessibility().pipe(
        map(res => {
          let caps = res['accesibilidad']
          let arr = []
          Object.keys(caps).forEach(k => {
            arr.push({
              id: k,
              name: caps[k]
            })
          })
          return arr
        })
      ),
      this.dbs.getDivision().pipe(
        map(res => {
          let caps = res['separacion']
          return Object.values(caps)
        })
      ),
      this.dbs.getStatus().pipe(
        map(res => {
          let caps = res['estado']
          return Object.values(caps)
        })
      )
    )

    allData.subscribe(res => {
      this.dbs.nuts = res[0]
      this.dbs.observations = res[1]
      this.dbs.reasons = res[2]
      this.dbs.caps = res[3]
      this.dbs.duales = res[4]
      this.dbs.access = res[5]
      this.dbs.divisions = res[6]
      this.dbs.status = res[7]

      this.dbs.loadAll = true
    })
  }
}
