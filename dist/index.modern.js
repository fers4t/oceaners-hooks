import React__default, { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo, createElement } from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';

function useDebounce(value, delay) {
  var _useState = useState(value),
      debouncedValue = _useState[0],
      setDebouncedValue = _useState[1];

  useEffect(function () {
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay);
    return function () {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function useActive() {
  var _React$useState = React__default.useState(false),
      isActive = _React$useState[0],
      setActive = _React$useState[1];

  var bind = React__default.useMemo(function () {
    return {
      onMouseDown: function onMouseDown() {
        return void setActive(true);
      },
      onMouseUp: function onMouseUp() {
        return void setActive(false);
      }
    };
  }, []);
  return [isActive, bind];
}

function useEventListener(element, eventType, listener, options) {
  var listenerRef = useRef(listener);
  listenerRef.current = listener;
  var memorizedOptions = useDeepCompareMemo(function () {
    return options;
  }, [options]);
  useEffect(function () {
    if (!element) return undefined;

    var wrappedListener = function wrappedListener(evt) {
      return listenerRef.current.call(element, evt);
    };

    element.addEventListener(eventType, wrappedListener, memorizedOptions);
    return function () {
      element.removeEventListener(eventType, wrappedListener, memorizedOptions);
    };
  }, [element, eventType, memorizedOptions]);
}

function useFocus() {
  var _React$useState = React__default.useState(false),
      isFocused = _React$useState[0],
      setFocused = _React$useState[1];

  var bind = React__default.useMemo(function () {
    return {
      onFocus: function onFocus() {
        return void setFocused(true);
      },
      onBlur: function onBlur() {
        return void setFocused(false);
      }
    };
  }, []);
  return [isFocused, bind];
}

function useClickAwayListener(ref, handler, mouseEvent) {
  if (mouseEvent === void 0) {
    mouseEvent = 'mousedown';
  }

  useEventListener(ref.current, mouseEvent, function (event) {
    var el = ref === null || ref === void 0 ? void 0 : ref.current;

    if (!el || el.contains(event.target)) {
      return;
    }

    handler(event);
  });
}

var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function useHover() {
  var _React$useState = React__default.useState(false),
      isHovered = _React$useState[0],
      setHovered = _React$useState[1];

  var bind = React__default.useMemo(function () {
    return {
      onMouseEnter: function onMouseEnter() {
        return void setHovered(true);
      },
      onMouseLeave: function onMouseLeave() {
        return void setHovered(false);
      }
    };
  }, []);
  return [isHovered, bind];
}

function useWindowResize() {
  var _React$useState = React__default.useState(window.innerWidth),
      width = _React$useState[0],
      setWidth = _React$useState[1];

  var _React$useState2 = React__default.useState(window.innerHeight),
      height = _React$useState2[0],
      setHeight = _React$useState2[1];

  var resize = React__default.useCallback(function () {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);
  React__default.useEffect(function () {
    window.addEventListener('resize', resize);
    return function () {
      return void window.removeEventListener('resize', resize);
    };
  }, [resize]);
  return [width, height];
}

var defaultState = {
  angle: 0,
  type: 'landscape-primary'
};

var useDeviceOrientation = function useDeviceOrientation(initialState) {
  if (initialState === void 0) {
    initialState = defaultState;
  }

  var _useState = useState(initialState),
      state = _useState[0],
      setState = _useState[1];

  var onOrientationChangeEvent = function onOrientationChangeEvent() {
    var _screen = screen,
        orientation = _screen.orientation;
    var angle = orientation.angle,
        type = orientation.type;

    if (!orientation) {
      setState(initialState);
    }

    setState({
      angle: angle,
      type: type
    });
  };

  useEffect(function () {
    window.addEventListener('orientationchange', onOrientationChangeEvent, true);
    return function () {
      window.addEventListener('orientationchange', onOrientationChangeEvent, true);
    };
  }, []);
  return state;
};

var useIsOnline = function useIsOnline() {
  var _useState = useState(navigator.onLine),
      state = _useState[0],
      setState = _useState[1];

  var onOnlineEvent = function onOnlineEvent() {
    setState(navigator.onLine);
  };

  var onOfflineEvent = function onOfflineEvent() {
    setState(navigator.onLine);
  };

  useEffect(function () {
    window.addEventListener('online', onOnlineEvent);
    window.addEventListener('offline', onOfflineEvent);
    return function () {
      window.removeEventListener('online', onOnlineEvent);
      window.removeEventListener('offline', onOfflineEvent);
    };
  });
  return state;
};

var defaultValue = 200;

var useVibrate = function useVibrate(value) {
  if (value === void 0) {
    value = defaultValue;
  }

  var vibrate = function vibrate() {
    return useCallback(function () {
      navigator.vibrate(value);
    }, []);
  };

  return vibrate;
};

var useWindowScrollPosition = function useWindowScrollPosition(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$throttleMs = _ref.throttleMs,
      throttleMs = _ref$throttleMs === void 0 ? 100 : _ref$throttleMs;

  var _React$useState = React__default.useState({
    x: window.pageXOffset,
    y: window.pageYOffset
  }),
      scroll = _React$useState[0],
      setScroll = _React$useState[1];

  var handle = throttle(function () {
    setScroll({
      x: window.pageXOffset,
      y: window.pageYOffset
    });
  }, throttleMs);
  React__default.useEffect(function () {
    window.addEventListener('scroll', handle);
    return function () {
      window.removeEventListener('scroll', handle);
    };
  }, []);
  return scroll;
};

function throttle(func, threshold, scope) {
  if (threshold === void 0) {
    threshold = 250;
  }

  var last, deferTimer;
  return function () {
    var context = scope || this;
    var now = Date.now(),
        args = arguments;

    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        func.apply(context, args);
      }, threshold);
    } else {
      last = now;
      func.apply(context, args);
    }
  };
}

function useStateful(initial) {
  var _useState = useState(initial),
      value = _useState[0],
      setValue = _useState[1];

  return useMemo(function () {
    return {
      value: value,
      setValue: setValue
    };
  }, [value]);
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function useBoolean(initial) {
  var _useState = useState(initial),
      value = _useState[0],
      setValue = _useState[1];

  var toggle = useCallback(function () {
    return setValue(function (v) {
      return !v;
    });
  }, []);
  var setTrue = useCallback(function () {
    return setValue(true);
  }, []);
  var setFalse = useCallback(function () {
    return setValue(false);
  }, []);
  var actions = useMemo(function () {
    return {
      setValue: setValue,
      toggle: toggle,
      setTrue: setTrue,
      setFalse: setFalse
    };
  }, [setFalse, setTrue, toggle]);
  return useMemo(function () {
    return [value, actions];
  }, [actions, value]);
}

function useBoolean$1(initial) {
  var _useBooleanArray = useBoolean(initial),
      value = _useBooleanArray[0],
      actions = _useBooleanArray[1];

  return useMemo(function () {
    return _extends({
      value: value
    }, actions);
  }, [actions, value]);
}

function useNumber(initial, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      upperLimit = _ref.upperLimit,
      lowerLimit = _ref.lowerLimit,
      loop = _ref.loop,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step;

  var _useState = useState(initial),
      value = _useState[0],
      setValue = _useState[1];

  var decrease = useCallback(function (d) {
    setValue(function (aValue) {
      var decreaseBy = d !== undefined ? d : step;
      var nextValue = aValue - decreaseBy;

      if (lowerLimit !== undefined) {
        if (nextValue < lowerLimit) {
          if (loop && upperLimit) {
            return upperLimit;
          }

          return lowerLimit;
        }
      }

      return nextValue;
    });
  }, [loop, lowerLimit, step, upperLimit]);
  var increase = useCallback(function (i) {
    setValue(function (aValue) {
      var increaseBy = i !== undefined ? i : step;
      var nextValue = aValue + increaseBy;

      if (upperLimit !== undefined) {
        if (nextValue > upperLimit) {
          if (loop && lowerLimit) {
            return lowerLimit;
          }

          return upperLimit;
        }
      }

      return nextValue;
    });
  }, [loop, step, upperLimit, lowerLimit]);
  var actions = useMemo(function () {
    return {
      setValue: setValue,
      increase: increase,
      decrease: decrease
    };
  }, [decrease, increase]);
  return [value, actions];
}

function useNumber$1(initial, options) {
  if (options === void 0) {
    options = {};
  }

  var _useNumberArray = useNumber(initial, options),
      value = _useNumberArray[0],
      actions = _useNumberArray[1];

  return useMemo(function () {
    return _extends({
      value: value
    }, actions);
  }, [actions, value]);
}

function useArray(initial) {
  var _useState = useState(initial),
      value = _useState[0],
      setValue = _useState[1];

  var push = useCallback(function (a) {
    setValue(function (v) {
      return [].concat(v, Array.isArray(a) ? a : [a]);
    });
  }, []);
  var unshift = useCallback(function (a) {
    return setValue(function (v) {
      return [].concat(Array.isArray(a) ? a : [a], v);
    });
  }, []);
  var pop = useCallback(function () {
    return setValue(function (v) {
      return v.slice(0, -1);
    });
  }, []);
  var shift = useCallback(function () {
    return setValue(function (v) {
      return v.slice(1);
    });
  }, []);
  var move = useCallback(function (from, to) {
    return setValue(function (it) {
      var copy = it.slice();
      copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0]);
      return copy;
    });
  }, []);
  var clear = useCallback(function () {
    return setValue(function () {
      return [];
    });
  }, []);
  var removeById = useCallback(function (id) {
    return setValue(function (arr) {
      return arr.filter(function (v) {
        return v && v.id !== id;
      });
    });
  }, []);
  var removeIndex = useCallback(function (index) {
    return setValue(function (v) {
      var copy = v.slice();
      copy.splice(index, 1);
      return copy;
    });
  }, []);
  var modifyById = useCallback(function (id, newValue) {
    return setValue(function (arr) {
      return arr.map(function (v) {
        return v.id === id ? _extends({}, v, newValue) : v;
      });
    });
  }, []);
  var actions = useMemo(function () {
    return {
      setValue: setValue,
      add: push,
      unshift: unshift,
      push: push,
      move: move,
      clear: clear,
      removeById: removeById,
      removeIndex: removeIndex,
      pop: pop,
      shift: shift,
      modifyById: modifyById
    };
  }, [modifyById, push, unshift, move, clear, removeById, removeIndex, pop, shift]);
  return [value, actions];
}

function useArray$1(initial) {
  var _useArrayArray = useArray(initial),
      value = _useArrayArray[0],
      actions = _useArrayArray[1];

  return useMemo(function () {
    return _extends({
      value: value
    }, actions);
  }, [actions, value]);
}

function useMap(initialState) {
  if (initialState === void 0) {
    initialState = new Map();
  }

  var _useState = useState(Array.isArray(initialState) ? new Map(initialState) : initialState),
      map = _useState[0],
      setMap = _useState[1];

  var set = useCallback(function (key, value) {
    setMap(function (aMap) {
      var copy = new Map(aMap);
      return copy.set(key, value);
    });
  }, []);
  var deleteByKey = useCallback(function (key) {
    setMap(function (_map) {
      var copy = new Map(_map);
      copy["delete"](key);
      return copy;
    });
  }, []);
  var clear = useCallback(function () {
    setMap(function () {
      return new Map();
    });
  }, []);
  var initialize = useCallback(function (mapOrTuple) {
    if (mapOrTuple === void 0) {
      mapOrTuple = [];
    }

    setMap(function () {
      return new Map(mapOrTuple);
    });
  }, []);
  var actions = useMemo(function () {
    return {
      setValue: setMap,
      clear: clear,
      set: set,
      remove: deleteByKey,
      "delete": deleteByKey,
      initialize: initialize
    };
  }, [clear, deleteByKey, initialize, set]);
  return [map, actions];
}

function useMap$1(initialState) {
  if (initialState === void 0) {
    initialState = new Map();
  }

  var _useMapArray = useMap(initialState),
      map = _useMapArray[0],
      actions = _useMapArray[1];

  return useMemo(function () {
    return _extends({
      value: map
    }, actions);
  }, [actions, map]);
}

var usePageLoaded = function usePageLoaded() {
  var _useBoolean = useBoolean$1(false),
      value = _useBoolean.value,
      setTrue = _useBoolean.setTrue;

  useEffect(function () {
    window.onload = function () {
      return setTrue();
    };
  }, [setTrue]);
  return value;
};

function useElementSize() {
  var _useState = useState(null),
      ref = _useState[0],
      setRef = _useState[1];

  var _useState2 = useState({
    width: 0,
    height: 0
  }),
      size = _useState2[0],
      setSize = _useState2[1];

  var handleSize = useCallback(function () {
    setSize({
      width: (ref === null || ref === void 0 ? void 0 : ref.offsetWidth) || 0,
      height: (ref === null || ref === void 0 ? void 0 : ref.offsetHeight) || 0
    });
  }, [ref === null || ref === void 0 ? void 0 : ref.offsetHeight, ref === null || ref === void 0 ? void 0 : ref.offsetWidth]);
  useEventListener(window, 'resize', handleSize, {
    capture: true
  });
  useIsomorphicLayoutEffect(function () {
    handleSize();
  }, [ref === null || ref === void 0 ? void 0 : ref.offsetHeight, ref === null || ref === void 0 ? void 0 : ref.offsetWidth]);
  return [setRef, size];
}

function useStep(maxStep) {
  var _useState = useState(1),
      currentStep = _useState[0],
      setCurrentStep = _useState[1];

  var canGoToNextStep = useMemo(function () {
    return currentStep + 1 <= maxStep;
  }, [currentStep, maxStep]);
  var canGoToPrevStep = useMemo(function () {
    return currentStep - 1 >= 1;
  }, [currentStep]);
  var setStep = useCallback(function (step) {
    var newStep = step instanceof Function ? step(currentStep) : step;

    if (newStep >= 1 && newStep <= maxStep) {
      setCurrentStep(newStep);
      return;
    }

    throw new Error('Step not valid');
  }, [maxStep, currentStep]);
  var goToNextStep = useCallback(function () {
    if (canGoToNextStep) {
      setCurrentStep(function (step) {
        return step + 1;
      });
    }
  }, [canGoToNextStep]);
  var goToPrevStep = useCallback(function () {
    if (canGoToPrevStep) {
      setCurrentStep(function (step) {
        return step - 1;
      });
    }
  }, [canGoToPrevStep]);
  var reset = useCallback(function () {
    setCurrentStep(1);
  }, []);
  return [currentStep, {
    goToNextStep: goToNextStep,
    goToPrevStep: goToPrevStep,
    canGoToNextStep: canGoToNextStep,
    canGoToPrevStep: canGoToPrevStep,
    setStep: setStep,
    reset: reset
  }];
}

var styles = {"test":"_3ybTi"};

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { ExampleComponent, useActive, useArray$1 as useArray, useBoolean$1 as useBoolean, useClickAwayListener, useDebounce, useDeviceOrientation, useElementSize, useEventListener, useFocus, useHover, useIsOnline, useIsomorphicLayoutEffect, useMap$1 as useMap, useNumber$1 as useNumber, usePageLoaded, useStateful, useStep, useVibrate, useWindowResize, useWindowScrollPosition };
//# sourceMappingURL=index.modern.js.map
