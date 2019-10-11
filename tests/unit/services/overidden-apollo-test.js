import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | OveriddenApollo', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:overidden-apollo');
    assert.ok(service);
  });
});
