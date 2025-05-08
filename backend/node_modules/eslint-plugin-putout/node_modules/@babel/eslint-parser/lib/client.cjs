"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkerClient = exports.Client = exports.ACTIONS = void 0;
const path = require("path");
const ACTIONS = exports.ACTIONS = {
  GET_VERSION: "GET_VERSION",
  GET_TYPES_INFO: "GET_TYPES_INFO",
  GET_VISITOR_KEYS: "GET_VISITOR_KEYS",
  GET_TOKEN_LABELS: "GET_TOKEN_LABELS",
  MAYBE_PARSE: "MAYBE_PARSE",
  MAYBE_PARSE_SYNC: "MAYBE_PARSE_SYNC"
};
class Client {
  #send;
  constructor(send) {
    this.#send = send;
  }
  #vCache;
  getVersion() {
    return this.#vCache ??= this.#send(ACTIONS.GET_VERSION, undefined);
  }
  #tiCache;
  getTypesInfo() {
    return this.#tiCache ??= this.#send(ACTIONS.GET_TYPES_INFO, undefined);
  }
  #vkCache;
  getVisitorKeys() {
    return this.#vkCache ??= this.#send(ACTIONS.GET_VISITOR_KEYS, undefined);
  }
  #tlCache;
  getTokLabels() {
    return this.#tlCache ??= this.#send(ACTIONS.GET_TOKEN_LABELS, undefined);
  }
  maybeParse(code, options) {
    return this.#send(ACTIONS.MAYBE_PARSE, {
      code,
      options
    });
  }
}
exports.Client = Client;
class WorkerClient extends Client {
  static #worker_threads_cache;
  static get #worker_threads() {
    return WorkerClient.#worker_threads_cache ??= require("worker_threads");
  }
  #worker = new WorkerClient.#worker_threads.Worker(path.resolve(__dirname, "../lib/worker/index.cjs"), {
    env: WorkerClient.#worker_threads.SHARE_ENV
  });
  constructor() {
    super((action, payload) => {
      const signal = new Int32Array(new SharedArrayBuffer(8));
      const subChannel = new WorkerClient.#worker_threads.MessageChannel();
      this.#worker.postMessage({
        signal,
        port: subChannel.port1,
        action,
        payload
      }, [subChannel.port1]);
      Atomics.wait(signal, 0, 0);
      const {
        message
      } = WorkerClient.#worker_threads.receiveMessageOnPort(subChannel.port2);
      if (message.error) throw Object.assign(message.error, message.errorData);else return message.result;
    });
    this.#worker.unref();
  }
}
exports.WorkerClient = WorkerClient;
;

//# sourceMappingURL=client.cjs.map
