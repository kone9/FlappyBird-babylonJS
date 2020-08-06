"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjetoRigidBody = void 0;
var ObjetoRigidBody = (function () {
    function ObjetoRigidBody(mallaParaRepresentarElObjeto, mallaCuerpoFisico, scene) {
        this._meshColision = mallaCuerpoFisico;
        this.CrearCuerpoRigidoEnColision();
        this._mesh = mallaParaRepresentarElObjeto;
        this.CrearCuerpoRigidoEnMalla();
        this._maestroFisico = this.mesh.physicsImpostor;
        this._posicion = this.mesh.position;
        this._posicionColision = this.meshColision.position;
        this._scene = scene;
    }
    ObjetoRigidBody.prototype.CrearCuerpoRigidoEnColision = function () {
        this.meshColision.physicsImpostor = new BABYLON.PhysicsImpostor(this.meshColision, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, this.scene);
    };
    ObjetoRigidBody.prototype.CrearCuerpoRigidoEnMalla = function () {
        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0.1, friction: 1, restitution: 0 }, this.scene);
    };
    Object.defineProperty(ObjetoRigidBody.prototype, "mesh", {
        get: function () {
            return this._mesh;
        },
        set: function (value) {
            this._mesh = value;
        },
        enumerable: false,
        configurable: true
    });
    ObjetoRigidBody.prototype.DestruirFisicaDeEsteObjeto = function (destruirFisicas) {
        if (destruirFisicas === void 0) { destruirFisicas = false; }
        this.maestroFisico.dispose();
    };
    Object.defineProperty(ObjetoRigidBody.prototype, "meshColision", {
        get: function () {
            return this._meshColision;
        },
        set: function (mesh) {
            this._meshColision = mesh;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjetoRigidBody.prototype, "posicionColision", {
        get: function () {
            return this._posicionColision;
        },
        set: function (posicion) {
            this._posicionColision = posicion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjetoRigidBody.prototype, "posicion", {
        get: function () {
            return this._posicion;
        },
        set: function (posicion) {
            this._posicion = posicion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjetoRigidBody.prototype, "maestroFisico", {
        get: function () {
            return this._maestroFisico;
        },
        set: function (cuerpoFisico) {
            this._maestroFisico = cuerpoFisico;
        },
        enumerable: false,
        configurable: true
    });
    ObjetoRigidBody.prototype.ColisionVisible = function (cantidadDeVisibilidad) {
        if (cantidadDeVisibilidad === void 0) { cantidadDeVisibilidad = 1; }
        this.meshColision.isVisible = true;
        this.meshColision.visibility = cantidadDeVisibilidad;
    };
    Object.defineProperty(ObjetoRigidBody.prototype, "scene", {
        get: function () {
            return this._scene;
        },
        set: function (value) {
            this._scene = value;
        },
        enumerable: false,
        configurable: true
    });
    return ObjetoRigidBody;
}());
exports.ObjetoRigidBody = ObjetoRigidBody;
