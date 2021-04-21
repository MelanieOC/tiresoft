import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
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
    this.client$ = this.dbs.customerSelect$
    this.user = this.auth.user.value
    this.routeChange$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(event => {
        this.url = event.url;
        console.log(this.url)
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
    
  }
}
