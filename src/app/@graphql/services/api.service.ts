import { REGISTER_USER } from '@graphql/operations/mutation/user';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { LOGIN_QUERY, ME_DATA_QUERY, USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DocumentNode } from 'graphql';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  protected get(query: DocumentNode, variables: object = {}, context: object = {}, cache: boolean = true){
    return this.apollo.watchQuery({
      query,
      variables,
      context,
      fetchPolicy: (cache) ? 'network-only' : 'no-cache'
    }).valueChanges.pipe(map((result) => {
      return result.data;
    }));
  }

  protected set(mutation: DocumentNode, variables: object = {}, context: object = {}){
    return this.apollo.mutate({
      mutation,
      variables,
      context,
    }).pipe(
      map((result) => {
        return result.data;
      })
    );
  }
}
