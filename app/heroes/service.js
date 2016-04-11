import Ember from 'ember';

export default Ember.Service.extend({
  apiUrl: `https://tiny-tn.herokuapp.com/collections/heroes`,
  data: [],
  loaded: false,

  findAll() {
    if (this.loaded) {
      return this.data;
    }

    return fetch(this.apiUrl)
      .then((res) => {
        return res.json();
      }).then((result) => {
        this.set(`data`, result);
        this.set(`loaded`, true);

        return result;
      });
  },
});
