import assertClassBrand from "./assertClassBrand.js";
export default function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
  assertClassBrand(classConstructor, receiver);
  return method;
}

//# sourceMappingURL=classStaticPrivateMethodGet.js.map
