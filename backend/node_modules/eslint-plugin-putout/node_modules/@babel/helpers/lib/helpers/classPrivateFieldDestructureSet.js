import classApplyDescriptorDestructureSet from "classApplyDescriptorDestructureSet";
import classPrivateFieldGet2 from "classPrivateFieldGet2";
export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
  var descriptor = classPrivateFieldGet2(privateMap, receiver);
  return classApplyDescriptorDestructureSet(receiver, descriptor);
}

//# sourceMappingURL=classPrivateFieldDestructureSet.js.map
