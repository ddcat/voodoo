// ----------------------------------------------------------------------------
// File: ModelTests.js
//
// Copyright (c) 2013 VoodooJs Authors
// ----------------------------------------------------------------------------



/**
 * Global counter class used to record counts of different options.
 *
 * @constructor
 */
function Counters() {
  this.reset();
}


/**
  * Resets all counters.
  */
Counters.prototype.reset = function() {
  this.viewLoad = 0;
  this.viewUnload = 0;
  this.viewSetProperty = 0;

  this.stencilViewLoad = 0;
  this.stencilViewUnload = 0;
  this.stencilViewSetProperty = 0;

  this.modelInitialize = 0;
  this.modelCleanUp = 0;
  this.modelSetUpViews = 0;
  this.modelTearDownViews = 0;
};


/**
 * Global counters object.
 */
var globalCounters = new Counters();



/**
 * A view to count how many times different methods are called.
 *
 * @constructor
 */
var HookedView = voodoo.View.extend({
  load: function() {
    assertNotNull(this.model);
    assertNotNull(this.camera);
    assertNotNull(this.scene);
    assertNotNull(this.triggers);
    assertNotNull(this.renderer);

    globalCounters.viewLoad++;
  },
  unload: function() { globalCounters.viewUnload++; },
  setProperty: function() { globalCounters.viewSetProperty++; }
});



/**
 * A stencil view to count how many times different methods are called.
 *
 * @constructor
 */
var HookedStencilView = voodoo.View.extend({
  load: function() { globalCounters.stencilViewLoad++; },
  unload: function() { globalCounters.stencilViewUnload++; },
  setProperty: function() { globalCounters.stencilViewSetProperty++; }
});



/**
 * A simple model used for testing that model and view methods are called.
 *
 * @constructor
 */
HookedModel = voodoo.Model.extend({
  name: 'HookedModel',
  viewType: HookedView,
  initialize: function() { globalCounters.modelInitialize++ },
  cleanUp: function() { globalCounters.modelCleanUp++ },
  setUpViews: function() { globalCounters.modelSetUpViews++ },
  tearDownViews: function() { globalCounters.modelTearDownViews++ },
  setProperty: function() { this.view.setProperty(); }
});



/**
 * A simple model used for testing that model, view, and stencil view methods
 * are called.
 *
 * @constructor
 */
HookedStencilModel = voodoo.Model.extend({
  name: 'HookedStencilModel',
  viewType: HookedView,
  stencilViewType: HookedStencilView,
  setProperty: function() {
    this.view.setProperty();
    this.stencilView.setProperty();
  }
});



/**
 * Test cases to make sure new models work as expected.
 *
 * @constructor
 */
ModelTests = TestCase('ModelTests');


/**
 * Test case setup. Runs once before each test.
 */
ModelTests.prototype.setUp = function() {
  // Reset counters before each test case.
  globalCounters.reset();

  // Create an engine with no antialiasing so no seam layers.
  voodoo.engine = new voodoo.Engine({ antialias: false, stencils: true });
};


/**
 * Shutdown the engine between test cases.
 */
ModelTests.prototype.tearDown = function() {
  if (typeof voodoo.engine !== 'undefined')
    voodoo.engine.destroy();
};


/**
 * Tests that the voodoo engine is automatically created when a model
 * is created.
 */
ModelTests.prototype.testAutomaticEngineCreation = function() {
  if (typeof voodoo.engine !== 'undefined')
    voodoo.engine.destroy();

  new HookedModel();
  assertTrue(typeof voodoo.engine !== 'undefined');
};


/**
 * Tests that the composite view forwards all functions to all views.
 */
ModelTests.prototype.testCreateModel = function() {
  assertEquals(0, globalCounters.modelInitialize);
  assertEquals(0, globalCounters.modelSetUpViews);

  var model = new HookedModel();

  assertEquals(1, globalCounters.modelInitialize);
  assertEquals(1, globalCounters.modelSetUpViews);
};


/**
 * Tests that the composite view forwards all functions to all views.
 */
ModelTests.prototype.testCompositeView = function() {
  assertEquals(0, globalCounters.viewLoad);

  var model = new HookedModel();

  assertEquals(3, globalCounters.viewLoad);
  assertEquals(0, globalCounters.viewSetProperty);

  model.setProperty();
  assertEquals(3, globalCounters.viewSetProperty);
};


/**
 * Tests that the composite stencil view forwards all functions to all
 * stencil views.
 */
ModelTests.prototype.testCompositeStencilView = function() {
  assertEquals(0, globalCounters.viewLoad);
  assertEquals(0, globalCounters.stencilViewLoad);

  var model = new HookedStencilModel();
  assertEquals(2, globalCounters.viewLoad);
  assertEquals(1, globalCounters.stencilViewLoad);
  assertEquals(0, globalCounters.viewSetProperty);
  assertEquals(0, globalCounters.stencilViewSetProperty);

  model.setProperty();
  assertEquals(2, globalCounters.viewSetProperty);
  assertEquals(1, globalCounters.stencilViewSetProperty);
};


/**
 * Tests that the composite stencil view forwards all functions to all
 * stencil views.
 */
ModelTests.prototype.testDestroyModel = function() {
  voodoo.engine = new voodoo.Engine({ standardLighting: false });

  var model = new HookedModel();
  assertEquals(1, voodoo.engine.models.length);
  assertEquals(0, globalCounters.modelTearDownViews);
  assertEquals(0, globalCounters.modelCleanUp);

  model.destroy();
  assertEquals(0, voodoo.engine.models.length);
  assertEquals(1, globalCounters.modelTearDownViews);
  assertEquals(1, globalCounters.modelCleanUp);
};


/**
 * Tests that the composite stencil view forwards all functions to all
 * stencil views.
 */
ModelTests.prototype.testDestroyViews = function() {
  var model = new HookedStencilModel();
  assertEquals(0, globalCounters.viewUnload);
  assertEquals(0, globalCounters.stencilViewUnload);

  model.destroy();
  assertEquals(2, globalCounters.viewUnload);
  assertEquals(1, globalCounters.stencilViewUnload);
};
