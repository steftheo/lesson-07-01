import Ember from 'ember';

export default Ember.Controller.extend({
  saveHero(hero) {
    fetch(`https://tiny-tn.herokuapp.com/collections/heroes/${hero._id}`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(hero),
    }).then((res) => {
      return res.json();
    }).then((result) => {
      this.transitionToRoute(`index`);
    });
  },
});
