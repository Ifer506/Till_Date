import assertClassBrand from "assertClassBrand";
export default function _classPrivateMethodGet(receiver, privateSet, fn) {
  assertClassBrand(privateSet, receiver);
  return fn;
}

//# sourceMappingURL=classPrivateMethodGet.js.map
