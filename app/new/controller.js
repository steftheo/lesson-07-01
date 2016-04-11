import Ember from 'ember';

export default Ember.Controller.extend({
  addNewHero() {
    const attributes = {
      name: this.name,
      score: this.score,
    };

    fetch(`https://tiny-tn.herokuapp.com/collections/sj-heroes`, {
        method: `POST`,
        headers: {
          Accept: `application/json`,
          'Content-type': `application/json`,
        },
      body: JSON.stringify(attributes),
      }).then((response) => response.json())
      .then((hero) => {
        this.saveNewHero(hero);
        this.clearForm();
      });
  },

  saveNewHero(hero) {
    this.set(`model`, [hero, ...this.model]);
  },

  clearForm() {
    this.set(`name`, ``);
  },
});
