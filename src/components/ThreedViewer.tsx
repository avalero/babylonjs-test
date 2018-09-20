import * as BABYLON from 'babylonjs';
import * as React from 'react';
import BabylonScene, {ISceneEventArgs} from './BabylonScene'; // import the component above linking to file we just created.

import Cube from '../lib/Cube';

export default class ThreedViewer extends React.Component<{}, {}> {
    
    public onSceneMount = (e: ISceneEventArgs) => {
        const { canvas, scene, engine } = e;

        // This creates and positions a free camera (non-mesh)
        // const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        const camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI/4 , 100, new BABYLON.Vector3(0, 0, 0), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        
        const cube = new Cube("cube1",{width:10, height:20, depth:10}).getMesh(scene);
        console.log(cube);
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        const ground = BABYLON.MeshBuilder.CreateGround("myGround", {width: 100, height: 100}, scene);

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }

    public render() {        
        return (
            <div>
                <BabylonScene adaptToDeviceRatio={true} width={800} height={600} onSceneMount={this.onSceneMount} />
            </div>
        )
    }
}