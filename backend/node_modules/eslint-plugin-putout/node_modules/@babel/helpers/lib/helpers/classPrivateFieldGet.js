import classApplyDescriptorGet from "classApplyDescriptorGet";
import classPrivateFieldGet2 from "classPrivateFieldGet2";
export default function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = classPrivateFieldGet2(privateMap, receiver);
  return classApplyDescriptorGet(receiver, descriptor);
}

//# sourceMappingURL=classPrivateFieldGet.js.map
