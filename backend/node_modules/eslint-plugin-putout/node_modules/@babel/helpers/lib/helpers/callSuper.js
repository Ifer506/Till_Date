import getPrototypeOf from "./getPrototypeOf.js";
import isNativeReflectConstruct from "./isNativeReflectConstruct.js";
import possibleConstructorReturn from "./possibleConstructorReturn.js";
export default function _callSuper(_this, derived, args) {
  derived = getPrototypeOf(derived);
  return possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], getPrototypeOf(_this).constructor) : derived.apply(_this, args));
}

//# sourceMappingURL=callSuper.js.map
