/// <reference path="babylon.d.ts" />
/// <reference path="babylon.gui.d.ts" />
/// <reference path="babylon.js" />
/// <reference path="babylon.inspector.bundle.js" />
/// <reference path="babylonjs.loaders.min.js" />
/// <reference path="cannon.js" />
/// <reference path="ammo.js" />
/// <reference path="babylon.gui.js"/>
/// <reference path="babylon.gui.min.js"/>
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
//////////////Esta clase no la uso es de ejemplo para tener una idea de como usar clases////////////////////////
var Pajaro //EJEMPLO DE COMO IMPLEMENTAR UNA CLASE USANDO LOS METODOS DE BABYLON EN ESTE CLASO EL MOLDE PARA UN PAJARO FISICO
 = /** @class */ (function () {
    function Pajaro(pajaroMesh) {
        this.pajaroMesh = pajaroMesh; //hago un get desde pajaroMesh
        this.cuerpoFisico = this.pajaroMesh.physicsImpostor;
        this.cuerpoFisico = new BABYLON.PhysicsImpostor(this.pajaroMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 });
    }
    Pajaro.prototype.volar = function () {
        this.cuerpoFisico.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        this.cuerpoFisico.applyImpulse(new BABYLON.Vector3(0, 0.5, 0), this.cuerpoFisico.getObjectCenter());
    };
    Object.defineProperty(Pajaro.prototype, "pajaroMaterial", {
        get: function () {
            return this._pajaroMaterial;
        },
        set: function (value) {
            this._pajaroMaterial = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pajaro.prototype, "pajaroPosicion", {
        get: function () {
            return this._pajaroPosicion;
        },
        set: function (value) {
            this._pajaroPosicion = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pajaro.prototype, "cuerpoFisico", {
        get: function () {
            return this._cuerpoFisico;
        },
        set: function (value) {
            this._cuerpoFisico = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pajaro.prototype, "pajaroMesh", {
        get: function () {
            return this._pajaroMesh;
        },
        set: function (value) {
            this._pajaroMesh = value;
        },
        enumerable: false,
        configurable: true
    });
    return Pajaro;
}());
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////aqui empieza la aplicación/////////
var canvas = document.getElementById("renderCanvas"); //referencia al html con la etiqueta renderCanvas
var engine = new BABYLON.Engine(canvas, true); //creo el motor
var Puntos = document.getElementById("puntos"); //referencía al puntaje
var botonCssReiniciar = document.getElementById("boton"); //referencía al puntaje
window.addEventListener("resize", function () {
    engine.resize();
});
var scene; //Creo la escena afuera para poder reiniciar
function CrearEscenaPrincipal(engine, canvas) {
    /////////VARIABLES GLOBALES PARA EL CONTROL DEL JUEGO Y DEPURACIÓN////////VARIABLES GLOBALES PARA EL CONTROL DEL JUEGO Y DEREPURACIÓN
    //OBJETOS DE LA ESCENA
    var visibleMaestros = 0; //HACE VISIBLE INVISIBLE LOS MAESTROS 0 invisible 1 visible
    var visibleEmphtyReposicionar = 0; //PARA HACER VISIBLES OBJETOS VACIOS QUE MUESTRAN UNA POSICIÓNES
    var visibleTodasLasColisiones = 0; //para hacer visibles invisibles las colisiones 0 invisible 1 visible
    var visibleColumnas = 1; //HACE INVISIBLE LAS COLUMNAS
    var desactivarColisionColumnas = false; //DESACTIVO COLISION COLUMNAS
    var visibleSuelo = 1; //HACE VISIBLE INVISIBLE LOS suelos 0 invisible 1 visible
    var desactivarColisionSuelo = false; //DESACTIVAR COLISION DEL SUELO
    var desactivarFisicasPajaro = false; //PARA DESACTIVAR LAS Físicas del pájaro
    //DIFICULTAD
    var velocidadMovimientoJuego = -0.1; //para hacer que las columnas se muevan más rápido esto es instantaneo
    var desactivarDificultad = false; //Relacionado con el timer
    var dificultadGeneral = 1.0; //Dificultad general de juego mayor numero más rápido aumenta la velocidad puede ser un número flotante
    var tiempoAumentarDificiltad = 1000; //cada ves que pasa este tiempo en milisegundos aumenta la dificultad se usa con deficultadGeneral
    //CAMARA Y EDITOR
    var camaraSigueJugador = false; //si la camara sigue al jugador
    var camaraSigueReposicionar = false; //si la camara sigue al objeto reposicionar
    var ActivarEditor = true; //SI MUESTRO O NO MUESTRO EL EDITOR que posee babylon en el navegador
    ////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////COMIENZA EL JUEGO/////////////////////////////////////////////////
    scene = new BABYLON.Scene(engine); //crea la escena
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
    ////////////////////////////////////////////////////////////////////////////////////
    //VARIABLE GAME OVER INTERNA A LA ESCENA
    var puedoReinciar = false;
    var ConteoDePuntos = 0;
    Puntos.innerHTML = ConteoDePuntos;
    botonCssReiniciar.style.visibility = 'hidden'; // hace invisible el boton
    Puntos.style.visibility = "visible";
    if (ActivarEditor) {
        scene.debugLayer.show();
    }
    //observadores personalizados
    scene.onGameOver = new BABYLON.Observable(); //incia un observable de tipo puedo reiniciar
    scene.onIniciar = new BABYLON.Observable();
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10, 0, 5), scene);
    camera.target = new BABYLON.Vector3(20, 10, 0);
    camera.beta = 1.5;
    camera.alpha = 0;
    camera.radius = 0.700;
    camera.panningSensibility = 5000;
    // var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(20, 10, 0), scene);
    //camera.rotation = new BABYLON.Vector3(0, 110, 0);
    camera.attachControl(canvas, true);
    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    var light3 = new BABYLON.DirectionalLight("light3", new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 5;
    //light3.intensity = 5;
    light3.setDirectionToTarget(new BABYLON.Vector3(0, 90, 0));
    //en babylon las escenas se cargan asincronicamente por lo tanto para que funcionen
    //hay que manejar los modelos desde el sceneLoader,esto puede traer
    //muchos problemas,pero tendría que ser posible solucionarlo
    //por ahora de esta forma funciona,estudiar la asincronía de javascript
    BABYLON.SceneLoaderFlags.ShowLoadingScreen = false; //para no ver las barras de cargas cuando importo las mallas desde Blender3D
    BABYLON.SceneLoader.Append("./babylonExportBlender/", "Escenario.babylon", scene, 
    //BABYLON.SceneLoader.ImportMesh("","/./","Gltf/Escenario.glb",scene,
    function (scene) {
        //enviroment creado rapidamente
        // var helper = scene.createDefaultEnvironment();
        // helper.setMainColor(new BABYLON.Color3(0.26,0.45,0.9));     
        //var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        //var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
        scene.getNodeByName("CameraBlender").fov = 0.40; //cambia el Field of view de la camara importada desde blender en este caso 0.30 representa 30 grados.
        //////////////////////////////////////////////////////////////////////////////////////////////////
        scene.onIniciar.notifyObservers(true); //"OBSERVADOR PERSONALIZADO"//notifica verdadero cuando inicio la escena 
        /////SUELOS//////////////// SUELOS ////////////////// SUELOS //////
        //buscar los nodos,osea las columnas y suelo.Guardo en variables para manipular
        var sueloMalla = scene.getMeshesByTags("sueloMalla");
        sueloMalla.forEach(function (i) {
            i.visibility = visibleSuelo;
        });
        var suelosColision = scene.getMeshesByTags("sueloColision");
        suelosColision.forEach(function (i) {
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene); //creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
            BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo"); //agrego la etiqueta
            i.visibility = visibleTodasLasColisiones; //MUESTRA LA COLISION DEL SUELO
            //i.material.wireframe = true;
            if (desactivarColisionSuelo) {
                i.dispose();
            }
        });
        var suelos = scene.getMeshesByTags("suelo"); //busco el nodo padre que contiene a esas columnas
        suelos.forEach(function (i) {
            i.visibility = visibleMaestros; //MUESTRA LA MALLA DEL SUELO
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0, friction: 1, restitution: 0 }, scene); //creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
            BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo"); //agrego la etiqueta
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        /////COLUMNAS//////////////// COLUMNAS //////////////////COLUMNAS//////
        //De esta forma creo COLUMNAS físicas importadas desde Blender3D
        var ColumnasColision = scene.getMeshesByTags("obstaculo"); //busco todos los objetos que tienen la etiqueta obstaculo son hijos de un nodo vacio que maneja las columnas fíśicas
        ColumnasColision.forEach(function (i) {
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene); //creo impostores físicos,la masa se va sumando
            i.visibility = visibleTodasLasColisiones; //MUESTRA LA COLISION DE LAS COLUMNAS
            if (desactivarColisionColumnas) {
                i.dispose();
            }
        });
        //para hacer invisible las columnas
        var columnasVisibles = scene.getMeshesByTags("columna");
        columnasVisibles.forEach(function (i) {
            i.visibility = visibleColumnas; //NMUESTRA LAS COLUMNAS
        });
        //Un tema importante Coloque siempre al impostor sobre el padre después de los hijos.
        var columnasPrincipales = scene.getMeshesByTags("columnasPrincipal"); //busco el nodo padre que contiene a esas columnas
        columnasPrincipales.forEach(function (i) {
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0 }, scene); //creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
            BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo"); //agrego la etiqueta                   
            i.position.set(i.position.x, numeroAleatorio(4, 10), i.position.z);
            i.visibility = visibleMaestros;
        });
        /////////////////////////////////////////////////////////////////////////////////////////////////
        //VER COLISIONES FÏSICAS DE LOS OBJETOS///////////////////VER COLISIONES FÏSICAS DE LOS OBJETOS
        // const physicsViewer: BABYLON.Debug.PhysicsViewer = new BABYLON.Debug.PhysicsViewer(scene);
        // const physicsEngine: BABYLON.IPhysicsEngine = scene.getPhysicsEngine()
        // var impostores: BABYLON.PhysicsImpostor[] = physicsEngine.getImpostors();
        // console.log(impostores.length);
        // impostores.forEach(i => {
        //     physicsViewer.showImpostor(i);
        // });
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        //////PAJARO////////////////PAJARO////////////////////////PAJARO////////   
        var pajaroColision = scene.getNodeByName("pajaroColision");
        pajaroColision.visibility = visibleTodasLasColisiones; //MUESTRA LA COLISION DEL PAJARO
        pajaroColision.physicsImpostor = new BABYLON.PhysicsImpostor(pajaroColision, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);
        var pajaro = scene.getNodeByName("pajaro");
        pajaro.physicsImpostor = new BABYLON.PhysicsImpostor(pajaro, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0.1, friction: 1, restitution: 0 }, scene);
        var pajaroFisico = pajaro.physicsImpostor;
        //pajaroFisico.
        // asi se detectan colisiones en babylon con el metodo onCollideEvent
        // uso como referencía physics impostor de un objeto como el pájaro
        pajaroFisico.onCollideEvent = function (collider, collidedWith) {
            //console.log(BABYLON.Tags.GetTags(collidedWith,"obstaculo"));
            //importantisimo detectar colisiones usando "Tags" serian grupos en godot
            if (BABYLON.Tags.GetTags(collidedWith) === "obstaculo") {
                //console.log("colisiono con un obstaculo");
                puedoReinciar = true;
                //puedoReiniciar = true;
                scene.onGameOver.notifyObservers(puedoReinciar); //cuando llego aqui notifico que es game over
                //console.log("GAMEOVER desde la colisicón del pajaro: " + this.gameOverPublico);
                pajaroFisico.applyImpulse(new BABYLON.Vector3(0, -0.4, 0), pajaroFisico.getObjectCenter());
            }
        };
        if (desactivarFisicasPajaro) //si desactivo las físicas
         {
            pajaroFisico.dispose(); //borrar para ver el pájaro
        }
        //pajaro.dispose();//borrar para ver el pájaro
        ///VERIFICAR TECLAS PRESIONADOS USANDO LAS HERRAMIENTAS DE BABYLON
        scene.onPointerObservable.add(function (pointerInfo) {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    if (!puedoReinciar) //sino es GameOver
                     {
                        pajaroFisico.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
                        pajaroFisico.applyImpulse(new BABYLON.Vector3(0, 0.5, 0), pajaroFisico.getObjectCenter());
                        //console.log(pajaroFisico.getLinearVelocity());
                    }
                    break;
            }
        });
        if (camaraSigueJugador) //para hacer que la camara siga al jugador
         {
            camera.setTarget(pajaro, false, false); //la camara sigue al jugador llamado pajaro
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
        ////////DETECTAR PUNTOS ////////DETECTAR PUNTOS ////////DETECTAR PUNTOS ////////DETECTAR PUNTOS
        var Puntajes = scene.getMeshesByTags("puntos"); //busco el nodo padre que contiene a esas columnas
        Puntajes.forEach(function (i) {
            i.visibility = 0; //hago Visible/invisible las mallas que funcionan para sumar puntos
            //agrego un action manager a cada columna
            i.actionManager = new BABYLON.ActionManager(scene); //creo el nuevo action manager
            //register a new action with the marble's actionManager..this will execute code whenever the marble intersects the "killBox"
            i.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: pajaro //cuando el pajaro entra a esta area
            }, function () {
                ConteoDePuntos += 1;
                Puntos.innerHTML = ConteoDePuntos; //convierto a string
                //console.log("el pajaro entro al area para los puntos");//muestro este mensaje por consola
            }));
        });
        ///////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
        ///PARA MOVER////////////////PARA MOVER/////////////////////PARA MOVER//////////////////
        var velocidadDesplazamiento = 0;
        var dificultad = 0.000;
        function AumentarDificultad() {
            if (!puedoReinciar) {
                dificultad -= dificultadGeneral / 10000; //valor usado para aumentar la difultad
                console.log("aumenta la dificultad");
                //console.log(dificultad)
            }
        }
        if (!desactivarDificultad) //sino desactive la dificultad
         {
            setInterval(AumentarDificultad, tiempoAumentarDificiltad); //llamo a esta función cada cierto tiempo
        }
        ////////HERRAMIENTA PARA REPOSICIONAR OBJETOS////////HERRAMIENTA PARA REPOSICIONAR OBJETOS////////HERRAMIENTA PARA REPOSICIONAR OBJETOS
        ////EmphtyReposicionar            ////EmphtyReposicionar            ////EmphtyReposicionar
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
        //Este es el bucle principal con propiedades físicas tambien esta el bucle común
        scene.onAfterPhysicsObservable.add(function () {
            //console.log(suelo.position.z)
            if (!puedoReinciar) {
                velocidadDesplazamiento = velocidadMovimientoJuego + dificultad * scene.getEngine().getDeltaTime();
            }
            else {
                velocidadDesplazamiento = 0;
                dificultad = 0;
            }
            /////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS
            columnasPrincipales.forEach(function (i) {
                i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, i.getAbsolutePosition().z + velocidadDesplazamiento));
                if (i.position.z <= -30) //si la posicion es menos 30
                 {
                    i.position.set(0, numeroAleatorio(4, 10), 40 + velocidadDesplazamiento); //la posicion sera 40,siempre sumo la velocidad de desplazamiento para que las columnas no queden desplazadas
                }
            });
            /////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO
            suelos.forEach(function (i) {
                //i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime());//esto es para cambiar la posición del cuerpo fisico y la malla                       
                i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, i.getAbsolutePosition().z + velocidadDesplazamiento));
                if (i.getAbsolutePivotPoint().z <= -60) {
                    //i.position.set(i.position.x,i.position.y,(40));
                    if (i.name == "suelo") {
                        i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, EmphtyReposicionar2.getAbsolutePivotPoint().z + velocidadDesplazamiento)); //hay que sumarle la velocidad de desplazamieto para que los suelos queden pegados
                        //console.log(EmphtyReposicionar.getAbsolutePosition().z + velocidadDesplazamiento);
                    }
                    if (i.name == "suelo2") {
                        i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, EmphtyReposicionar.getAbsolutePivotPoint().z + velocidadDesplazamiento)); //hay que sumarle la velocidad de desplazamieto para que los suelos queden pegados
                        //console.log( EmphtyReposicionar.getAbsolutePivotPoint().z + velocidadDesplazamiento);
                    }
                }
            });
        });
    });
    ////////INTERFACE//////////INTERFACE///////////INTERFACE////////////////////INTERFACE
    ///CREATE BUTTON
    scene.onGameOver.addOnce(function (gameOver) {
        // // boton.isVisible = true;
        // // boton.isEnabled = true;
        setTimeout(function () {
            botonCssReiniciar.style.visibility = 'visible'; // hace invisible el boton  
        }, 300);
    });
    botonCssReiniciar.onclick = function () {
        //console.log("presione sobre el boton")
        if (puedoReinciar == true) {
            scene = CrearEscenaPrincipal(engine, canvas); //VUELVO A LLAMAR A LA FUNCION PARA REINICIAR LA ESCENA   
        }
    };
    function numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    function Timer(tiempoEspera) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, tiempoEspera); })];
            });
        });
    }
    return scene; //retorno la escena
}
function CrearMenu(engine, canvas) {
    scene = new BABYLON.Scene(engine); //crea la escena
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
    //VARIABLE GAME OVER INTERNA A LA ESCENA
    var puedoReinciar = true;
    var ConteoDePuntos = 0;
    Puntos.innerHTML = ConteoDePuntos;
    botonCssReiniciar.style.visibility = 'visible'; // hace invisible el boton
    Puntos.style.visibility = "hidden";
    //scene.debugLayer.show();
    //observadores personalizados
    scene.onGameOver = new BABYLON.Observable(); //incia un observable de tipo puedo reiniciar
    scene.onIniciar = new BABYLON.Observable();
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10, 0, 5), scene);
    camera.target = new BABYLON.Vector3(20, 10, 0);
    camera.beta = 1.5;
    camera.alpha = 0;
    camera.radius = 0.700;
    camera.attachControl(canvas, true);
    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    //var light3 = new BABYLON.DirectionalLight("light3", new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 1.5;
    //en babylon las escenas se cargan asincronicamente por lo tanto para que funcionen
    //hay que manejar los modelos desde el sceneLoader,esto puede traer
    //muchos problemas,pero tendría que ser posible solucionarlo
    //por ahora de esta forma funciona,estudiar la asincronía de javascript
    BABYLON.SceneLoader.ImportMesh("", "./babylonExportBlender/", "Escenario.babylon", scene, 
    //BABYLON.SceneLoader.ImportMesh("","/./","Gltf/Escenario.glb",scene,
    function (newMeshes) {
        //enviroment creado rapidamente
        var helper = scene.createDefaultEnvironment();
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        //var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
        //helper.setMainColor(BABYLON.Color3.Teal());     
        //////////////////////////////////////////////////////////////////////////////////////////////////
        scene.onIniciar.notifyObservers(true); //"OBSERVADOR PERSONALIZADO"//notifica verdadero cuando inicio la escena 
        var pajaro = scene.getMeshByName("pajaro");
        pajaro.dispose();
        /////SUELOS//////////////// SUELOS ////////////////// SUELOS //////
        //buscar los nodos,osea las columnas y suelo.Guardo en variables para manipular
        var suelosColision = scene.getMeshesByTags("sueloColision");
        suelosColision.forEach(function (i) {
            i.visibility = 0;
            //i.material.wireframe = true;
        });
        var suelos = scene.getMeshesByTags("suelo"); //busco el nodo padre que contiene a esas columnas
        suelos.forEach(function (i) {
            i.visibility = 1;
            i.position.set(i.position.x, i.position.y, i.position.z - 30);
            //BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo")//agrego la etiqueta
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        /////COLUMNAS//////////////// COLUMNAS //////////////////COLUMNAS//////
        //De esta forma creo COLUMNAS físicas importadas desde Blender3D
        var Columnasfisicas = scene.getMeshesByTags("obstaculo"); //busco todos los objetos que tienen la etiqueta obstaculo son hijos de un nodo vacio que maneja las columnas fíśicas
        Columnasfisicas.forEach(function (i) {
            i.visibility = 0;
            //i.material.wireframe = true;
            //i.dispose();
            // // // var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            // // // myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
            // // // i.material= myMaterial;
        });
        //para hacer invisible las columnas
        var columnasVisibles = scene.getMeshesByTags("columna");
        columnasVisibles.forEach(function (i) {
            i.visibility = 1;
        });
        //Un tema importante Coloque siempre al impostor sobre el padre después de los hijos.
        var columnasPrincipales = scene.getMeshesByTags("columnasPrincipal"); //busco el nodo padre que contiene a esas columnas
        columnasPrincipales.forEach(function (i) {
            i.position.set(i.position.x, numeroAleatorio(4, 10), i.position.z - 30);
            i.visibility = 0;
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
        ////////PUNTOS////////PUNTOS////////PUNTOS////////PUNTOS////////PUNTOS//////////
        var Puntajes = scene.getMeshesByTags("puntos"); //busco el nodo padre que contiene a esas columnas
        Puntajes.forEach(function (i) {
            i.visibility = 0; //hago Visible/invisible las mallas que funcionan para sumar puntos
            //agrego un action manager a cada columna
        });
        ///////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
        ///PARA MOVER////////////////PARA MOVER/////////////////////PARA MOVER//////////////////
        var velocidadDesplazamiento = 0;
        var dificultad = 0.000;
        scene.getNodeByName("EmphtyReposicionar").visibility = 0;
        scene.getNodeByName("EmphtyReposicionar2").visibility = 0;
        //Este es el bucle principal con propiedades físicas tambien esta el bucle común
        scene.onAfterPhysicsObservable.add(function () {
            //console.log(suelo.position.z)
            velocidadDesplazamiento = -0.001 + dificultad;
            /////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS
            columnasPrincipales.forEach(function (i) {
                i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime()); //esto es para cambiar la posición del cuerpo fisico y la malla
                if (i.position.z <= -30) {
                    i.position.set(0, numeroAleatorio(4, 10), 40);
                }
            });
            /////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO
            suelos.forEach(function (i) {
                //i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime());//esto es para cambiar la posición del cuerpo fisico y la malla                       
                i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, i.getAbsolutePosition().z + velocidadDesplazamiento * scene.getEngine().getDeltaTime()));
                if (i.getAbsolutePosition().z <= -60) {
                    //i.position.set(i.position.x,i.position.y,(40));
                    if (i.name == "suelo") {
                        i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, scene.getNodeByName("EmphtyReposicionar2").getAbsolutePosition().z - 0.2));
                        //console.log((scene.getNodeByName("EmphtyReposicionar2") as BABYLON.Mesh).getAbsolutePivotPoint().z);
                        //console.log("esta reposicionando suelo 1");
                    }
                    if (i.name == "suelo2") {
                        i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x, i.getAbsolutePosition().y, scene.getNodeByName("EmphtyReposicionar").getAbsolutePosition().z - 0.2));
                        //console.log("esta reposicionando suelo 2");
                    }
                }
                // //console.log(i.position.z);
                // // if(i.position.z <= -60)
                // // {
                // //     //i.position.set(i.position.x,i.position.y,(40));
                // //     if(i.name == "suelo")
                // //     {
                // //         i.position.set(
                // //             i.position.x,
                // //             i.position.y,
                // //             (scene.getNodeByName("EmphtyReposicionar2") as BABYLON.Mesh).getAbsolutePivotPoint().z);
                // //         //console.log((scene.getNodeByName("EmphtyReposicionar2") as BABYLON.Mesh).getAbsolutePivotPoint().z);
                // //     }
                // //     if(i.name == "suelo2")
                // //     {
                // //         i.position.set(
                // //             i.position.x
                // //             ,i.position.y,
                // //             (scene.getNodeByName("EmphtyReposicionar") as BABYLON.Mesh).getAbsolutePivotPoint().z);
                // //         //console.log((scene.getNodeByName("EmphtyReposicionar") as BABYLON.Mesh).getAbsolutePivotPoint().z);
                // //     }
                // // }
            });
        });
        ///////////////////////////////////////////////////////////////////
        /////////////////Crear números aleatorios/////////////////////////
    });
    ////////INTERFACE//////////INTERFACE///////////INTERFACE////////////////////INTERFACE
    ///CREATE BUTTON
    botonCssReiniciar.onclick = function () {
        //console.log("presione sobre el boton")
        if (puedoReinciar == true) {
            scene = CrearEscenaPrincipal(engine, canvas); //VUELVO A LLAMAR A LA FUNCION PARA REINICIAR LA ESCENA   
        }
    };
    function numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    return scene; //retorno la escena
}
function PruebaEscenaMundo(engine, canvas) {
    scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10, 0, 5), scene);
    camera.target = new BABYLON.Vector3(20, 10, 0);
    camera.beta = 1.5;
    camera.alpha = 0;
    camera.radius = 0.700;
    camera.panningSensibility = 5000;
    // var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(20, 10, 0), scene);
    //camera.rotation = new BABYLON.Vector3(0, 110, 0);
    camera.attachControl(canvas, true);
    scene.debugLayer.show();
    BABYLON.SceneLoader.Append("./babylonExportBlender/", "Escenario.babylon", scene, function name(scene) {
        //scene.activeCamera = (scene.getNodeByName("CameraBlender") as BABYLON.Camera);
    });
    return scene;
}
//NewScene();
// CrearMenu(engine,canvas);
CrearEscenaPrincipal(engine, canvas); //creo la escena
//PruebaEscenaMundo(engine,canvas);//creo la escena
//principal renderLoop
engine.runRenderLoop(function () {
    scene.render(); //renderizo la escena en el bucle principal
});
