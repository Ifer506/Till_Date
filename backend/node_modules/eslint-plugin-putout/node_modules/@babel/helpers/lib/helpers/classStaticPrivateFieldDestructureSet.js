import classApplyDescriptorDestructureSet from "classApplyDescriptorDestructureSet";
import assertClassBrand from "assertClassBrand";
import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
export default function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
  assertClassBrand(classConstructor, receiver);
  classCheckPrivateStaticFieldDescriptor(descriptor, "set");
  return classApplyDescriptorDestructureSet(receiver, descriptor);
}

//# sourceMappingURL=classStaticPrivateFieldDestructureSet.js.map
