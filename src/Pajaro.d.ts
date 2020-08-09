import * as BABYLON from 'babylonjs';
import { ObjetoRigidBody } from "./ObjetoRigidBody";
export declare class Pajaro extends ObjetoRigidBody {
    constructor(mallaParaRepresentarElObjeto: BABYLON.AbstractMesh, mallaCuerpoFisico: BABYLON.AbstractMesh, scene: BABYLON.Scene);
    Impulsar(fuerzaImpulso?: number): void;
    ImpulsarMorir(fuerzaImpulso?: number): void;
}
