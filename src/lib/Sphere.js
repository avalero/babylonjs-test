import Object3D from './Object3D';
import * as BABYLON from 'babylonjs';

export default class Sphere extends Object3D {

  static typeName = 'Sphere';

  static parameterTypes = [
    {
      name: 'radius',
      label: 'Radius',
      type: 'integer',
      defaultValue: 10
    },
  ]

  getGeometry(scene) {
    const {radius} = this.parameters;
    return BABYLON.MeshBuilder.CreateSphere("mySphere", {diameter: 2 * Number(radius)}, scene);
  }
}
