import arrayLikeToArray from "./arrayLikeToArray.js";
export default function _maybeArrayLike(orElse, arr, i) {
  if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
    var len = arr.length;
    return arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
  }
  return orElse(arr, i);
}

//# sourceMappingURL=maybeArrayLike.js.map
