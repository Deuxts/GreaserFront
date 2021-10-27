import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { NgModule } from '@angular/core';
import { ApolloLink } from 'apollo-link';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})

export class GraphqlModule {
  constructor(apollo: Apollo, httplink: HttpLink) {
    // para capturar errores de consulta o de red
    const errorLink = onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors) {
        console.log('ERROR DE GRAPHQL', graphQLErrors);
      }
      if (networkError) {
        console.log('ERROR DE GRAPHQL', networkError);
      }
    });
    const uri = 'https://greaser.herokuapp.com/graphql';
    const link = ApolloLink.from(
      [
        errorLink,
        httplink.create({uri})
      ]
    );
    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
