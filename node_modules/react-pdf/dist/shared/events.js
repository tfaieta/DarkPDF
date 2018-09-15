'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// As defined on the list of supported mouse events: https://facebook.github.io/react/docs/events.html#mouse-events
var mouseEvents = exports.mouseEvents = ['onClick', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp'];
// As defined on the list of supported touch events: https://facebook.github.io/react/docs/events.html#touch-events
var touchEvents = exports.touchEvents = ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'];

/**
 * Returns an object with on-event callback props curried with provided args.
 * @param {Object} props Props passed to a component.
 * @param {*} args Argument(s) that on-event callbacks shall be curried with.
 */
var makeEventProps = exports.makeEventProps = function makeEventProps(props, getArgs) {
  var eventProps = {};

  [].concat(mouseEvents, touchEvents).forEach(function (eventName) {
    if (props[eventName]) {
      eventProps[eventName] = function (event) {
        return props[eventName](event, getArgs());
      };
    }
  });

  return eventProps;
};