// ----------------------------------------------------------------------------
// File: Options.js
//
// Copyright (c) 2013 VoodooJs Authors
// ----------------------------------------------------------------------------



/**
 * General options for initializing the voodoo engine. Pass this to the
 * Engine when it is being created.
 *
 * @constructor
 *
 * @param {Object=} opt_options Options settings to set.
 */
function Options(opt_options) {
  log_.information_('Creating Options');

  if (typeof opt_options !== 'undefined')
    for (var key in opt_options)
      this[key] = opt_options[key];
}


/**
 * Whether to create the above canvas that renders Z > 0. The user may wish
 * to disable this completely when they are sure there will be no 3D content
 * above the page.
 *
 * Default is true.
 *
 * @type {boolean}
 */
Options.prototype['aboveLayer'] = true;


/**
 * CSS Z Index style for the above canvas.
 *
 * Default is 9999.
 *
 * @type {number}
 */
Options.prototype['aboveZIndex'] = 9999;


/**
 * Whether anti-aliasing should be enabled or not.
 *
 * Default is true.
 *
 * @type {boolean}
 */
Options.prototype['antialias'] = true;


/**
 * Whether to create the below canvas that renders Z < 0. The user may wish
 * to disable this completely when they are sure there will be no 3D content
 * behind the page.
 *
 * Default is true.
 *
 * @type {boolean}
 */
Options.prototype['belowLayer'] = true;


/**
 * CSS Z Index style for the below canvas.
 *
 * Default is -1.
 *
 * @type {number}
 */
Options.prototype['belowZIndex'] = -1;


/**
 * Max time in milliseconds between clicks to count as a double click.
 *
 * @private
 * @const
 * @type {number}
 */
Options.prototype.doubleClickInterval_ = 500;


/**
 * Camera field of view in degrees along the y axis.
 *
 * Default is 30.
 *
 * @type {number}
 */
Options.prototype['fovY'] = 30;


/**
 * Whether to automatically render and update each frame.
 *
 * Default is true. If this is false, then the user must call
 * voodoo.engine.frame() to render and update.
 *
 * @type {boolean}
 */
Options.prototype['frameLoop'] = true;


/**
 * Whether to render every time the page is scrolled or resized, creating a
 * very consistent experience at the expense of performance, or to render only
 * when requestAnimationFrame runs, which is less frequent. If true, this
 * also performs mouse raycasts in real-time rather than only on updates.
 *
 * Default is true.
 *
 * @type {boolean}
 */
Options.prototype['realtime'] = true;


/**
 * 3D rendering engine to use.
 *
 * Default is ThreeJs.
 *
 * @type {Renderer}
 */
Options.prototype['renderer'] = Renderer['ThreeJs'];


/**
 * Number of 'pixels' along the z axis that the buffer contains.
 * The higher we go, the less chance we have of a seam, but the more
 * we overlap the antialiased scene with an unantialised seam.
 *
 * Default is 10.
 *
 * @private
 * @type {number}
 */
Options.prototype.seamPixels_ = 10;


/**
 * Whether to connect the seam between the above and below layers when
 * using antialiasing. This results in an additional render layer and
 * may affect performance. If antialiasing is false, this has no effect.
 *
 * Default is true.
 *
 * @type {boolean}
 */
Options.prototype['seamLayer'] = true;


/**
 * The z-index for the seam layer. This should always be higher than the
 * above layer z-index.
 *
 * Default is 10000.
 *
 * @type {number}
 */
Options.prototype['seamZIndex'] = 10000;


/**
 * Whether to create a standard white ambient light and white camera light.
 *
 * Default is true. If this is false, no standard lights are created and the
 * user is responsible for creating any.
 *
 * @type {boolean}
 */
Options.prototype['standardLighting'] = true;


/**
 * Whether to enable the stencil layers and the use of stencil views.
 *
 * Default is true.
 *
 * @type {boolean}
 */
Options.prototype['stencils'] = true;


/**
 * The time to wait in milliseconds before updating when the page regains focus.
 *
 * Default is 350.
 *
 * @private
 * @type {number}
 */
Options.prototype.timerStartOnFocusDelayMs_ = 350;


/**
 * The time to wait in milliseconds before updating when the page first loads.
 *
 * Default is 1000.
 *
 * @private
 * @type {number}
 */
Options.prototype.timerStartOnLoadDelayMs_ = 1000;


/**
 * Maximum z distance rendered.
 *
 * Default is 10000.
 *
 * @private
 * @type {number}
 */
Options.prototype.zFar_ = 10000;


/**
 * Minimum z distance rendered.
 *
 * Default is 0.1.
 *
 * @private
 * @type {number}
 */
Options.prototype.zNear_ = 0.1;

// Exports
this['Options'] = Options;
