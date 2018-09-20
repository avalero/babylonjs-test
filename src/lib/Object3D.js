import * as BABYLON from 'babylonjs'
import uuid from 'uuid'

export default class Object3D {

  static parameterTypes = [];

  static createTranslateOperation(x, y, z, relative = true) {
    return {
      type: 'translation',
      x,
      y,
      z,
      relative
    };
  }

  static createRotateOperation(axis, angle, relative = true) {
    return {
      type: 'rotation',
      axis,
      angle,
      relative
    };
  }

  static createScaleOperation(x,y,z) {
    return {
      type: 'scale',
      x,
      y,
      z
    };
  }

  static createFromJSON(json) {
    const {name, parameters, operations, id} = json;
    return new this(name, parameters, operations, id);
  }

  static colors = [
    '#e300ff',
    '#b0ff00',
    '#00ffd2',
    '#fdff00',
    '#ff00f4',
    '#00fff8',
    '#f9fe44',
    '#7aff4f',
    '#968afc'
  ]

  id = '';
  name = '';
  parameters = {};
  operations = [];
  
  constructor(name, parameters = {}, operations = [], id) {
    const defaultParams = {};
    this.constructor.parameterTypes.forEach(paramType => {
      defaultParams[paramType.name] = paramType.defaultValue;
    });

    //select random color
    const colorI = Math.floor(Math.random() * Object3D.colors.length);
    
    this.parameters = {
      ...defaultParams,
      color: Object3D.colors[colorI],
      ...parameters
    };

    this.operations = operations;
    this.id = id || uuid();
    this.name = name;
  }

  addOperation(operation) {
    this.operations.push(operation);
  }

  applyOperations(mesh){
    if(this.operations){
      this.operations.forEach( operation => 
        {
          // Translate operation
          if(operation.type === Object3D.createTranslateOperation().type){
            if(operation.relative){
              mesh.locallyTranslate(
                new BABYLON.Vector3(
                  Number(operation.x),
                  Number(operation.y),
                  Number(operation.z)
                )
              );
            }else{
              //absolute x,y,z axis.
              mesh.position.x += Number(operation.x);
              mesh.position.y += Number(operation.y);
              mesh.position.z += Number(operation.z);
            }
            //Rotation Operation
          }else if(operation.type === Object3D.createRotateOperation().type){
            const angle = Math.Pi / 180 * (Number(operation.angle));
            switch(operation.axis){
              case 'x':
                if(operation.relative){
                  
                  mesh.addRotation(angle,0,0);
                }else{
                  mesh.rotate.x +=  angle;
                }
                break;
                
              case 'y':
                if(operation.relative){
                  mesh.addRotation(0,angle,0);
                }else{
                  mesh.rotate.y +=  angle;
                }
                break;

              case 'z':
                if(operation.relative){
                  mesh.addRotation(0, 0, angle);
                }else{
                  mesh.rotate.z +=  angle;
                }
                break;
              
              default:
                throw new Error('Unexpected Rotation Axis');
            }
          }else if(operation.type === Object3D.createScaleOperation().type){
            if(Number(operation.x)>0 && Number(operation.y)> 0 && Number(operation.z) >0)
            {
              mesh.scaling = new BABYLON.Vector3(
                mesh.scale.x * Number(operation.x), 
                mesh.scale.y * Number(operation.y), 
                mesh.scale.z * Number(operation.z)
              );
            }
          }
        });
    }  }

  getMesh(scene) {
    const mesh = this.getGeometry(scene);
    
    const material = new BABYLON.StandardMaterial("material", scene);
    material.ambientColor = new BABYLON.Color3.FromHexString(this.parameters.color || '#ff0000');

    this.applyOperations(mesh);

    mesh.material = material;

    return mesh;
  }

  getGeometry() {
    throw new Error('Method not implemented');
  }

  toJSON() {
    const {id, name, parameters, operations, constructor} = this;
    return {
      id,
      name,
      type: constructor.typeName,
      parameters,
      operations
    };
  }
}
