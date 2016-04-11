import Ember from 'ember';

export default Ember.Controller.extend({
  heroes: Ember.inject.service(`heroes`),

  upVoteHero(hero) {
    Ember.set(hero, `score`, parseInt(hero.score) + 1);
    this.get('heroes').update(hero);
  },

  downVoteHero(hero) {
    Ember.set(hero, `score`, parseInt(hero.score) - 1);
    this.get('heroes').update(hero);
  },
});
