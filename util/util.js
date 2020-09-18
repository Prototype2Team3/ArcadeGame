class Util
{
      static midpoint(point1, point2) {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        return [(x1 + x2) / 2, (y1 + y2) / 2];
      }

      static vector(point1, point2, scalar = 1) {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        return [(x2 - x1) * scalar, (y2 - y1) * scalar];
      }
    
}