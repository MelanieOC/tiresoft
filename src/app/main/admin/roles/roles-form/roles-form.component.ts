import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { RolesService } from 'src/app/services/roles.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss']
})
export class RolesFormComponent implements OnInit {
  title = 'Crear rol';
  edit = false
  buttonSubmit = false
  listPermits: any = [
    {
      name: 'Administrador',
      slug: 'admin',
      all: true,
      check: false,
      permits: [
        {
          name: 'Usuarios', slugTask: 'admin', slug: 'user', check: false, permits: [
            { type: 'list', slug: 'admin.user.list', check: false, id: 9 },
            { type: 'add', slug: 'admin.user.add', check: false, id: 10 },
            { type: 'edit', slug: 'admin.user.edit', check: false, id: 11 },
            { type: 'delete', slug: 'admin.user.delete', check: false, id: 12 }
          ]
        },
        {
          name: 'Roles', slugTask: 'admin', slug: 'role', check: false, permits: [
            { type: 'list', slug: 'admin.role.list', check: false, id: 1 },
            { type: 'add', slug: 'admin.role.add', check: false, id: 2 },
            { type: 'edit', slug: 'admin.role.edit', check: false, id: 3 },
            { type: 'delete', slug: 'admin.role.delete', check: false, id: 4 }
          ]
        },
        {
          name: 'Clientes', slugTask: 'admin', slug: 'cliente', check: false, permits: [
            { type: 'list', slug: 'admin.cliente.list', check: false, id: 13 },
            { type: 'add', slug: 'admin.cliente.add', check: false, id: 14 },
            { type: 'edit', slug: 'admin.cliente.edit', check: false, id: 15 },
            { type: 'delete', slug: 'admin.cliente.delete', check: false, id: 16 }
          ]
        },
        {
          name: 'Criterios', slugTask: 'admin', slug: 'criterio', check: false, permits: [
            { type: 'list', slug: 'admin.criterio.list', check: false, id: 17 },
            { type: 'add', slug: 'admin.criterio.add', check: false, id: 18 },
            { type: 'edit', slug: 'admin.criterio.edit', check: false, id: 19 },
            { type: 'delete', slug: 'admin.criterio.delete', check: false, id: 20 }
          ]
        },
        {
          name: 'Tipo de Cambio', slugTask: 'admin', slug: 'cambio', check: false, permits: [
            { type: 'list', slug: 'admin.cambio.list', check: false, id: 21 },
            { type: 'add', slug: 'admin.cambio.add', check: false, id: 22 },
            { type: 'edit', slug: 'admin.cambio.edit', check: false, id: 23 },
            { type: 'delete', slug: 'admin.cambio.delete', check: false, id: 24 }
          ]
        },
        {
          name: 'Aplicaciones', slugTask: 'admin', slug: 'aplicacion', check: false, permits: [
            { type: 'list', slug: 'admin.aplicacion.list', check: false, id: 25 },
            { type: 'add', slug: 'admin.aplicacion.add', check: false, id: 26 },
            { type: 'edit', slug: 'admin.aplicacion.edit', check: false, id: 27 },
            { type: 'delete', slug: 'admin.aplicacion.delete', check: false, id: 28 }
          ]
        },
        {
          name: 'Reportes de Usuarios', slugTask: 'admin', slug: 'reportes', check: false, permits: [
            { type: 'list', slug: 'admin.reportes.list', check: false, id: 29 },
            { type: 'add', slug: 'admin.reportes.add', check: false, id: 30 },
            { type: 'edit', slug: 'admin.reportes.edit', check: false, id: 31 },
            { type: 'delete', slug: 'admin.reportes.delete', check: false, id: 32 }
          ]
        },
        {
          name: 'Plantas', slugTask: 'admin', slug: 'planta', check: false, permits: [
            { type: 'list', slug: 'admin.planta.list', check: false, id: 34 },
            { type: 'add', slug: 'admin.planta.add', check: false, id: 35 },
            { type: 'edit', slug: 'admin.planta.edit', check: false, id: 36 },
            { type: 'delete', slug: 'admin.planta.delete', check: false, id: 37 }
          ]
        }
      ]
    },
    {
      name: 'Inspección', slug: 'inspec', all: true, check: false,
      permits: [
        {
          name: 'Registro', slugTask: 'inspec', slug: 'register', check: false, permits: [
            { type: 'list', slug: 'inspec.register.list', check: false, id: 38 },
            { type: 'add', slug: 'inspec.register.add', check: false, id: 39 },
            { type: 'edit', slug: 'inspec.register.edit', check: false, id: 40 },
            { type: 'delete', slug: 'inspec.register.delete', check: false, id: 41 }
          ]
        },
        {
          name: 'Reporte', slugTask: 'inspec', slug: 'report', check: false, permits: [
            { type: 'list', slug: 'inspec.report.list', check: false, id: 42 },
            { type: 'add', slug: 'inspec.report.add', check: false, id: 43 },
            { type: 'edit', slug: 'inspec.report.edit', check: false, id: 44 },
            { type: 'delete', slug: 'inspec.report.delete', check: false, id: 45 }
          ]
        }
      ]
    },
    {
      name: 'Indicadores', slug: 'indic', all: true, check: false,
      permits: [
        {
          name: 'Costo x Km/Hr', slugTask: 'indic', slug: 'costo', check: false, permits: [
            { type: 'list', slug: 'indic.costo.list', check: false, id: 46 },
            { type: 'add', slug: 'indic.costo.add', check: false, id: 47 },
            { type: 'edit', slug: 'indic.costo.edit', check: false, id: 48 },
            { type: 'delete', slug: 'indic.costo.delete', check: false, id: 49 }
          ]
        },
        {
          name: 'Índice de Reencauche', slugTask: 'indic', slug: 'reencauche', check: false, permits: [
            { type: 'list', slug: 'indic.reencauche.list', check: false, id: 50 },
            { type: 'add', slug: 'indic.reencauche.add', check: false, id: 51 },
            { type: 'edit', slug: 'indic.reencauche.edit', check: false, id: 52 },
            { type: 'delete', slug: 'indic.reencauche.delete', check: false, id: 53 }
          ]
        },
        {
          name: 'Índice de Reencauchabilidad', slugTask: 'indic', slug: 'reencauchabilidad', check: false, permits: [
            { type: 'list', slug: 'indic.reencauchabilidad.list', check: false, id: 54 },
            { type: 'add', slug: 'indic.reencauchabilidad.add', check: false, id: 55 },
            { type: 'edit', slug: 'indic.reencauchabilidad.edit', check: false, id: 56 },
            { type: 'delete', slug: 'indic.reencauchabilidad.delete', check: false, id: 57 }
          ]
        }
      ]
    },
    {
      name: 'Reportes', slug: 'report', all: false, check: false,
      type: 'list',
      permits: [
        { name: 'Curva de desgaste por neumático', slug: 'report.desgaste.neumatico.view', check: false, id: 58 },
        { name: 'Curva de desgaste por Vehículo', slug: 'report.desgaste.vehiculo.view', check: false, id: 59 },
        { name: 'Remanente de Rodado', slug: 'report.desgaste.neumatico.view', check: false, id: 60 },
        { name: 'Análisis del scrap', slug: 'report.analisis.scrap.view', check: false, id: 61 },
        { name: 'Neumáticos en Scrap por Marcas', slug: 'report.scrap.marca.view', check: false, id: 62 },
        { name: 'Pérdidas valorizadas del scrap', slug: 'report.perdida.scarp.view', check: false, id: 63 },
        { name: 'Análisis comparativo de neumáticos por configuración', slug: 'report.comparativo.configuracion.view', check: false, id: 64 },
        { name: 'Análisis comparativo de neumáticos por marca', slug: 'report.comparativo.marca.view', check: false, id: 65 },
        { name: 'Generar Reporte consolidado de neumáticos', slug: 'report.consolidado.neumaticos.view', check: false, id: 66 },
        { name: 'Descargar Reporte consolidado de neumáticos', slug: 'report.consolidado.neumaticos.download', check: false, id: 67 },
        { name: 'Cargar Reporte consolidado de neumáticos', slug: 'report.consolidado.neumaticos.upload', check: false, id: 68 }
      ]
    },
    {
      name: 'Mantenimiento', slug: 'mant', all: true, check: false,
      permits: [
        {
          name: 'Información de vehículos', slugTask: 'mant', slug: 'vehiculo', check: false, permits: [
            { type: 'list', slug: 'mant.vehiculo.list', check: false, id: 69 },
            { type: 'add', slug: 'mant.vehiculo.add', check: false, id: 70 },
            { type: 'edit', slug: 'mant.vehiculo.edit', check: false, id: 71 },
            { type: 'delete', slug: 'mant.vehiculo.delete', check: false, id: 72 }
          ]
        },
        {
          name: 'Actualización de configuración de vehículos', slugTask: 'mant', slug: 'config', check: false, permits: [
            { type: 'list', slug: 'mant.config.list', check: false, id: 73 },
            { type: 'add', slug: 'mant.config.add', check: false, id: 74 },
            { type: 'edit', slug: 'mant.config.edit', check: false, id: 75 },
            { type: 'delete', slug: 'mant.config.delete', check: false, id: 76 }
          ]
        },
        {
          name: 'Actualización del maestro de neumáticos', slugTask: 'mant', slug: 'neumatico', check: false, permits: [
            { type: 'list', slug: 'mant.neumatico.list', check: false, id: 77 },
            { type: 'add', slug: 'mant.neumatico.add', check: false, id: 78 },
            { type: 'edit', slug: 'mant.neumatico.edit', check: false, id: 79 },
            { type: 'delete', slug: 'mant.neumatico.delete', check: false, id: 80 }
          ]
        }
      ]
    }
  ]

  rolPermits = []

  rolForm = this.formBuilder.group({
    name: [null, Validators.required],
    description: [null],
    permissions: [null]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleService: RolesService
  ) { }

  ngOnInit(): void {
    /*this.roleService.getPermission().subscribe(res => {
      console.log(res)
    })*/

    if (this.activatedRoute.snapshot.params.id) {
      this.title = 'Editar rol';
      this.edit = true
      combineLatest(
        this.roleService.getRol(this.activatedRoute.snapshot.params.id).pipe(
          map(res => res['role'])
        ),
        this.roleService.getPermission().pipe(
          map(res => res['data'])
        )
      ).subscribe(([role, permissions]) => {
        this.rolForm.get('name').setValue(role.name);
        this.rolForm.get('description').setValue(role.description);
        this.rolPermits = role.permissions
        this.getCheckList(role.permissions)
      });
    }
  }

  setAll(completed: boolean, task) {
    if (task.permits) {
      task.permits.forEach(t => {
        if (t.permits) {
          t.check = completed
          t.permits.forEach(st => st.check = completed)
        } else {
          t.check = completed
        }
      });
    }
  }

  updateAllComplete() {

  }

  someComplete(task): boolean {
    if (task.permits == null) {
      return false;
    } else {
      const allComplete = task.permits.filter(t => t.check).length == task.permits.length
      return task.permits.filter(t => t.check).length > 0 && !allComplete;
    }
  }

  getCheckList(array) {
    this.listPermits.forEach(lt => {
      lt.permits.forEach(pt => {
        if (lt.all) {
          pt.permits.forEach(st => {
            st.check = array.includes(st.id)
          })
          pt.check = pt.permits.filter(pr => pr.check).length > 0
        } else {
          pt.check = array.includes(pt.id)
        }
      })
      lt.check = lt.permits.filter(pr => pr.check).length > 0
    })
  }

  getListPermits(array, permissions) {

    this.listPermits = [...this.listPermits].map(lt => {
      if (lt.all) {
        lt.permits = [...lt.permits].map(st => {
          st.permits = permissions.filter(pr => pr.slug.split('.')[0] == st.slug).map(pr => {
            return {
              name: pr.name,
              id: pr.id,
              slug: pr.slug,
              check: array.includes(pr.id),
              slugTask: lt.slug
            }
          })
          st.check = st.permits.filter(pr => pr.check).length > 0
          return st
        })
        lt.check = lt.permits.filter(pr => pr.check).length > 0
      } else {
        if (lt.only) {
          lt.id = permissions.filter(pr => pr.slug.split('.')[0] == lt.slug)[0].id
          lt.check = array.includes(lt.id)
        } else {
          lt.permits = permissions.filter(pr => pr.slug.split('.')[0] == lt.slug).map(pr => {
            return {
              name: pr.name,
              id: pr.id,
              slug: pr.slug,
              check: array.includes(pr.id),
              slugTask: lt.slug
            }
          })

          lt.check = lt.permits.filter(pr => pr.check).length > 0
        }
      }

      return lt
    })

    //this.loadingList = true
  }

  save() {
    this.buttonSubmit = true
    const permits = this.listPermits.map(lt => {
      if (lt.all) {
        return lt.permits.map(pr => {
          return pr.permits.filter(el => el.check).map(el => el.id)
        }).reduce((a, b) => a.concat(b), [])
      } else {
        if (lt.id) {
          return lt.check ? [lt.id] : []
        } else {
          return lt.permits.filter(el => el.check).map(el => el.id)
        }

      }
    }).reduce((a, b) => a.concat(b), [])
    let deleteList = this.rolPermits.filter(pt => !permits.includes(pt) && pt != 33)
    let addList = permits.filter(pt => !this.rolPermits.includes(pt))
    console.log(permits)
    console.log(deleteList)
    console.log(addList)

    if (deleteList.length) {
      const formDelete = new FormData();
      formDelete.append('role_id', this.activatedRoute.snapshot.params.id);
      formDelete.append('permission_id', deleteList.join(','));
      if (addList.length) {
        const formAdd = new FormData();
        formAdd.append('role_id', this.activatedRoute.snapshot.params.id);
        formAdd.append('permission_id', addList.join(','));

        combineLatest(
          this.roleService.addPermission(formAdd),
          this.roleService.deletePermission(formDelete)
        ).subscribe(res => {
          console.log(res)
          this.buttonSubmit = false
          Swal.fire({
            title: 'Editado',
            text: 'Se guardo los cambios',
            icon: 'success',
            heightAuto: false
          })
        })
      } else {
        this.roleService.deletePermission(formDelete).subscribe(res=>{
          this.buttonSubmit = false
          Swal.fire({
            title: 'Editado',
            text: 'Se guardo los cambios',
            icon: 'success',
            heightAuto: false
          })
        })
      }
    }else{
      if (addList.length) {
        const formAdd = new FormData();
        formAdd.append('role_id', this.activatedRoute.snapshot.params.id);
        formAdd.append('permission_id', addList.join(','));

        this.roleService.addPermission(formAdd).subscribe(res => {
          console.log(res)
          this.buttonSubmit = false
          Swal.fire({
            title: 'Editado',
            text: 'Se guardo los cambios',
            icon: 'success',
            heightAuto: false
          })
        })
      } else {
        this.buttonSubmit = false
        Swal.fire({
          title: 'Error',
          text: 'No hay cambios',
          icon: 'error',
          heightAuto: false
        })
      }
    }
  }

  saveNew(){
    this.buttonSubmit = true
    const permits = this.listPermits.map(lt => {
      if (lt.all) {
        return lt.permits.map(pr => {
          return pr.permits.filter(el => el.check).map(el => el.id)
        }).reduce((a, b) => a.concat(b), [])
      } else {
        if (lt.id) {
          return lt.check ? [lt.id] : []
        } else {
          return lt.permits.filter(el => el.check).map(el => el.id)
        }

      }
    }).reduce((a, b) => a.concat(b), [])
    const formAdd = new FormData();
    formAdd.append('name', this.rolForm.get('name').value);
    formAdd.append('description', this.rolForm.get('description').value);
    formAdd.append('permissions', permits.join(','));
    this.roleService.createRol(formAdd).subscribe(res => {
      console.log(res)
      this.buttonSubmit = false
      Swal.fire({
        title: 'Creado',
        text: 'Se guardo los cambios',
        icon: 'success',
        heightAuto: false
      })
      this.router.navigate(['/main/admin/roles'])
    })

  }
}
