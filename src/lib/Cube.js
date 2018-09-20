import Object3D from './Object3D';
import * as BABYLON from 'babylonjs';

export default class Cube extends Object3D {

  static typeName = 'Cube';

  static parameterTypes = [
    {
      name: 'width',
      label: 'Width',
      type: 'integer',
      defaultValue: 10,
    },
    {
      name: 'height',
      label: 'Height',
      type: 'integer',
      defaultValue: 10,
    },
    {
      name: 'depth',
      label: 'Depth',
      type: 'integer',
      defaultValue: 10,
    },
  ];

  getGeometry(scene) {
    const {width, height, depth} = this.parameters;
    const geometry = BABYLON.MeshBuilder.CreateBox("myBox", {height: Number(height), width: Number(width), depth: Number(depth)}, scene);
    return geometry;
  }
}
