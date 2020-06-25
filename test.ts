/// <reference path="babylon.d.ts" />
/// <reference path="babylon.gui.d.ts" />
/// <reference path="babylon.js" />
/// <reference path="babylon.inspector.bundle.js" />
/// <reference path="babylonjs.loaders.min.js" />
/// <reference path="cannon.js" />
/// <reference path="babylon.gui.js"/>
/// <reference path="babylon.gui.min.js"/>


class Pajaro //EJEMPLO DE COMO IMPLEMENTAR UNA CLASE USANDO LOS METODOS DE BABYLON EN ESTE CLASO EL MOLDE PARA UN PAJARO FISICO
{
    private _pajaroMesh: BABYLON.AbstractMesh;//guardo el mesh del pajaro en esta variable
    private _cuerpoFisico: BABYLON.PhysicsImpostor;
    private _pajaroPosicion: BABYLON.Vector3;
    private _pajaroMaterial: BABYLON.Material;
   
    constructor(pajaroMesh:BABYLON.AbstractMesh)
    {
        this.pajaroMesh = pajaroMesh;//hago un get desde pajaroMesh
        this.cuerpoFisico = this.pajaroMesh.physicsImpostor; 
        this.cuerpoFisico = new BABYLON.PhysicsImpostor(this.pajaroMesh,BABYLON.PhysicsImpostor.BoxImpostor,{mass:0});
    }

    public volar()//acción volar
    {
        this.cuerpoFisico.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        this.cuerpoFisico.applyImpulse(new BABYLON.Vector3(0, 0.5, 0), this.cuerpoFisico.getObjectCenter());
    }

    public get pajaroMaterial(): BABYLON.Material {
        return this._pajaroMaterial;
    }
    public set pajaroMaterial(value: BABYLON.Material) {
        this._pajaroMaterial = value;
    }
    public get pajaroPosicion(): BABYLON.Vector3 {
        return this._pajaroPosicion;
    }
    public set pajaroPosicion(value: BABYLON.Vector3) {
        this._pajaroPosicion = value;
    }
    public get cuerpoFisico(): BABYLON.PhysicsImpostor {
        return this._cuerpoFisico;
    }
    public set cuerpoFisico(value: BABYLON.PhysicsImpostor) {
        this._cuerpoFisico = value;
    }
    public get pajaroMesh(): BABYLON.AbstractMesh {
        return this._pajaroMesh;
    }
    public set pajaroMesh(value: BABYLON.AbstractMesh) {
        this._pajaroMesh = value;
    }

}

/////aqui empieza la aplicación/////////
var canvas: HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement;//referencia al html con la etiqueta renderCanvas
var engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);//creo el motor
window.addEventListener("resize", function () { //agrego el evento para que constantemente se acutalice el navegador
    engine.resize();
});


var scene:BABYLON.Scene;//Creo la escena afuera para poder reiniciar

function CrearEscenaPrincipal(engine:BABYLON.Engine,canvas:HTMLElement):BABYLON.Scene //retorna la escena tomo como parametro el motor
    { 
    scene = new BABYLON.Scene(engine);//crea la escena
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
    //VARIABLE GAME OVER INTERNA A LA ESCENA
    var gameOver:boolean = false;
    
    //scene.debugLayer.show();

    //observadores personalizados
    scene.onGameOver = new BABYLON.Observable();//incia un observable de tipo puedo reiniciar
    scene.onReiniciar = new BABYLON.Observable()//observable para enviar cuando es posible reiniciar
    scene.onIniciar = new BABYLON.Observable();

    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10, 0, 5), scene);
    camera.target = new BABYLON.Vector3(20, 10, 0)
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
        function (newMeshes: BABYLON.AbstractMesh[]) {
            //enviroment creado rapidamente
            var helper = scene.createDefaultEnvironment();
            var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
            //var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

            //helper.setMainColor(BABYLON.Color3.Teal());     
            //////////////////////////////////////////////////////////////////////////////////////////////////
            scene.onIniciar.notifyObservers(true);//"OBSERVADOR PERSONALIZADO"//notifica verdadero cuando inicio la escena 

            /////SUELOS//////////////// SUELOS ////////////////// SUELOS //////
            //buscar los nodos,osea las columnas y suelo.Guardo en variables para manipular
            var suelos: BABYLON.Mesh[] = scene.getMeshesByTags("suelo") as BABYLON.Mesh[];//busco el nodo padre que contiene a esas columnas
            suelos.forEach(i => { //recorro todos esos objetos ycreo un impostores físicos automaticamente
                i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 ,friction : 1,restitution : 0}, scene);//creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
                BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo")//agrego la etiqueta
            });
            
            //////////////////////////////////////////////////////////////////////////////////////////////////////
            /////COLUMNAS//////////////// COLUMNAS //////////////////COLUMNAS//////
            //De esta forma creo COLUMNAS físicas importadas desde Blender3D
            var Columnasfisicas: BABYLON.Mesh[] = scene.getMeshesByTags("obstaculo") as BABYLON.Mesh[];//busco todos los objetos que tienen la etiqueta obstaculo son hijos de un nodo vacio que maneja las columnas fíśicas
            Columnasfisicas.forEach(i => { //recorro todos esos objetos ycreo un impostores físicos automaticamente
                i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);//creo impostores físicos,la masa se va sumando
                i.visibility = 0;
            });

            //Un tema importante Coloque siempre al impostor sobre el padre después de los hijos.
            var columnasPrincipales: BABYLON.Mesh[] = scene.getMeshesByTags("columnasPrincipal") as BABYLON.Mesh[];//busco el nodo padre que contiene a esas columnas
            columnasPrincipales.forEach(i => { //recorro todos esos objetos ycreo un impostores físicos automaticamente
                i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0 }, scene);//creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
                BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo")//agrego la etiqueta                   
                i.position.set(i.position.x,numeroAleatorio(4,10),i.position.z);
                i.visibility = 0;
            });
            

            /////////////////////////////////////////////////////////////////////////////////////////////////
            //VER COLISIONES FÏSICAS DE LOS OBJETOS///////////////////VER COLISIONES FÏSICAS DE LOS OBJETOS
            const physicsViewer: BABYLON.Debug.PhysicsViewer = new BABYLON.Debug.PhysicsViewer(scene);
            const physicsEngine: BABYLON.IPhysicsEngine = scene.getPhysicsEngine()
            
            var impostores: BABYLON.PhysicsImpostor[] = physicsEngine.getImpostors();
            
            //console.log(impostores.length);
            // impostores.forEach(i => {
            //     physicsViewer.showImpostor(i);
            // });

            ///////////////////////////////////////////////////////////////////////////////////////////////////
            //////PAJARO////////////////PAJARO////////////////////////PAJARO////////   
            var pajaro: BABYLON.AbstractMesh = scene.getNodeByName("pajaro") as BABYLON.AbstractMesh;
            var pajaroFisico: BABYLON.PhysicsImpostor = new BABYLON.PhysicsImpostor(pajaro, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1, friction: 1, restitution: 0 }, scene);
            //pajaroFisico.
            // asi se detectan colisiones en babylon con el metodo onCollideEvent
            // uso como referencía physics impostor de un objeto como el pájaro
            pajaroFisico.onCollideEvent = (collider, collidedWith) => {
                //console.log(BABYLON.Tags.GetTags(collidedWith,"obstaculo"));
                //importantisimo detectar colisiones usando "Tags" serian grupos en godot
                if (BABYLON.Tags.GetTags(collidedWith) === "obstaculo") {
                    console.log("colisiono con un obstaculo");
                    
                    gameOver = true;
                    //puedoReiniciar = true;
                    scene.onGameOver.notifyObservers(gameOver);//cuando llego aqui notifico que es game over
                    //console.log("GAMEOVER desde la colisicón del pajaro: " + this.gameOverPublico);
                    pajaroFisico.applyImpulse(new BABYLON.Vector3(0, -0.4, 0), pajaroFisico.getObjectCenter());
                }
            };
            ///VERIFICAR TECLAS PRESIONADOS USANDO LAS HERRAMIENTAS DE BABYLON
            scene.onPointerObservable.add((pointerInfo) => {
                switch (pointerInfo.type) {
                    case BABYLON.PointerEventTypes.POINTERDOWN:
                        if (!gameOver)//sino es GameOver
                        {
                            pajaroFisico.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
                            pajaroFisico.applyImpulse(new BABYLON.Vector3(0, 0.5, 0), pajaroFisico.getObjectCenter());
                            //console.log(pajaroFisico.getLinearVelocity());
                        }
                        break;
                }
            });
            ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
            ////////PUNTOS////////PUNTOS////////PUNTOS////////PUNTOS////////PUNTOS//////////
            var Puntajes: BABYLON.Mesh[] = scene.getMeshesByTags("puntos") as BABYLON.Mesh[];//busco el nodo padre que contiene a esas columnas
            Puntajes.forEach(i => { //recorro todos esos objetos
                i.visibility = 0;//hago invisible las mallas que funcionan para sumar puntos
                //agrego un action manager a cada columna
                i.actionManager = new BABYLON.ActionManager(scene);//creo el nuevo action manager
                //register a new action with the marble's actionManager..this will execute code whenever the marble intersects the "killBox"
                i.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                        {
                        trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger,//cuando nu cuerpo entra a esta area
                        parameter:pajaro//cuando el pajaro entra a esta area
                        }, 
                        function(){
                            console.log("el pajaro entro al area para los puntos");//muestro este mensaje por consola
                        }
                    )
                );
            });
            ///////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
            ///PARA MOVER////////////////PARA MOVER/////////////////////PARA MOVER//////////////////
            var velocidadDesplazamiento = 0;
            //Este es el bucle principal con propiedades físicas tambien esta el bucle común
            scene.onAfterPhysicsObservable.add(() => { //ESTO ES COMO UN UPDATE DE GODOT O UNITY en babylon se usan los OBSERVABLES que son como señales personalizadas
                //console.log(suelo.position.z)
                if (!gameOver) {
                    velocidadDesplazamiento = -0.006;
                }
                else{
                    velocidadDesplazamiento = 0; 
                }
                /////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS
                columnasPrincipales.forEach(i => {
                    i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime());//esto es para cambiar la posición del cuerpo fisico y la malla
                    if(i.position.z < -30)
                    {
                        i.position.set(
                            0,
                            numeroAleatorio(4,10),
                            40);
                    }
                });
                /////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO
                suelos.forEach(i => {
                    i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime());//esto es para cambiar la posición del cuerpo fisico y la malla                       
                    if(i.position.z < -30)
                    {
                        i.position.set(0,i.position.y,40);
                    }
                });
            })
            ///////////////////////////////////////////////////////////////////
            /////////////////Crear números aleatorios/////////////////////////
            
        });
    
    ////////INTERFACE//////////INTERFACE///////////INTERFACE////////////////////INTERFACE
     ///CREATE BUTTON
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Mi Interface UI");
    var boton = BABYLON.GUI.Button.CreateImageOnlyButton("boton", "./boton.png");//creo un boton usando una iamgen
    boton.width = "208px"
    boton.height = "116px";
    boton.color = "trasparent";
    boton.cornerRadius = 20;
    boton.fontSize = 20;
    boton.thickness = 0;
    advancedTexture.addControl(boton);

 
    boton.isVisible = false;
    boton.isEnabled = false;


    scene.onGameOver.addOnce(function(gameOver:boolean) { //observable si es GameOver
        boton.isVisible = true;
        boton.isEnabled = true;
    })
    boton.onPointerEnterObservable.add(function()//observable si el mouse entro
    {
        boton.scaleX =  1.5;
        boton.scaleY = 1.5;
    })
    boton.onPointerOutObservable.add(function()//observable si el mouse salio
    {
        boton.scaleX = 1;
        boton.scaleY = 1;
    })
    boton.onPointerClickObservable.addOnce(function()//observable si presiono el boton
    {
        CrearEscenaPrincipal(engine,canvas);//VUELVO A LLAMAR A LA FUNCION PARA REINICIAR LA ESCENA   
    })
    
    
    function numeroAleatorio(min:number, max:number)//función para crear números aleatorios
    {
        return Math.round(Math.random() * (max - min) + min);
    }
        
    return scene;//retorno la escena
}

//NewScene();
CrearEscenaPrincipal(engine,canvas);//creo la escena

//principal renderLoop
engine.runRenderLoop(function ()
{  
    scene.render();//renderizo la escena en el bucle principal
});







