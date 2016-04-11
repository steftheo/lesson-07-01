import Ember from 'ember';

export default Ember.Controller.extend({
  heroes: Ember.inject.service(`heroes`),

  saveHero(hero) {
    this.get(`heroes`).update(hero).then(() => {
      this.transitionToRoute(`index`);
    });
  },
});
