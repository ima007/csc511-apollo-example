import Controller from '@ember/controller';
import { throttle } from '@ember/runloop';

export default Controller.extend({
  queryParams: ['term'],
  term: null,
  actions: {
    updateTerm() {
      debugger;
      throttle(() => {
        this.set('term');
      }, 1000);
    }
  }
});
