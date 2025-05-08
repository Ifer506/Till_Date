import classApplyDescriptorGet from "classApplyDescriptorGet";
import assertClassBrand from "assertClassBrand";
import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
export default function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
  assertClassBrand(classConstructor, receiver);
  classCheckPrivateStaticFieldDescriptor(descriptor, "get");
  return classApplyDescriptorGet(receiver, descriptor);
}

//# sourceMappingURL=classStaticPrivateFieldSpecGet.js.map
