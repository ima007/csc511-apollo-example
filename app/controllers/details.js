import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save() {
      const favorite = this.store.createRecord('favorite', {
        name: this.get('model.business.name'),
        yelpid: this.get('model.business.id')
      });
      favorite.save().then(() => {
        this.set('model.favorite', favorite);
      });
    },
    unsave() {
      this.get('model.favorite')
        .destroyRecord()
        .then(() => {
          this.set('model.favorite', undefined);
        });
    }
  }
});
