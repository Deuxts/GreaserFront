import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { DocumentNode } from 'graphql';
import { ITableColums } from '@core/interfaces/table-columns.interface';
import { optionsDetails, userFormBasicDialog } from '@shared/alerts/alert';
import { UsersAdminService } from './users-admin.service';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { basicAlert } from '@shared/alerts/toast';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  query: DocumentNode = USERS_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColums>;
  constructor(private service: UsersAdminService){}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10,
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users'
    };
    this.include = true;

    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'name',
        label: 'Nombre del género'
      },
      {
        property: 'lastname',
        label: 'Apellido'
      },
      {
        property: 'email',
        label: 'Correo  '
      },
      {
        property: 'role',
        label: 'Permisos '
      }
    ];
  }

  private inicForm(user: any){
    const defaultName = user.name !== undefined && user.name !== '' ? user.name : '';
    const defaultLastname = user.lastname !== undefined && user.lastname !== '' ? user.lastname : '';
    const defaultEmail = user.email !== undefined && user.email !== '' ? user.email : '';
    const rols = new Array(2);
    rols[0] = user.role !== undefined && user.role === 'ADMIN' ? 'selected' : '';
    rols[1] = user.role !== undefined && user.role === 'CLIENT' ? 'selected' : '';
    return `
    <input id="name" value="${defaultName}" class="swal2-input" placeholder="Nombre" required>
    <input id="lastname" value="${defaultLastname}" class="swal2-input" placeholder="Apellido" required>
    <input id="email" value="${defaultEmail}" class="swal2-input" placeholder="Email" required [pattern]="rexEmail"">
    <select id="role" class="swal2-input">
      <option value= "ADMIN" ${rols[0]}> Administrador </option>
      <option value= "CLIENT" ${rols[1]}> Cliente </option>
    `;
  }

  async takeAction($event){
    // Mediante switch se haran las operaciones
    const action = $event[0];
    const user = $event[1];
    // se toman los valores por defecto en el caso de estar vacios
    const html =  this.inicForm(user);
    // a partir de aqui se ejecutan distintas acciones
    switch (action) {
      case 'add':
        // se inicia el proceso de añadir
        this.addForm(html);
        break;
      case 'edit':
        // se inicia el proceso actualizar
        this.updateForm(html, user);
        break;
      case 'info':
        // se visualiza la info
        const result = await optionsDetails('Detalles del usuario', `${user.name} ${user.lastname} <br> ${user.email} `, 'Editar', ' Bloquear');
        if (result === false) {
          this.blockForm(user);
        } else if (result === true) {
          this.updateForm(html, user);
        }
        console.log(result);
        break;
      case 'block':
        // se inicia el proceso de añadir
        this.blockForm(user);
        break;
    default:
        break;
    }
  }

  private async addForm(html: string) {
    const result = await userFormBasicDialog('Añadir Usuario', html);
    console.log(result);
    this.addUser(result);
    return;
  }

  private addUser(result){
    if (result.value) {
      const user: IRegisterForm = result.value;
      user.password = '1234';
      user.active = false;
      this.service.register(user).subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private async updateForm(html: string, user: any) {
    const result = await userFormBasicDialog('Modificar usuario', html);
    console.log(result);
    this.updateUser(result, user.id, user.password);
  }

  private updateUser(result, id: string, password: string) {
    if (result.value) {
      const user = result.value;
      user.id = id;
      user.password = password;
      console.log(user);
      this.service.update(result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private async blockForm(user: any){
    const result = await optionsDetails('Estas seguro de bloquear?', `Si bloqueas el item seleccionado no se mostrara`, 'No bloquear', ' Bloquear');
    if (result === false) {
      this.blockUser(user.id);
    }
    return;
  }

  private blockUser(id: string){
    this.service.block(id).subscribe((res: any) => {
      console.log(res);
      if (res.status === true) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

}
