/// <reference path="babylon.d.ts" />
/// <reference path="babylon.gui.d.ts" />
/// <reference path="babylon.js" />
/// <reference path="babylon.inspector.bundle.js" />
/// <reference path="babylonjs.loaders.min.js" />
/// <reference path="cannon.js" />
/// <reference path="babylon.gui.js"/>
/// <reference path="babylon.gui.min.js"/>
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
/////aqui empieza la aplicación/////////
var canvas = document.getElementById("renderCanvas"); //referencia al html con la etiqueta renderCanvas
var engine = new BABYLON.Engine(canvas, true); //creo el motor
window.addEventListener("resize", function () {
    engine.resize();
});
var scene; //Creo la escena afuera para poder reiniciar
function CrearEscenaPrincipal(engine, canvas) {
    scene = new BABYLON.Scene(engine); //crea la escena
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
    //VARIABLE GAME OVER INTERNA A LA ESCENA
    var gameOver = false;
    //scene.debugLayer.show();
    //observadores personalizados
    scene.onGameOver = new BABYLON.Observable(); //incia un observable de tipo puedo reiniciar
    scene.onReiniciar = new BABYLON.Observable(); //observable para enviar cuando es posible reiniciar
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
        /////SUELOS//////////////// SUELOS ////////////////// SUELOS //////
        //buscar los nodos,osea las columnas y suelo.Guardo en variables para manipular
        var suelos = scene.getMeshesByTags("suelo"); //busco el nodo padre que contiene a esas columnas
        suelos.forEach(function (i) {
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene); //creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
            BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo"); //agrego la etiqueta
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        /////COLUMNAS//////////////// COLUMNAS //////////////////COLUMNAS//////
        //De esta forma creo COLUMNAS físicas importadas desde Blender3D
        var Columnasfisicas = scene.getMeshesByTags("obstaculo"); //busco todos los objetos que tienen la etiqueta obstaculo son hijos de un nodo vacio que maneja las columnas fíśicas
        Columnasfisicas.forEach(function (i) {
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene); //creo impostores físicos,la masa se va sumando
            i.visibility = 0;
        });
        //Un tema importante Coloque siempre al impostor sobre el padre después de los hijos.
        var columnasPrincipales = scene.getMeshesByTags("columnasPrincipal"); //busco el nodo padre que contiene a esas columnas
        columnasPrincipales.forEach(function (i) {
            i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0 }, scene); //creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
            BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo"); //agrego la etiqueta                   
            i.position.set(i.position.x, numeroAleatorio(4, 10), i.position.z);
            i.visibility = 0;
        });
        /////////////////////////////////////////////////////////////////////////////////////////////////
        //VER COLISIONES FÏSICAS DE LOS OBJETOS///////////////////VER COLISIONES FÏSICAS DE LOS OBJETOS
        var physicsViewer = new BABYLON.Debug.PhysicsViewer(scene);
        var physicsEngine = scene.getPhysicsEngine();
        var impostores = physicsEngine.getImpostors();
        //console.log(impostores.length);
        // impostores.forEach(i => {
        //     physicsViewer.showImpostor(i);
        // });
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        //////PAJARO////////////////PAJARO////////////////////////PAJARO////////   
        var pajaro = scene.getNodeByName("pajaro");
        var pajaroFisico = new BABYLON.PhysicsImpostor(pajaro, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1, friction: 1, restitution: 0 }, scene);
        //pajaroFisico.
        // asi se detectan colisiones en babylon con el metodo onCollideEvent
        // uso como referencía physics impostor de un objeto como el pájaro
        pajaroFisico.onCollideEvent = function (collider, collidedWith) {
            //console.log(BABYLON.Tags.GetTags(collidedWith,"obstaculo"));
            //importantisimo detectar colisiones usando "Tags" serian grupos en godot
            if (BABYLON.Tags.GetTags(collidedWith) === "obstaculo") {
                console.log("colisiono con un obstaculo");
                gameOver = true;
                //puedoReiniciar = true;
                scene.onGameOver.notifyObservers(gameOver); //cuando llego aqui notifico que es game over
                //console.log("GAMEOVER desde la colisicón del pajaro: " + this.gameOverPublico);
                pajaroFisico.applyImpulse(new BABYLON.Vector3(0, -0.4, 0), pajaroFisico.getObjectCenter());
            }
        };
        ///VERIFICAR TECLAS PRESIONADOS USANDO LAS HERRAMIENTAS DE BABYLON
        scene.onPointerObservable.add(function (pointerInfo) {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    if (!gameOver) //sino es GameOver
                     {
                        pajaroFisico.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
                        pajaroFisico.applyImpulse(new BABYLON.Vector3(0, 0.5, 0), pajaroFisico.getObjectCenter());
                        //console.log(pajaroFisico.getLinearVelocity());
                    }
                    break;
            }
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
        ///PARA MOVER////////////////PARA MOVER/////////////////////PARA MOVER//////////////////
        var velocidadDesplazamiento = 0;
        //Este es el bucle principal con propiedades físicas tambien esta el bucle común
        scene.onAfterPhysicsObservable.add(function () {
            //console.log(suelo.position.z)
            if (!gameOver) {
                velocidadDesplazamiento = -0.006;
            }
            else {
                velocidadDesplazamiento = 0;
            }
            /////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS
            columnasPrincipales.forEach(function (i) {
                i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime()); //esto es para cambiar la posición del cuerpo fisico y la malla
                if (i.position.z < -30) {
                    i.position.set(0, numeroAleatorio(4, 10), 40);
                }
            });
            /////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO
            suelos.forEach(function (i) {
                i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime()); //esto es para cambiar la posición del cuerpo fisico y la malla                       
                if (i.position.z < -30) {
                    i.position.set(0, i.position.y, 40);
                }
            });
        });
        ///////////////////////////////////////////////////////////////////
        /////////////////Crear números aleatorios/////////////////////////
    });
    ////////INTERFACE//////////INTERFACE///////////INTERFACE////////////////////INTERFACE
    ///CREATE BUTTON
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Mi Interface UI");
    var boton = BABYLON.GUI.Button.CreateImageOnlyButton("boton", "./boton.png"); //creo un boton usando una iamgen
    boton.width = "208px";
    boton.height = "116px";
    boton.color = "trasparent";
    boton.cornerRadius = 20;
    boton.fontSize = 20;
    boton.thickness = 0;
    advancedTexture.addControl(boton);
    boton.isVisible = false;
    boton.isEnabled = false;
    scene.onGameOver.addOnce(function (gameOver) {
        boton.isVisible = true;
        boton.isEnabled = true;
    });
    boton.onPointerEnterObservable.add(function () {
        boton.scaleX = 1.5;
        boton.scaleY = 1.5;
    });
    boton.onPointerOutObservable.add(function () {
        boton.scaleX = 1;
        boton.scaleY = 1;
    });
    boton.onPointerClickObservable.addOnce(function () {
        CrearEscenaPrincipal(engine, canvas); //VUELVO A LLAMAR A LA FUNCION PARA REINICIAR LA ESCENA   
    });
    function numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    return scene; //retorno la escena
}
//NewScene();
CrearEscenaPrincipal(engine, canvas); //creo la escena
//principal renderLoop
engine.runRenderLoop(function () {
    scene.render(); //renderizo la escena en el bucle principal
});
