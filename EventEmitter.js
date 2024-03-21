export class EventEmitter {
  listeners = {};

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
    }
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const wrapper = (...args) => {
      fn(...args);
      this.off(eventName, wrapper);
    };

    this.on(eventName, wrapper);
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(listener => listener(...args));
    }
  }

  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
}