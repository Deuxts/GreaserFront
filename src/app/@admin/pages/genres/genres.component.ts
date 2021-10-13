import { basicAlert } from 'src/app/@shared/alerts/toast';
import { GenresService } from './genres.service';
import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColums } from '@core/interfaces/table-columns.interface';
import { GENRE_LIST_QUERY } from '@graphql/operations/query/genre';
import { formBasicDialog, optionsDetails } from '@shared/alerts/alert';
import { DocumentNode } from 'graphql';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  query: DocumentNode = GENRE_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColums>;
  constructor(private service: GenresService) { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10,
    this.resultData = {
      listKey: 'genres',
      definitionKey: 'genres'
    };
    this.include = false;
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
        property: 'slug',
        label: 'Slug'
      }
  ];
  }

  async takeAction($event){
    // Mediante switch se haran las operaciones
    const action = $event[0];
    const genre = $event[1];
    // se toman los valores por defecto en el caso de estar vacios
    const defaultValue = genre.name !== undefined && genre.name !== '' ? genre.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;
    // a partir de aqui se ejecutan distintas acciones
    switch (action) {
      case 'add':
        // se inicia el proceso de añadir
        this.addFrom(html);
        break;
      case 'edit':
        // se inicia el proceso actualizar
        this.updateForm(html, genre);
        break;
      case 'info':
        // se visualiza la info
        const result = await optionsDetails('Detalles del Genero', `${genre.name} (${genre.slug})`, 'Editar', ' Bloquear');
        if (result === false) {
          this.blockForm(genre);
        } else if (result === true) {
          this.updateForm(html, genre);
        }
        console.log(result);
        break;
      case 'block':
        // se inicia el proceso de añadir
        this.blockForm(genre);
        break;
    default:
        break;
    }
  }

  private async addFrom(html: string) {
    const result = await formBasicDialog('Añadir género', html, 'name');
    console.log(result);
    this.addGenre(result);
    return;
  }

  private async blockForm(genre: any){
    const result = await optionsDetails('Estas seguro de bloquear?', `Si bloqueas el item seleccionado no se mostrara`, 'No bloquear', ' Bloquear');
    if (result === false) {
      this.blockGenre(genre.id);
    }
    return;
  }

  private async updateForm(html: string, genre: any){
    const result = await formBasicDialog('Editar género', html, 'name');
    console.log(result);
    this.updateGenre(genre.id, result);
  }

  private addGenre(result){
    if (result.value) {
      this.service.add(result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private updateGenre(id: string, result){
    console.log(id, result.value);
    if (result.value) {
      this.service.update(id, result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private blockGenre(id: string){
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
