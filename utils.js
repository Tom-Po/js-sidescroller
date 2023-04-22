const checkRadialCollision = (p1x, p1y, r1, p2x, p2y, r2) => (
  (r1 + r2) ** 2 > (p1x - p2x) ** 2 + (p1y - p2y) ** 2
);
// Sprite 1 & 2
const checkRectangleCollision = (s1, s2) => (
  s1.x < s2.x + s2.spriteWidth
    && s1.x + s1.spriteWidth > s2.x
    && s1.y < s2.y + s2.spriteHeight
    && s1.spriteHeight + s1.y > s2.y
);
// calculate distance between two points
const distBetween = (p1, p2) => Math.sqrt((p2.x - p1.x) ** 2
  + (p2.y - p1.y) ** 2);

const angleBetween = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x);

const groundPoint = 15;
const shootingCirc = {
  x: 200,
  y: groundPoint - 200,
  r: 75,
};
const getAimCoords = (mousePos, circle) => {
  /* NOTE: angleBetween(p1, p2) is 180deg opposite of angleBetween(p2, p1) */
  const angle = Math.PI / 2 - angleBetween(mousePos, circle);
  const distance = Math.min(distBetween(circle, mousePos), circle.r);
  const x = circle.x + distance * Math.sin(angle);
  const y = circle.y + distance * Math.cos(angle);
  return { x, y };
};

const drawBackCirc = {
  x: shootingCirc.x,
  y: shootingCirc.y,
  r: 10,
};
// checks if the mouse position is within < radius distance to the center
// of the shooting circle
const isInCircle = (mousePos) => {
  const distFromCenter = distBetween(drawBackCirc, mousePos);
  if (distFromCenter < drawBackCirc.r) return true;
  return false;
};

export {
  checkRadialCollision,
  checkRectangleCollision,
  distBetween,
  angleBetween,
  getAimCoords,
  isInCircle,
};
