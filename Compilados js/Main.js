"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Pajaro_js_1 = require("./Pajaro.js");
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var Puntos = document.getElementById("puntos");
var botonCssReiniciar = document.getElementById("boton");
window.addEventListener("resize", function () {
    engine.resize();
});
var scene;
function CrearEscenaPrincipal(engine, canvas) {
    var visibleMaestros = 0;
    var visibleEmphtyReposicionar = 0;
    var visibleTodasLasColisiones = 0;
    var visibleColisionPajaro = 0;
    var visibleColumnas = 1;
    var desactivarColisionColumnas = false;
    var visibleSuelo = 1;
    var desactivarColisionSuelo = false;
    var desactivarFisicasPajaro = false;
    var velocidadMovimientoJuego = -0.1;
    var desactivarDificultad = false;
    var dificultadGeneral = 1.0;
    var tiempoAumentarDificiltad = 5000;
    var camaraSigueJugador = false;
    var camaraSigueReposicionar = false;
    var desactivarCamaraRotadoraPrueba = true;
    var ActivarEditor = true;
    scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
    var puedoReinciar = false;
    var ConteoDePuntos = 0;
    Puntos.innerHTML = ConteoDePuntos;
    botonCssReiniciar.style.visibility = 'hidden';
    Puntos.style.visibility = "visible";
    if (ActivarEditor) {
        scene.debugLayer.show();
    }
    scene.onGameOver = new BABYLON.Observable();
    scene.onIniciar = new BABYLON.Observable();
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10, 0, 5), scene);
    camera.target = new BABYLON.Vector3(20, 10, 0);
    camera.beta = 1.5;
    camera.alpha = 0;
    camera.radius = 0.700;
    camera.panningSensibility = 5000;
    camera.attachControl(canvas, true);
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    var light3 = new BABYLON.DirectionalLight("light3", new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 5;
    light3.setDirectionToTarget(new BABYLON.Vector3(0, 90, 0));
    BABYLON.SceneLoaderFlags.ShowLoadingScreen = false;
    BABYLON.SceneLoader.Append("./babylonExportBlender/", "Escenario.babylon", scene, function (scene) {
        BABYLON.SceneLoader.ImportMesh("", "./babylonExportBlender/", "VueltaAlMundoAnimada.glb", scene, function (meshes, particle, Skeleton) {
            var VueltaAlMundo = scene.getNodeByName("VueltaAlMundoAnimada");
            var posicionVUeltaAlmundo = scene.getNodeByName("posicionVUeltaAlmundo");
            var padreVueltaAlMundo = scene.getMeshByName("MaestroEdificioDerecha");
            VueltaAlMundo.parent = padreVueltaAlMundo;
            VueltaAlMundo.setAbsolutePosition(posicionVUeltaAlmundo.getAbsolutePivotPoint());
        });
        scene.getNodeByName("CameraBlender").fov = 0.40;
        scene.onIniciar.notifyObservers(true);
        if (!desactivarCamaraRotadoraPrueba) {
            scene.activeCamera = camera;
        }
        var sueloMalla = scene.getMeshesByTags("sueloMalla");
        sueloMalla.forEach(function (i) {
            i.isVisible = true;
            i.visibility = visibleSuelo;
        });
        var suelosColision = scene.getMeshesByTags("sueloColision");
        suelosColision.forEach(function (i) {
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene);
            BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo");
            i.visibility = visibleTodasLasColisiones;
            if (desactivarColisionSuelo) {
                i.dispose();
            }
        });
        var suelos = scene.getMeshesByTags("suelo");
        suelos.forEach(function (i) {
            i.isVisible = true;
            i.visibility = visibleMaestros;
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0, friction: 1, restitution: 0 }, scene);
            BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo");
        });
        var ColumnasColision = scene.getMeshesByTags("obstaculo");
        ColumnasColision.forEach(function (i) {
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
            i.visibility = visibleTodasLasColisiones;
            if (desactivarColisionColumnas) {
                i.dispose();
            }
        });
        var columnasVisibles = scene.getMeshesByTags("columna");
        columnasVisibles.forEach(function (i) {
            i.visibility = visibleColumnas;
        });
        var columnasPrincipales = scene.getMeshesByTags("columnasPrincipal");
        columnasPrincipales.forEach(function (i) {
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0 }, scene);
            BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo");
            i.position.set(i.position.x, numeroAleatorio(4, 10), i.position.z);
            i.visibility = visibleMaestros;
        });
        var ObtenerpajaroColision = scene.getNodeByName("pajaroColision");
        var ObtenerPajaro = scene.getNodeByName("pajaro");
        var pajaro = new Pajaro_js_1.Pajaro(ObtenerPajaro, ObtenerpajaroColision, scene);
        pajaro.ColisionVisible(visibleColisionPajaro);
        pajaro.maestroFisico.onCollideEvent = function (collider, collidedWith) {
            if (BABYLON.Tags.GetTags(collidedWith) === "obstaculo") {
                puedoReinciar = true;
                pajaro.ImpulsarMorir();
                scene.onGameOver.notifyObservers(puedoReinciar);
            }
        };
        if (desactivarFisicasPajaro) {
            pajaro.DestruirFisicaDeEsteObjeto();
        }
        scene.onPointerObservable.add(function (pointerInfo) {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    if (!puedoReinciar) {
                        pajaro.Impulsar();
                    }
                    break;
            }
        });
        if (camaraSigueJugador) {
            camera.setTarget(pajaro.mesh, false, false);
        }
        var Puntajes = scene.getMeshesByTags("puntos");
        Puntajes.forEach(function (i) {
            i.visibility = 0;
            i.actionManager = new BABYLON.ActionManager(scene);
            i.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: pajaro
            }, function () {
                ConteoDePuntos += 1;
                Puntos.innerHTML = ConteoDePuntos;
            }));
        });
        var velocidadDesplazamiento = 0;
        var dificultad = 0.000;
        function AumentarDificultad() {
            if (!puedoReinciar) {
                dificultad -= dificultadGeneral / 10000;
                console.log("aumenta la dificultad");
            }
        }
        if (!desactivarDificultad) {
            setInterval(AumentarDificultad, tiempoAumentarDificiltad);
        }
        var guiaReposicionar = scene.getMeshesByTags("guiaReposicionar");
        guiaReposicionar.forEach(function (i) {
            i.visibility = visibleEmphtyReposicionar;
        });
        var EmphtyReposicionar = scene.getNodeByName("EmphtyReposicionar");
        var EmphtyReposicionar2 = scene.getNodeByName("EmphtyReposicionar2");
        EmphtyReposicionar.visibility = visibleEmphtyReposicionar;
        EmphtyReposicionar2.visibility = visibleEmphtyReposicionar;
        if (camaraSigueReposicionar) {
            camera.setTarget(scene.getNodeByName("EmphtyReposicionar"), false, false);
        }
        var arboles = scene.getMeshesByTags("Arboles");
        var ReposicionarArboles = scene.getMeshByName("ReposicionarArboles");
        ReposicionarArboles.visibility = visibleMaestros;
        var edificios = scene.getMeshesByTags("edificios");
        edificios.forEach(function (i) {
            i.visibility = visibleMaestros;
        });
        scene.onAfterPhysicsObservable.add(function () {
            if (!puedoReinciar) {
                velocidadDesplazamiento = velocidadMovimientoJuego + dificultad * scene.getEngine().getDeltaTime();
            }
            else {
                velocidadDesplazamiento = 0;
                dificultad = 0;
            }
            columnasPrincipales.forEach(function (i) {
                i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, i.getAbsolutePosition().z + velocidadDesplazamiento));
                if (i.position.z <= -30) {
                    i.position.set(0, numeroAleatorio(4, 10), 40 + velocidadDesplazamiento);
                }
            });
            suelos.forEach(function (i) {
                i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, i.getAbsolutePosition().z + velocidadDesplazamiento));
                if (i.getAbsolutePivotPoint().z <= -53) {
                    if (i.name == "suelo") {
                        i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, EmphtyReposicionar2.getAbsolutePivotPoint().z + velocidadDesplazamiento));
                    }
                    if (i.name == "suelo2") {
                        i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, EmphtyReposicionar.getAbsolutePivotPoint().z + velocidadDesplazamiento));
                    }
                }
            });
            arboles.forEach(function (i) {
                i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, i.getAbsolutePosition().z + velocidadDesplazamiento / 4));
                if (i.getAbsolutePivotPoint().z <= -150) {
                    i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, ReposicionarArboles.getAbsolutePivotPoint().z + velocidadDesplazamiento));
                }
            });
            edificios.forEach(function (i) {
                i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, i.getAbsolutePosition().z + velocidadDesplazamiento / 8));
                if (i.getAbsolutePivotPoint().z < -150) {
                    i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, 80 + velocidadDesplazamiento));
                }
            });
        });
    });
    scene.onGameOver.addOnce(function (gameOver) {
        setTimeout(function () {
            botonCssReiniciar.style.visibility = 'visible';
        }, 300);
    });
    botonCssReiniciar.onclick = function () {
        if (puedoReinciar == true) {
            scene = CrearEscenaPrincipal(engine, canvas);
        }
    };
    function numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    function Timer(tiempoEspera) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) { return setTimeout(resolve, tiempoEspera); })];
            });
        });
    }
    return scene;
}
function CrearMenu(engine, canvas) {
    scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
    var puedoReinciar = true;
    var ConteoDePuntos = 0;
    Puntos.innerHTML = ConteoDePuntos;
    botonCssReiniciar.style.visibility = 'visible';
    Puntos.style.visibility = "hidden";
    scene.onGameOver = new BABYLON.Observable();
    scene.onIniciar = new BABYLON.Observable();
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10, 0, 5), scene);
    camera.target = new BABYLON.Vector3(20, 10, 0);
    camera.beta = 1.5;
    camera.alpha = 0;
    camera.radius = 0.700;
    camera.attachControl(canvas, true);
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    light1.intensity = 1.5;
    BABYLON.SceneLoader.ImportMesh("", "./babylonExportBlender/", "Escenario.babylon", scene, function (newMeshes) {
        var helper = scene.createDefaultEnvironment();
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        scene.onIniciar.notifyObservers(true);
        var pajaro = scene.getMeshByName("pajaro");
        pajaro.dispose();
        var suelosColision = scene.getMeshesByTags("sueloColision");
        suelosColision.forEach(function (i) {
            i.visibility = 0;
        });
        var suelos = scene.getMeshesByTags("suelo");
        suelos.forEach(function (i) {
            i.visibility = 1;
            i.position.set(i.position.x, i.position.y, i.position.z - 30);
        });
        var Columnasfisicas = scene.getMeshesByTags("obstaculo");
        Columnasfisicas.forEach(function (i) {
            i.visibility = 0;
        });
        var columnasVisibles = scene.getMeshesByTags("columna");
        columnasVisibles.forEach(function (i) {
            i.visibility = 1;
        });
        var columnasPrincipales = scene.getMeshesByTags("columnasPrincipal");
        columnasPrincipales.forEach(function (i) {
            i.position.set(i.position.x, numeroAleatorio(4, 10), i.position.z - 30);
            i.visibility = 0;
        });
        var Puntajes = scene.getMeshesByTags("puntos");
        Puntajes.forEach(function (i) {
            i.visibility = 0;
        });
        var velocidadDesplazamiento = 0;
        var dificultad = 0.000;
        scene.getNodeByName("EmphtyReposicionar").visibility = 0;
        scene.getNodeByName("EmphtyReposicionar2").visibility = 0;
        scene.onAfterPhysicsObservable.add(function () {
            velocidadDesplazamiento = -0.001 + dificultad;
            columnasPrincipales.forEach(function (i) {
                i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime());
                if (i.position.z <= -30) {
                    i.position.set(0, numeroAleatorio(4, 10), 40);
                }
            });
            suelos.forEach(function (i) {
                i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, i.getAbsolutePosition().z + velocidadDesplazamiento * scene.getEngine().getDeltaTime()));
                if (i.getAbsolutePosition().z <= -60) {
                    if (i.name == "suelo") {
                        i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, scene.getNodeByName("EmphtyReposicionar2").getAbsolutePosition().z - 0.2));
                    }
                    if (i.name == "suelo2") {
                        i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, scene.getNodeByName("EmphtyReposicionar").getAbsolutePosition().z - 0.2));
                    }
                }
            });
        });
    });
    botonCssReiniciar.onclick = function () {
        if (puedoReinciar == true) {
            scene = CrearEscenaPrincipal(engine, canvas);
        }
    };
    function numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    return scene;
}
function PruebaEscenaMundo(engine, canvas) {
    scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10, 0, 5), scene);
    camera.target = new BABYLON.Vector3(20, 10, 0);
    camera.beta = 1.5;
    camera.alpha = 0;
    camera.radius = 0.700;
    camera.panningSensibility = 5000;
    camera.attachControl(canvas, true);
    scene.debugLayer.show();
    BABYLON.SceneLoader.Append("./babylonExportBlender/", "Escenario.babylon", scene, function name(scene) {
    });
    return scene;
}
CrearEscenaPrincipal(engine, canvas);
engine.runRenderLoop(function () {
    scene.render();
});
