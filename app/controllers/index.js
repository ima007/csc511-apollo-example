import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['term'],
  term: null,
  actions: {
    submitter(term) {
      const businesses = this.get('model.business');
      const business = businesses.findBy('name', term);
      if (business) {
        this.transitionToRoute('details', business.id);
      } else {
        const getFirstId = this.get('model.business.firstObject.id');
        if (getFirstId) {
          this.transitionToRoute('details', getFirstId);
        }
      }
    }
  }
});
