"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pajaro = void 0;
var ObjetoRigidBody_js_1 = require("./ObjetoRigidBody.js");
var Pajaro = (function (_super) {
    __extends(Pajaro, _super);
    function Pajaro(mallaParaRepresentarElObjeto, mallaCuerpoFisico, scene) {
        return _super.call(this, mallaParaRepresentarElObjeto, mallaCuerpoFisico, scene) || this;
    }
    Pajaro.prototype.Impulsar = function (fuerzaImpulso) {
        if (fuerzaImpulso === void 0) { fuerzaImpulso = 0.5; }
        this.maestroFisico.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        this.maestroFisico.applyImpulse(new BABYLON.Vector3(0, fuerzaImpulso, 0), this.maestroFisico.getObjectCenter());
    };
    Pajaro.prototype.ImpulsarMorir = function (fuerzaImpulso) {
        if (fuerzaImpulso === void 0) { fuerzaImpulso = -0.4; }
        this.maestroFisico.applyImpulse(new BABYLON.Vector3(0, fuerzaImpulso, 0), this.maestroFisico.getObjectCenter());
    };
    return Pajaro;
}(ObjetoRigidBody_js_1.ObjetoRigidBody));
exports.Pajaro = Pajaro;
