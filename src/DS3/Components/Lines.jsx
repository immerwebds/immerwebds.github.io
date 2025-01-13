import * as THREE from 'three'
import { useMemo } from 'react'
import { SCALE_X, SCALE_Y } from '../BaseStructure/Constants_DS2.jsx';
import { adjustedArr1, adjustedArr2, adjustedArr3, adjustedB1, adjustedA1B2, adjustedA2B3, adjustedA3 } from '././snpData.jsx';

function perpendicularPoint(arr=[1,0], thickness=1){
  const initialV = new THREE.Vector2(arr[0], arr[1]);
  const zeroV = new THREE.Vector2().fromArray([0,0]);
  const perpenV = initialV.clone().rotateAround(zeroV, -Math.PI/2);
  const normalized = perpenV.clone().normalize();
  const perpenPoint = initialV.clone().addScaledVector(normalized, thickness);
  return([perpenPoint.x, perpenPoint.y]);
}

// returning array of coordinate of the point which is perpendicular to the endpoint of the vector made from given array and the distnace is thickness
function DifferencePerpen(v1, v2, thickness=1){
  const perpenV12 = perpendicularPoint( [v2.x - v1.x, v2.y - v1.y], thickness );
  const result = [perpenV12[0]+v1.x, perpenV12[1]+v1.y];
  return(result);
}

// returning array of coordinate of the point which is perpendicular to the difference vector of v2-v1 with distnace of thcikness
function findIntersection(v1, v2, v3, thickness=1){
  const arr1 = [ v2.x - v1.x, v2.y - v1.y, DifferencePerpen(v1, v2, thickness) ];
  const arr2 = [ v3.x - v2.x, v3.y - v2.y, DifferencePerpen(v2, v3, thickness) ];
  let xComponent = arr1[2][0];
  let yComponent = arr1[2][1];
  if ( arr1[0]*arr2[1] - arr1[1]*arr2[0] != 0){
  const uIs = ( arr1[1]*(arr2[2][0] - arr1[2][0]) - arr1[0]*(arr2[2][1] - arr1[2][1]) )/( arr1[0]*arr2[1] - arr1[1]*arr2[0] );
  xComponent = uIs*arr2[0] + arr2[2][0]
  yComponent = uIs*arr2[1] + arr2[2][1]
  }
  return(new THREE.Vector2(xComponent, yComponent));
}

// returning intersection point vector of two line(each line is parallel to v2-v1 & v3-v2, and passing perpendicularpoint of v2 & v3 with distance of thickness)
function lineToThick(vecArr, thickness=1){
  const result = [];
  for (var i=0; i<vecArr.length; i++){
    if (i == 0){
      const initialPoint = new THREE.Vector2( vecArr[i].x, vecArr[i].y-thickness )
      result.push(initialPoint);
      const initialPerpen = DifferencePerpen(vecArr[i], vecArr[i+1], thickness);
      result.push(new THREE.Vector2(initialPerpen[0], initialPerpen[1]));
    }
    else if (i < vecArr.length-1){
      const intersect = findIntersection(vecArr[i-1], vecArr[i], vecArr[i+1], thickness);
      result.pop();
      result.push(intersect.clone());
      const nextPerpen = DifferencePerpen(vecArr[i], vecArr[i+1], thickness);
      result.push(new THREE.Vector2(nextPerpen[0], nextPerpen[1]));
    }
  }

  return(vecArr.concat(result.reverse()));
}

function arrToShape(arr, chartWidth){
  let points = [];
  for (var i=0; i< arr.length; i++) {
    points.push( new THREE.Vector2(i * SCALE_X, arr[i]) );
  }
  let shaped = lineToThick(points, chartWidth);
  return(new THREE.Shape(shaped));
}

const lineWidth = 80;

const extrudeSettings1 = { depth: lineWidth, bevelEnabled: false, bevelSegments: 1, steps: 2, bevelSize: 1, bevelThickness: 1 };
const extrudeSettings2 = { depth: lineWidth/16, bevelEnabled: false, bevelSegments: 1, steps: 2, bevelSize: 1, bevelThickness: 1 };

const shape1    = arrToShape(adjustedArr1, 10);
const shape1_middle = arrToShape(adjustedArr1, 0.5);
const shape2    = arrToShape(adjustedArr2, 10);
const shape2_middle = arrToShape(adjustedArr2, 0.5);
const shape3    = arrToShape(adjustedArr3, 10);
const shape3_middle = arrToShape(adjustedArr3, 0.5);
const shapeB1   = arrToShape(adjustedB1, 10);
const shapeA2B3 = arrToShape(adjustedA2B3, 10);
const shapeA1B2 = arrToShape(adjustedA1B2, 10);
const shapeA3   = arrToShape(adjustedA3, 10);

export const GEOMS = {
  line_1:     new THREE.ExtrudeGeometry(shape1, extrudeSettings1),
  edge_1:     new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(shape1, extrudeSettings1)),
  midLine_1:  new THREE.ExtrudeGeometry(shape1_middle, extrudeSettings2),

  line_2:     new THREE.ExtrudeGeometry(shape2, extrudeSettings1),
  edge_2:     new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(shape2, extrudeSettings1)),
  midLine_2:  new THREE.ExtrudeGeometry(shape2_middle, extrudeSettings2),

  line_3:     new THREE.ExtrudeGeometry(shape3, extrudeSettings1),
  edge_3:     new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(shape3, extrudeSettings1)),
  midLine_3:  new THREE.ExtrudeGeometry(shape3_middle, extrudeSettings2),

  A3:         new THREE.ExtrudeGeometry(shapeA3, extrudeSettings1),
  edgeA3:     new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(shapeA3, extrudeSettings1)),
  mlA3:       new THREE.ExtrudeGeometry(shapeA3, extrudeSettings2),

  A2B3:       new THREE.ExtrudeGeometry(shapeA2B3, extrudeSettings1),
  edgeA2B3:   new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(shapeA2B3, extrudeSettings1)),
  mlA2B3:     new THREE.ExtrudeGeometry(shapeA2B3, extrudeSettings2),

  A1B2:       new THREE.ExtrudeGeometry(shapeA1B2, extrudeSettings1),
  edgeA1B2:   new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(shapeA1B2, extrudeSettings1)),
  mlA1B2:     new THREE.ExtrudeGeometry(shapeA1B2, extrudeSettings2),

  B1:         new THREE.ExtrudeGeometry(shapeB1, extrudeSettings1),
  edgeB1:     new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(shapeB1, extrudeSettings1)),
  mlB1:       new THREE.ExtrudeGeometry(shapeB1, extrudeSettings2),

  oneJum:     new THREE.SphereGeometry(2),
}
