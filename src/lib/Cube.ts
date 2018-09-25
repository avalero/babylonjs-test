import {Object3D, IParameterType, ICubeParams, ISphereParams} from './Object3D';
import * as BABYLON from 'babylonjs';


export default class Cube extends Object3D {

  public static typeName:string = 'Cube';

  public static parameterTypes: IParameterType[] = [
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

  public getGeometry(scene: BABYLON.Scene): BABYLON.Mesh{
    const {width, height, depth} = this.parameters as ICubeParams;
    const geometry:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox("myBox", {height: Number(height), width: Number(width), depth: Number(depth)}, scene);
    return geometry;
  }
}
