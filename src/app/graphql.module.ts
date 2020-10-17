import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache, makeVar} from '@apollo/client/cache';
import { ApolloLink } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';

const uri = '';

@NgModule({
  providers: [
    {
        provide: APOLLO_OPTIONS,
        useFactory(httpLink: HttpLink) {
            const http = httpLink.create({uri});
            const middleware = new ApolloLink((operation, forward) => {
                operation.setContext({
                    headers: new HttpHeaders().set(
                    'x-api-key',
                    ``,
                    ),
                });
                return forward(operation);
            });

            const link = middleware.concat(http);
            return {
                cache: new InMemoryCache(),
                link
            };
        },
        deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
