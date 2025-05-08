import classApplyDescriptorSet from "classApplyDescriptorSet";
import classPrivateFieldGet2 from "classPrivateFieldGet2";
export default function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = classPrivateFieldGet2(privateMap, receiver);
  classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}

//# sourceMappingURL=classPrivateFieldSet.js.map
