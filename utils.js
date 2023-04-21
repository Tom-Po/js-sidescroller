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

export {
  checkRadialCollision,
  checkRectangleCollision,
};
