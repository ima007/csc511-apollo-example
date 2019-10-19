import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'ember-apollo-example/gql/queries/businessDetails';
import RSVP from 'rsvp';

export default Route.extend({
  apollo: queryManager(),
  model(params) {
    const variables = { id: params.id };
    return RSVP.hash({
      business: this.apollo.watchQuery({ query, variables }, 'business'),
      favorite: this.store
        .query('favorite', {
          filter: {
            yelpid: params.id
          }
        })
        .then(favorites => {
          return favorites.get('firstObject');
        })
    });
  }
});
