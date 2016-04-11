import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return fetch(`https://tiny-tn.herokuapp.com/collections/heroes/${params._id}`)
      .then((res) => {
        return res.json();
      });
  }
});
