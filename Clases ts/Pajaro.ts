/// <reference path="./babylon/babylon.js" />
/// <reference path="./babylon/babylon.d.ts" />

//import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import {ObjetoRigidBody} from "./ObjetoRigidBody.js";//importo librería objeto rigidbody


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////IMPLEMENTACION DE LA CLASE PÁJARO////////IMPLEMENTACION DE LA CLASE PÁJARO
/** @description Esta clase representa un pajaro que tiene propiedades físicas".
     * @param {BABYLON.AbstractMesh} BABYLON.AbstractMesh mesh que se ve en pantalla.
     * @param {BABYLON.AbstractMesh} BABYLON.AbstractMesh mesh para usar como la colision.
     * @param {BABYLON.Scene} BABYLON.Scene Escena donde se usara.
     * @extends{ObjetoRigidBody} Esta clase hereda metodos y atributos de objetoRigidbody
     */
export class Pajaro extends ObjetoRigidBody
{
    //private _material: BABYLON.Material;//referencía al material de este objeto
    

    constructor(mallaParaRepresentarElObjeto:BABYLON.AbstractMesh,mallaCuerpoFisico:BABYLON.AbstractMesh,scene:BABYLON.Scene)
    {
        super(mallaParaRepresentarElObjeto,mallaCuerpoFisico,scene);
        //this.material = this.mesh.material;//material de la malla
        
    }

    /** @description determina el impulso del pájaro en el eje "Y".
     * @param {number} number Fuerza de impulso.
     * @return {number} void
    */
    public Impulsar(fuerzaImpulso:number = 0.5):void//acción volar
    {
        this.maestroFisico.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        this.maestroFisico.applyImpulse(new BABYLON.Vector3(0,fuerzaImpulso,0), this.maestroFisico.getObjectCenter());
    }
    /** @description determina el impulso del pájaro en el eje "Y" al morir.
     * @param {number} number Fuerza de impulso.
     * @return {number} void
    */
    public ImpulsarMorir(fuerzaImpulso:number = -0.4):void//acción al morir
    {
        this.maestroFisico.applyImpulse(new BABYLON.Vector3(0,fuerzaImpulso,0), this.maestroFisico.getObjectCenter());
    }



//     /** @description GET o SET el material de la malla que representa el pájaro.
//     * @param {BABYLON.Material}BABYLON.Material material. 
//     * @return {BABYLON.Material} BABYLON.Material
//     */
//     public get material(): BABYLON.Material {
//     return this._material;
//     }
//     public set material(value: BABYLON.Material) {
//         this._material = value;
// }


}

//////////////////////////////////////////////////////////////////////////////////////////////////
    