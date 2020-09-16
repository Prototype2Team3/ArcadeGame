class Util
{
    static isInside(point, boundary) {
        let result = false;
        
        for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i++) 
        {
          if ((boundary[i][1] > point[1]) != (boundary[j][1] > point[1]) && (point[0] < (boundary[j][0] - boundary[i][0]) * (point[1] - boundary[i][1]) / (boundary[j][1] - boundary[i][1]) + boundary[i][0])) 
          {
            result = !result;
          }
        }
        return result;
      }

      static midpoint(point1, point2) {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        return [(x1 + x2) / 2, (y1 + y2) / 2];
      }
    
      static LaneCenter(shape) {
        let x = shape[1][0][0];
        let y = shape[1][0][1];
        for (let i = 1; i < shape[1].length - 1; i++) {
          x += shape[1][i][0];
          y += shape[1][i][1];
        }
        x /= shape[1].length - 1;
        y /= shape[1].length - 1;
        return [x, y];
      }
    
      static weightedMidpoint(point1, point2, weight) {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        return [x1 * (1 - weight) + x2 * weight, y1 * (1 - weight) + y2 * weight];
      }

      static distanceBetweenPoints(point1, point2) {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      }
    
      static vector(point1, point2, scalar = 1) {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        return [(x2 - x1) * scalar, (y2 - y1) * scalar];
      }

      static addVector(point1, point2, scalar = 1) {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        return [x1 + x2 * scalar, y1 + y2 * scalar];
      }
    
      static unitVector(point1, point2, scalar = 1) {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        const distance = Util.distanceBetweenPoints(point1, point2);
        return [(x2 - x1) / distance * scalar, (y2 - y1) / distance * scalar];
      }
    
      static orthogonalUnitVector(point1, point2, scalar = 1) {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        const x = (x2 - x1) / Util.distanceBetweenPoints(point1, point2) * scalar;
        const y = (y2 - y1) / Util.distanceBetweenPoints(point1, point2) * scalar;
        return [y, -x];
      }
}