import Ember from 'ember';

export default Ember.Route.extend({
  heroes: Ember.inject.service(`heroes`),

  model(params) {
    return this.get(`heroes`).findById(params._id);
  }
});
