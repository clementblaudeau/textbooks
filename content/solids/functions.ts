// =============================================================================
// 3D Solids
// (c) Mathigon
// =============================================================================


import {Slider, Step} from '../shared/types';
import {VoxelPainter} from './components/voxel-painter';
import {Net} from './components/net';
import {Polyhedron} from '../polyhedra/components/polyhedron';

import './components/voxel-painter';
import './components/net';
import '../shared/components/solid';
import '../shared/components/binary-swipe';
import '../polyhedra/components/polyhedron';
import {BLUE, GREEN, GREY, LIME, RED, YELLOW} from '../shared/constants';
import {Solid} from '../shared/components/solid';
import {list} from '@mathigon/core';

export function polyParts($step: Step) {
  const $p = $step.$('x-polyhedron') as Polyhedron;
  $p.addMesh(() => {
    const vert = $p.getComponentPosn('vertex', [0, 1]);
    $p.addLabel('Vertex', vert, 0x666666, [15, 15]);
    $p.addPoint(vert);

    const edge = $p.getComponentPosn('edge', [0, 1]);
    $p.addLabel('Edge', edge, 0x666666, [5, 5]);

    const face = $p.getComponentPosn('face', [0, 3]);
    $p.addLabel('Face', face);
  });
}

export function polyIdent($step: Step) {
  const $cylinder = $step.$('x-solid.cylinder') as Solid;
  const $sphere = $step.$('x-solid.sphere') as Solid;
  const $cone = $step.$('x-solid.cone') as Solid;

  $cylinder.addMesh(() => {
    const geo = new THREE.CylinderGeometry(1.2, 1.2, 2.6, 32, 1);
    $cylinder.addSolid(geo, 0xfd8c00, 20);
  });
  $sphere.addMesh(() =>{
    const geo = new THREE.SphereGeometry(1.3, 128, 128);
    $sphere.addSolid(geo, 0xfd8c00);
  });
  $cone.addMesh(() => {
    const geo = new THREE.ConeGeometry(1.3, 2.6, 128, 1);
    $cone.addSolid(geo, 0xfd8c00);
  });
}

export async function templeFilling($step: Step) {
  const $voxelPainter = $step.$('x-voxel-painter') as VoxelPainter;
  // await $voxelPainter.ready();

  handleLayers($voxelPainter, 0);
}

type VoxelData = {
  locs: Array<[number, number, number]>,
  color: string
};

const layers: VoxelData[] = [
  {locs: [], color: ''},
  {
    locs: [
      [-1, -2, -2], [0, -2, -2], [1, -2, -2], [2, -2, -2],
      [-2, -2, -2], [-2, -1, -2], [-2, 0, -2], [-2, 1, -2],
      [-2, 2, -2], [-1, -1, -2], [-1, 0, -2], [-1, 1, -2],
      [-1, 2, -2], [0, -1, -2], [0, 0, -2], [0, 1, -2],
      [0, 2, -2], [1, -1, -2], [1, 0, -2], [1, 1, -2],
      [1, 2, -2], [2, -1, -2], [2, 0, -2], [2, 1, -2],
      [2, 2, -2]
    ],
    color: BLUE
  },
  {
    locs: [
      [-1, -2, -1], [0, -2, -1], [1, -2, -1], [2, -2, -1],
      [-2, -2, -1], [-2, -1, -1], [-2, 0, -1], [-2, 1, -1],
      [-2, 2, -1], [-1, -1, -1], [-1, 0, -1], [-1, 1, -1],
      [-1, 2, -1], [0, -1, -1], [0, 0, -1], [0, 1, -1],
      [0, 2, -1], [1, -1, -1], [1, 0, -1], [1, 1, -1],
      [1, 2, -1], [2, -1, -1], [2, 0, -1], [2, 1, -1],
      [2, 2, -1]
    ],
    color: GREEN
  },
  {
    locs: [
      [-1, -2, 0], [0, -2, 0], [1, -2, 0], [2, -2, 0],
      [-2, -2, 0], [-2, -1, 0], [-2, 0, 0], [-2, 1, 0],
      [-2, 2, 0], [-1, -1, 0], [-1, 0, 0], [-1, 1, 0],
      [-1, 2, 0], [0, -1, 0], [0, 0, 0], [0, 1, 0],
      [0, 2, 0], [1, -1, 0], [1, 0, 0], [1, 1, 0],
      [1, 2, 0], [2, -1, 0], [2, 0, 0], [2, 1, 0],
      [2, 2, 0]
    ],
    color: YELLOW
  },
  {
    locs: [
      [-1, -2, 1], [0, -2, 1], [1, -2, 1], [2, -2, 1],
      [-2, -2, 1], [-2, -1, 1], [-2, 0, 1], [-2, 1, 1],
      [-2, 2, 1], [-1, -1, 1], [-1, 0, 1], [-1, 1, 1],
      [-1, 2, 1], [0, -1, 1], [0, 0, 1], [0, 1, 1],
      [0, 2, 1], [1, -1, 1], [1, 0, 1], [1, 1, 1],
      [1, 2, 1], [2, -1, 1], [2, 0, 1], [2, 1, 1],
      [2, 2, 1]
    ],
    color: RED
  },
  {
    locs: [
      [-1, -2, 2], [0, -2, 2], [1, -2, 2], [2, -2, 2],
      [-2, -2, 2], [-2, -1, 2], [-2, 0, 2], [-2, 1, 2],
      [-2, 2, 2], [-1, -1, 2], [-1, 0, 2], [-1, 1, 2],
      [-1, 2, 2], [0, -1, 2], [0, 0, 2], [0, 1, 2],
      [0, 2, 2], [1, -1, 2], [1, 0, 2], [1, 1, 2],
      [1, 2, 2], [2, -1, 2], [2, 0, 2], [2, 1, 2],
      [2, 2, 2]
    ],
    color: LIME
  }
];

function handleLayers($vp: VoxelPainter, currentLayer: number) {
  if (currentLayer > 0) {
    $vp.addVoxels(layers[currentLayer].locs, layers[currentLayer].color);
  } else {
    $vp.clearVoxels();
  }
  setTimeout(() => handleLayers($vp, (currentLayer + 1) % layers.length), 1000);
}

const templeParts: VoxelData[] = [
  { // Floor
    locs: [
      [-1, -2, -2], [0, -2, -2], [1, -2, -2], [2, -2, -2],
      [-2, -2, -2], [-2, -1, -2], [-2, 0, -2], [-2, 1, -2],
      [-2, 2, -2], [-1, -1, -2], [-1, 0, -2], [-1, 1, -2],
      [-1, 2, -2], [0, -1, -2], [0, 0, -2], [0, 1, -2],
      [0, 2, -2], [1, -1, -2], [1, 0, -2], [1, 1, -2],
      [1, 2, -2], [2, -1, -2], [2, 0, -2], [2, 1, -2],
      [2, 2, -2]
    ],
    color: BLUE
  },
  { // Pillars
    locs: [
      [2, -2, 0], [-2, -2, 0], [-2, 2, 0], [2, -2, -1],
      [-2, -2, -1], [-2, 2, -1], [2, -2, 1], [-2, -2, 1],
      [-2, 2, 1]
    ],
    color: GREY
  },
  { // Top
    locs: [
      [-1, -2, 2], [0, -2, 2], [1, -2, 2], [2, -2, 2],
      [-2, -2, 2], [-2, -1, 2], [-2, 0, 2], [-2, 1, 2],
      [-2, 2, 2]
    ],
    color: YELLOW
  }
];

function templeDisplay($vp: VoxelPainter) {
  for (const part of templeParts) {
    $vp.addVoxels(part.locs, part.color);
  }
}

export async function templeDisplay1($step: Step) {
  const $voxelPainter = $step.$('x-voxel-painter') as VoxelPainter;
  // await $voxelPainter.ready();
  templeDisplay($voxelPainter);
}

export async function templeDisplay2($step: Step) {
  const $voxelPainter = $step.$('x-voxel-painter') as VoxelPainter;
  // await $voxelPainter.ready();
  templeDisplay($voxelPainter);
}

export function painting1($step: Step) {
  const $voxelPainter = $step.$('x-voxel-painter') as VoxelPainter;
  $voxelPainter.onVolumeMet(positions => {
    if (isCuboid(positions)) {
      console.log('correct');
      $step.score('vol');
      $step.addHint('correct');
    } else {
      $step.addHint('incorrect');
    }
  });
}

function isCuboid(positions: [number, number, number][]) {
  // TODO: instead can just check against bounding box volume
  const sortedPositions = positions.sort((a, b) => {
    if (a[0] != b[0]) {
      return a[0] - b[0];
    } else if (a[1] != b[1]) {
      return a[1] - b[1];
    } else {
      return a[2] - b[2];
    }
  });
  const [minX, minY, minZ] = sortedPositions[0];
  const [maxX, maxY, maxZ] = sortedPositions[sortedPositions.length - 1];
  const xRange = list(minX, maxX, 1);
  const yRange = list(minY, maxY, 1);
  const zRange = list(minZ, maxZ, 1);
  const xy = cartesian2D(xRange, yRange);
  const xyz = cartesian3D(xy, zRange);
  if (xyz.length == sortedPositions.length) {
    const eq = xyz.every(([x, y, z], index) =>
      x == sortedPositions[index][0] &&
      y == sortedPositions[index][1] &&
      z == sortedPositions[index][2]
    );
    if (eq) return true;
    else return false;
  } else {
    return false;
  }
}

function cartesian2D(a: number[], b: number[]): number[][] {
  const mat = [];
  for (const aItem of a) {
    for (const bItem of b) {
      mat.push([aItem, bItem]);
    }
  }
  return mat;
}

function cartesian3D(a: number[][], b: number[]): number[][] {
  const mat = [];
  for (const aRow of a) {
    for (const bItem of b) {
      mat.push(aRow.concat(bItem));
    }
  }
  return mat;
}

export function net1($step: Step) {
  const $net = $step.$('x-net') as Net;
  const $slider = $step.$('x-slider') as Slider;
  $net.addCuboidNet(1, 1, 1);
  /*
  $net.onAttr('p', v => {
    console.log('sliding');
    console.log(v);
  });
  */
  $slider.on('move', n => {
    const progress = n / 1000;
    $net.fold(progress);
  });
}

export async function voxelBuilderQuestion($step: Step) {
  const $voxel = $step.$('x-voxel-painter') as VoxelPainter;
  const $button = $voxel.$('x-icon-btn')!;

  const $targetVolume = parseInt($button.attr('volume'));
  const $targetSurface = parseInt($button.attr('surfaceArea'));

  $button.on('click', () => {
    const surface = $voxel.getSurfaceArea();
    const volume = $voxel.getVolume();

    if (surface === $targetSurface && volume === $targetVolume) {
      $step.score('problem');
      $step.addHint('correct');
    } else if (surface === $targetSurface) {
      $step.addHint('voxel-volume', {variables: {a: '' + volume, b: '' + $targetVolume}});
    } else if (volume === $targetVolume) {
      $step.addHint('voxel-surface', {variables: {a: '' + surface, b: '' + $targetSurface}});
    } else {
      $step.addHint('voxel-error', {variables: {a: '' + $targetVolume, b: '' + $targetSurface}});
    }
  });
}
