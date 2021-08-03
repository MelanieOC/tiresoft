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

  userName = null
  client$: Observable<any>

  url: string;
  urlActive:string;

  routeChange$: Observable<any>

  menuItems = [
    {
      name: 'Configuración',
      icon: 'settings',
      state: 'configuracion',
      children: [
        { name: 'Criterios de aceptación', state: 'listacriterioaceptacion' },
        { name: 'Tipo de cambio', state: 'tipocambio' },
        { name: 'Aplicación', state: 'remanenteaplicacion' },
        { name: 'Revisar reportes de inspecciones', state: 'reportes' },
        { name: 'Importar datos', state: 'importar' },
        { name: 'Plantas', state: 'listado_plantas' }
      ]
    },
    {
      name: 'Inspección',
      icon: 'widgets',
      state: 'inspecciones',
      children: [
        { name: 'Registra Inspección', state: 'create' },
        { name: 'Reporte Inspección', state: 'list' }
      ]
    },
    /*{
      name: 'Indicadores',
      icon: 'widgets',
      open: false,
      state: 'indicadores',
      children: [
        { name: 'Gráficas indicadores', state: '' }
      ]
    },*/
    {
      name: 'Reportes',
      icon: 'trending_up',
      state: 'reportes',
      children: [
        { name: 'Curva de desgaste', state: 'curva-desgaste' },
        { name: 'Remanente de Rodado', state: 'remanenterodado' },
        { name: 'Análisis del Scrap', state: 'analisis-scrap' },
        { name: 'Análisis comparativo de neumáticos', state: 'analisis-comparativo' },
        { name: 'Generar reporte consolidado', state: 'generar' }
      ]
    },
    {
      name: 'Mantenimiento',
      icon: 'build',
      state: 'mantenimiento',
      children: [
        { name: 'Vehículos', state: 'vehiculos' },
        { name: 'Neumáticos', state: 'neumaticos' },
        { name: 'SCRAP Neumáticos', state: 'scrap-neumaticos' }
      ]
    }
  ]
  /*
   * trending_up
   * build
   * supervised_user_circle
   * build_circle
   * poll
   * 
   */
  constructor(
    private dbs: DatabaseService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = this.auth.user.value
    console.log(this.userName)
    this.urlActive = this.router.url.split('/')[2]
    this.client$ = this.dbs.customerSelect$
    
    this.routeChange$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(event => {
        this.url = event.url;
        this.urlActive = this.url.split('/')[2]
        if (this.isOver()) {
          //this.userService.openedMenu = false
          this.sidemenu.close();
        }
      })
    )
  }

  toggleSideMenu(): void {
    this.sidemenu.toggle()
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  deselectClient() {
    this.dbs.customerSelect.next(null)
    localStorage.removeItem('client_tiresoft')
  }

  logout() {
    this.dbs.customerSelect.next(null)
    this.auth.logout()   
  }
}
