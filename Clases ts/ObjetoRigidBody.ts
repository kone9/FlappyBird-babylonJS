/// <reference path="./babylon/babylon.js" />
/// <reference path="./babylon/babylon.d.ts" />

//import {BABYLON} from "./babylon";

// import * as BABYLON from '@babylonjs/core'


////////IMPLEMENTACION DE LA CLASE RIGIDBODY////////IMPLEMENTACION DE LA CLASE RIGIDBODY
/** @description Esta clase representa un objeto que tiene propiedades físicas".
     * @param {BABYLON.AbstractMesh} BABYLON.AbstractMesh mesh que se ve en pantalla.
     * @param {BABYLON.AbstractMesh} BABYLON.AbstractMesh mesh para usar como la colision.
     * @param {BABYLON.Scene} BABYLON.Scene Escena donde se usara.
    */
export class ObjetoRigidBody //EJEMPLO DE COMO IMPLEMENTAR UNA CLASE USANDO LOS METODOS DE BABYLON EN ESTE CLASO EL MOLDE PARA UN PAJARO FISICO
{
    private _mesh: BABYLON.AbstractMesh;//guardo el mesh del pajaro en esta variable
    private _meshColision: BABYLON.AbstractMesh;
    private _maestroFisico: BABYLON.PhysicsImpostor;//para tener una referencía al cuerpo físico de este objeto
    private _posicion: BABYLON.Vector3;//referencia a la posición de este objeto
    private _posicionColision: BABYLON.Vector3;
    private _scene: BABYLON.Scene;


    constructor(mallaParaRepresentarElObjeto:BABYLON.AbstractMesh,mallaCuerpoFisico:BABYLON.AbstractMesh,scene:BABYLON.Scene)
    {
        //importante para que funcione los cuerpor rigidos hijos tienen
        //que ser creados como se ven en las siguientes lineas
        //si cambias las lineas de posición no funcionaran correctamente

        this._meshColision = mallaCuerpoFisico;//obtengo la malla del cuerop fisico
        this.CrearCuerpoRigidoEnColision()//creo el cuerpo Rigido en la colision
        this._mesh = mallaParaRepresentarElObjeto;//obtengo la malla de objeto
        this.CrearCuerpoRigidoEnMalla();//creo el cuerpo Rigido a la malla que controla la colisicion se suman las masas
        this._maestroFisico = this.mesh.physicsImpostor as BABYLON.PhysicsImpostor;//hago que el maestro físico sea el de la malla principal
   
        this._posicion = this.mesh.position;//posicion de la malla
        this._posicionColision = this.meshColision.position;//posicion del cuerpo Rigido
        this._scene = scene;//la escena la recibo por parametro
    }

    private CrearCuerpoRigidoEnColision():void//crea el cuerpo rigido a la colisión "TIENE COLISION"
    {
        this.meshColision.physicsImpostor = new BABYLON.PhysicsImpostor(this.meshColision, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, this.scene);//creo el cuerpoFisico al
        
    }
    private CrearCuerpoRigidoEnMalla():void//crea el cuerpo rigido a la malla importante "NO TIENE COLISION"
    {
        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0.1, friction: 1, restitution: 0 }, this.scene);
    }
    /** @description GET o SET  la malla que se ve en pantalla.
     * @param {BABYLON.AbstractMesh}BABYLON.AbstractMesh mesh a cambiar. 
     * @return {number} BABYLON.AbstractMesh
     */
    public get mesh():BABYLON.AbstractMesh
    {//para obtener la malla de este objeto
        return this._mesh;
    }
    public set mesh(value: BABYLON.AbstractMesh)
    {//para cambiar la malla de este objeto
        this._mesh = value;
    }
    /** @description Destruye el objeto fisico que se encuentra en el rigidbody con dispose()
     * @param {boolean}boolean destruirFisicas. 
     * @return {void} void
     */
    public DestruirFisicaDeEsteObjeto(destruirFisicas:boolean= false):void//destruir la física del objeto
    {
        this.maestroFisico.dispose();
    }
    /** @description GET o SET la malla de la colision de este objeto
     * @param {BABYLON.AbstractMesh }BABYLON.AbstractMesh  mesh. 
     * @return {BABYLON.AbstractMesh} BABYLON.AbstractMesh
     */
    public get meshColision():BABYLON.AbstractMesh 
    {
        return this._meshColision;
    }
    public set meshColision(mesh: BABYLON.AbstractMesh)//cambio la malla de la colison de este objeto
    {
        this._meshColision = mesh;
    }
    /** @description GET o SET la posicion de la malla que representa la colisión.
     * @param {BABYLON.Vector3}BABYLON.Vector3 posición de la colision. 
     * @return {number} BABYLON.Vector3
     */
    public get posicionColision(): BABYLON.Vector3//obtengo la posicion de la colision 
    {
        return this._posicionColision;
    }
    public set posicionColision(posicion: BABYLON.Vector3)//cambio la posición
    {
        this._posicionColision = posicion;
    }
    /** @description GET o SET la posición del objeto padre que mueve a todo el objetoFisico.
     * @param {BABYLON.Vector3}BABYLON.Vector3 posición de la colision. 
     * @return {number} BABYLON.Vector3
     */
    public get posicion(): BABYLON.Vector3 {
        return this._posicion;
    }
    public set posicion(posicion: BABYLON.Vector3) {
        this._posicion = posicion;
    }

    /** @description GET o SET el objeto padre que mueve a todo el objetoFisico.
     * @param {BABYLON.PhysicsImpostor}BABYLON.PhysicsImpostor cuerpoFisico. 
     * @return {BABYLON.PhysicsImpostor} BABYLON.PhysicsImpostor
     */
    public get maestroFisico(): BABYLON.PhysicsImpostor {
        return this._maestroFisico;
    }
    public set maestroFisico(cuerpoFisico: BABYLON.PhysicsImpostor)
    {
        this._maestroFisico = cuerpoFisico;
    }
    /** @description Hace visible/invisible la malla que representa la colision de este objeto.
     * @param {number}number cantidadDeVisibilidad. 
     * @return {void} void
     */
    public ColisionVisible(cantidadDeVisibilidad:number = 1):void
    {
        this.meshColision.isVisible = true;
        this.meshColision.visibility = cantidadDeVisibilidad;
    }
    /** @description toma o cambia la escena donde se va usar este objeto.
     * @param {number}number cantidadDeVisibilidad. 
     * @return {void} void
     */
    private get scene(): BABYLON.Scene {
        return this._scene;
    }
    private set scene(value: BABYLON.Scene) {
        this._scene = value;
    }

}

