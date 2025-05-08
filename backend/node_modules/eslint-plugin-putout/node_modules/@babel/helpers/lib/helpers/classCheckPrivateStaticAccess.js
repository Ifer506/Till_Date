import assertClassBrand from "assertClassBrand";
export default function _classCheckPrivateStaticAccess(receiver, classConstructor, returnValue) {
  return assertClassBrand(classConstructor, receiver, returnValue);
}

//# sourceMappingURL=classCheckPrivateStaticAccess.js.map
