import uuid from "react-uuid";

export function findNode(regex, arr) {
  return arr.reduce((a, item) => {
    if (a) return a;
    if (item.name.match(regex)) return item;
    if (item.children) return findNode(regex, item.children);
  }, null);
}

export function insertChildNode(data, child, nodeId) {
  if (!Array.isArray(data)) {
    return;
  }
  for (let element of data) {
    if (element.id === nodeId && element.children) {
      element.children.unshift(child);
    } else {
      insertChildNode(element.children, child, nodeId);
    }
  }
}

export function validateJson(json) {
  const keys = Object.keys(json);
  if (!keys.includes("id")) {
    json.id = uuid();
  }
  if (
    keys.includes("name") &&
    keys.includes("spouse") &&
    keys.includes("location") &&
    keys.includes("yearOfBirth") &&
    keys.includes("address") &&
    // keys.includes("familiyPhotos") &&
    keys.includes("children") &&
    // Array.isArray(json.familyPhotos) &&
    Array.isArray(json.children)
  ) {
    if (Array.isArray(json?.familyPhotos) && json?.familyPhotos?.length > 0) {
      json?.familyPhotos.forEach((photo) => {
        const photoKeys = Object.keys(photo);
        if (!photoKeys.includes("img") || !photoKeys.includes("title"))
          throw Error("invalid photo schema");
      });
    }
    json.children.forEach((child) => {
      validateJson(child);
    });
  } else {
    throw Error("invalid json schema");
  }
}
