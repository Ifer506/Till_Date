"use strict";

const babel = require("./babel-core.cjs");
const handleMessage = require("./handle-message.cjs");
const worker_threads = require("worker_threads");
worker_threads.parentPort.addListener("message", async ({
  signal,
  port,
  action,
  payload
}) => {
  let response;
  try {
    if (babel.init) await babel.init;
    response = {
      result: await handleMessage(action, payload)
    };
  } catch (error) {
    response = {
      error,
      errorData: Object.assign({}, error)
    };
  }
  try {
    port.postMessage(response);
  } catch {
    port.postMessage({
      error: new Error("Cannot serialize worker response")
    });
  } finally {
    port.close();
    Atomics.store(signal, 0, 1);
    Atomics.notify(signal, 0);
  }
});

//# sourceMappingURL=index.cjs.map
