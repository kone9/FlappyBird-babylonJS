import * as BABYLON from 'babylonjs';
export declare class ObjetoRigidBody {
    private _mesh;
    private _meshColision;
    private _maestroFisico;
    private _posicion;
    private _posicionColision;
    private _scene;
    constructor(mallaParaRepresentarElObjeto: BABYLON.AbstractMesh, mallaCuerpoFisico: BABYLON.AbstractMesh, scene: BABYLON.Scene);
    private CrearCuerpoRigidoEnColision;
    private CrearCuerpoRigidoEnMalla;
    get mesh(): BABYLON.AbstractMesh;
    set mesh(value: BABYLON.AbstractMesh);
    DestruirFisicaDeEsteObjeto(destruirFisicas?: boolean): void;
    get meshColision(): BABYLON.AbstractMesh;
    set meshColision(mesh: BABYLON.AbstractMesh);
    get posicionColision(): BABYLON.Vector3;
    set posicionColision(posicion: BABYLON.Vector3);
    get posicion(): BABYLON.Vector3;
    set posicion(posicion: BABYLON.Vector3);
    get maestroFisico(): BABYLON.PhysicsImpostor;
    set maestroFisico(cuerpoFisico: BABYLON.PhysicsImpostor);
    ColisionVisible(cantidadDeVisibilidad?: number): void;
    private get scene();
    private set scene(value);
}
