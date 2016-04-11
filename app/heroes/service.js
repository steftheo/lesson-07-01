import Ember from 'ember';

function replace(arr, item) {
  return arr.reduce((carry, curr) => {
    // Check if this is the item we are trying to replace
    if (curr._id === item._id) {
      // Add the replace value to the end of the snoball
      return [...carry, item];
    }

    // Add the current item to the end of the snoball
    return [...carry, curr];
  }, []);
}

export default Ember.Service.extend({
  apiUrl: `https://tiny-tn.herokuapp.com/collections/sj-heroes`,
  store: [],
  loaded: false,

  findAll() {
    if (this.loaded) {
      return this.store;
    }

    return fetch(this.apiUrl)
      .then((res) => {
        return res.json();
      }).then((result) => {
        this.set(`store`, result);
        this.set(`loaded`, true);

        return result;
      });
  },

  findById(id) {
    const existing = this.store.find((hero) => {
      return hero._id === id;
    });

    if (existing) {
      return existing;
    }

    return fetch(`https://tiny-tn.herokuapp.com/collections/heroes/${id}`)
      .then((res) => {
        return res.json();
      });
  },

  update(hero) {
    return fetch(`https://tiny-tn.herokuapp.com/collections/heroes/${hero._id}`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(hero),
    }).then((res) => {
      return res.json();
    }).then((result) => {
      this.set(`store`, replace(this.store, result));
    });
  },

  addNewHero() {
    const attributes = {
      name: this.name,
      score: 0,
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
