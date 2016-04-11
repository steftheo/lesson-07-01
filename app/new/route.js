import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return fetch(apiUrl)
    .then((res) => res.json());
  },
});
