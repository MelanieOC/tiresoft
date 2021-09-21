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
  urlActive: string;

  routeChange$: Observable<any>

  menuItems = []
  menuList = [
    {
      name: 'Configuración',
      icon: 'settings',
      state: 'configuracion',
      type: 'children',
      children: [
        { name: 'Criterios de aceptación', state: 'listacriterioaceptacion', slug: ['admin.criterio.list'] },
        { name: 'Tipo de cambio', state: 'tipocambio', slug: ['admin.cambio.list'] },
        { name: 'Aplicación', state: 'remanenteaplicacion', slug: ['admin.aplicacion.list'] },
        { name: 'Revisar reportes de inspecciones', state: 'reportes', slug: ['admin.reportes.list'] },
        { name: 'Importar datos', state: 'importar', slug: ['admin.importar.upload'] },
        { name: 'Plantas', state: 'listado_plantas', slug: ['admin.planta.list'] }
      ]
    },
    {
      name: 'Inspección',
      icon: 'widgets',
      state: 'inspecciones',
      type: 'children',
      children: [
        { name: 'Registra Inspección', state: 'create', slug: ['inspec.register.list'] },
        { name: 'Reporte Inspección', state: 'list', slug: ['inspec.report.listar'] }
      ]
    },
    {
      name: 'Indicadores',
      icon: 'calendar_view_month',
      open: false,
      state: 'indicadores',
      type: 'single',
      slug: ['indic.costo.list', 'indic.reencauche.list', 'indic.reencauchabilidad.list']
    },
    {
      name: 'Reportes',
      icon: 'trending_up',
      state: 'reportes',
      type: 'children',
      children: [
        { name: 'Curva de desgaste', state: 'curva-desgaste', slug: ['report.desgaste.neumatico.view', 'report.desgaste.vehiculo.view'] },
        { name: 'Remanente de Rodado', state: 'remanenterodado', slug: ['report.remanente.rodado.view'] },
        { name: 'Análisis del Scrap', state: 'analisis-scrap', slug: ['report.analisis.scrap.view', 'report.scrap.marca.view', 'report.perdida.scarp.view'] },
        { name: 'Análisis comparativo de neumáticos', state: 'analisis-comparativo', slug: ['report.comparativo.configuracion.view', 'report.comparativo.marca.view'] },
        { name: 'Generar reporte consolidado', state: 'consolidado', slug: ['report.consolidado.neumaticos.view'] }
      ]
    },
    {
      name: 'Mantenimiento',
      icon: 'build',
      state: 'mantenimiento',
      type: 'children',
      children: [
        { name: 'Vehículos', state: 'vehiculos', slug: ['mant.vehiculo.list', 'mant.config.list'] },
        { name: 'Neumáticos', state: 'neumaticos', slug: ['mant.neumatico.list'] },
        { name: 'SCRAP Neumáticos', state: 'scrap-neumaticos', slug: ['report.consolidado.neumaticos.view'] }
      ]
    }
  ]
  /*
   * trending_up
   * build
   * supervised_user_circle
   * build_circle
   * poll
   * tips_and_updates
   */
  constructor(
    private dbs: DatabaseService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = this.auth.user.value
    console.log(this.userName)
    this.menuItems = this.getMenu()
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

  isPermit(slugs: string[]): boolean {
    let permits = this.userName.permissions.map(pt => pt.slug)
    let filt = permits.filter(pt => slugs.includes(pt))
    return filt.length > 0
  }

  getMenu() {
    return [...this.menuList].map(m => {
      if (m.type == 'children') {
        let children = m.children.filter(ch => this.isPermit(ch.slug))
        m.children = children
      }
      return m
    }).filter(item => {
      if (item.type == 'children') {
        return item.children.length > 0
      } else {
        return this.isPermit(item.slug)
      }
    })
  }
}
