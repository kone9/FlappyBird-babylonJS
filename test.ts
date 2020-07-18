/// <reference path="babylon.d.ts" />
/// <reference path="babylon.gui.d.ts" />
/// <reference path="babylon.js" />
/// <reference path="babylon.inspector.bundle.js" />
/// <reference path="babylonjs.loaders.min.js" />
/// <reference path="cannon.js" />
/// <reference path="ammo.js" />
/// <reference path="babylon.gui.js"/>
/// <reference path="babylon.gui.min.js"/>

//////////////Esta clase no la uso es de ejemplo para tener una idea de como usar clases////////////////////////
class ObjetoFisico //EJEMPLO DE COMO IMPLEMENTAR UNA CLASE USANDO LOS METODOS DE BABYLON EN ESTE CLASO EL MOLDE PARA UN PAJARO FISICO
{
    private _mesh: BABYLON.AbstractMesh;//guardo el mesh del pajaro en esta variable
    private _meshColision: BABYLON.AbstractMesh;
    private _maestroFisico: BABYLON.PhysicsImpostor;//para tener una referencía al cuerpo físico de este objeto
    private _posicion: BABYLON.Vector3;//referencia a la posición de este objeto
    private _posicionColision: BABYLON.Vector3;
    private _material: BABYLON.Material;//referencía al material de este objeto

    constructor(mallaParaRepresentarElObjeto:BABYLON.AbstractMesh,mallaCuerpoFisico:BABYLON.AbstractMesh)
    {
        //importante para que funcione los cuerpor rigidos hijos tienen
        //que ser creados como se ven en las siguientes lineas
        //si cambias las lineas de posición no funcionaran correctamente
        this.meshColision = mallaCuerpoFisico;//obtengo la malla del cuerop fisico
        this.CrearCuerpoRigidoEnColision()//creo el cuerpo Rigido en la colision
        this.mesh = mallaParaRepresentarElObjeto;//obtengo la malla de objeto
        this.CrearCuerpoRigidoEnMalla();//creo el cuerpo Rigido a la malla que controla la colisicion se suman las masas
        this.maestroFisico = this.mesh.physicsImpostor;

        this.posicion = this.mesh.position;//posicion de la malla
        this.material = this.mesh.material;//material de la malla
        this.posicionColision = this.meshColision.position;//posicion del cuerpo Rigido
    }

    private CrearCuerpoRigidoEnColision()//crea el cuerpo rigido a la colisión "TIENE COLISION"
    {
        this.meshColision.physicsImpostor = new BABYLON.PhysicsImpostor(this.meshColision, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);//creo el cuerpoFisico al
    }
    private CrearCuerpoRigidoEnMalla()//crea el cuerpo rigido a la malla importante "NO TIENE COLISION"
    {
        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0.1, friction: 1, restitution: 0 }, scene);
    }
    public get mesh(): BABYLON.AbstractMesh {//para obtener la malla de este objeto
        return this._mesh;
    }
    public set mesh(value: BABYLON.AbstractMesh) {//para cambiar la malla de este objeto
        this._mesh = value;
    }
    public DestruirFisicaDeEsteObjeto(destruirFisicas:boolean= false)//destruir la física del objeto
    {
        this.maestroFisico.dispose();
    }
    public get meshColision(): BABYLON.AbstractMesh {//obtengo la malla de la colision de este objeto
        return this._meshColision;
    }
    public set meshColision(value: BABYLON.AbstractMesh) {//cambio la malla de la colison de este objeto
        this._meshColision = value;
    }
    public get posicionColision(): BABYLON.Vector3 {//obtengo la posicion de la colision
        return this._posicionColision;
    }
    public set posicionColision(value: BABYLON.Vector3) {
        this._posicionColision = value;
    }
    public get posicion(): BABYLON.Vector3 {
        return this._posicion;
    }
    public set posicion(value: BABYLON.Vector3) {
        this._posicion = value;
    }
    public get material(): BABYLON.Material {
        return this._material;
    }
    public set material(value: BABYLON.Material) {
        this._material = value;
    }
    public get maestroFisico(): BABYLON.PhysicsImpostor {
        return this._maestroFisico;
    }
    public set maestroFisico(value: BABYLON.PhysicsImpostor) {
        this._maestroFisico = value;
    }
    public Impulsar(fuerzaImpulso:number = 0.5)//acción volar
    {
        this.maestroFisico.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        this.maestroFisico.applyImpulse(new BABYLON.Vector3(0,fuerzaImpulso,0), this.maestroFisico.getObjectCenter());
    }
    public ImpulsarMorir(fuerzaImpulso:number = -0.4)//acción volar
    {
        this.maestroFisico.applyImpulse(new BABYLON.Vector3(0,fuerzaImpulso,0), this.maestroFisico.getObjectCenter());
    }
    public ColisionVisible(cantidadDeVisibilidad:number = 1)
    {
        this.meshColision.isVisible = true;
        this.meshColision.visibility = cantidadDeVisibilidad;
    }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////aqui empieza la aplicación/////////
var canvas: HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement;//referencia al html con la etiqueta renderCanvas
var engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);//creo el motor
let Puntos:InnerHTML = document.getElementById("puntos") as InnerHTML;//referencía al puntaje
let botonCssReiniciar:CSSSupportsRule = document.getElementById("boton") as unknown as CSSSupportsRule;//referencía al puntaje

window.addEventListener("resize", function () { //agrego el evento para que constantemente se acutalice el navegador
    engine.resize();
});


var scene:BABYLON.Scene;//Creo la escena afuera para poder reiniciar


function CrearEscenaPrincipal(engine:BABYLON.Engine,canvas:HTMLElement):BABYLON.Scene //retorna la escena tomo como parametro el motor
    { 
    /////////VARIABLES GLOBALES PARA EL CONTROL DEL JUEGO Y DEPURACIÓN////////VARIABLES GLOBALES PARA EL CONTROL DEL JUEGO Y DEREPURACIÓN
    //OBJETOS DE LA ESCENA
    let visibleMaestros:number = 0;//HACE VISIBLE INVISIBLE LOS MAESTROS 0 invisible 1 visible
    let visibleEmphtyReposicionar:number = 0;//PARA HACER VISIBLES OBJETOS VACIOS QUE MUESTRAN UNA POSICIÓNES
    let visibleTodasLasColisiones:number = 0;//para hacer visibles invisibles las colisiones 0 invisible 1 visible
    let visibleColisionPajaro:number = 0;//para hacer visible la colision del Pajaro
    let visibleColumnas:number = 1;//HACE INVISIBLE LAS COLUMNAS
    let desactivarColisionColumnas:boolean = false;//DESACTIVO COLISION COLUMNAS
    let visibleSuelo:number = 1;//HACE VISIBLE INVISIBLE LOS suelos 0 invisible 1 visible
    let desactivarColisionSuelo:boolean = false;//DESACTIVAR COLISION DEL SUELO
    let desactivarFisicasPajaro:boolean = false;//PARA DESACTIVAR LAS Físicas del pájaro
    //DIFICULTAD
    let velocidadMovimientoJuego:number = -0.1;//para hacer que las columnas se muevan más rápido esto es instantaneo
    let desactivarDificultad:boolean = false;//Relacionado con el timer
    let dificultadGeneral = 1.0;//Dificultad general de juego mayor numero más rápido aumenta la velocidad puede ser un número flotante
    let tiempoAumentarDificiltad = 5000;//cada ves que pasa este tiempo en milisegundos aumenta la dificultad se usa con deficultadGeneral
    //CAMARA Y EDITOR
    let camaraSigueJugador:boolean = false;//si la camara sigue al jugador
    let camaraSigueReposicionar:boolean = false;//si la camara sigue al objeto reposicionar
    let desactivarCamaraRotadoraPrueba:boolean= true;//para activar la camara de prueba que rota sobre un punto no es la importada desde Blender3D
    let ActivarEditor:boolean = true;//SI MUESTRO O NO MUESTRO EL EDITOR que posee babylon en el navegador
    ////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////COMIENZA EL JUEGO/////////////////////////////////////////////////
    scene = new BABYLON.Scene(engine);//crea la escena
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
    ////////////////////////////////////////////////////////////////////////////////////
    //VARIABLE GAME OVER INTERNA A LA ESCENA
    var puedoReinciar:boolean = false;
    var ConteoDePuntos:number = 0;
    Puntos.innerHTML = ConteoDePuntos as unknown as string;
    botonCssReiniciar.style.visibility = 'hidden'; // hace invisible el boton
    Puntos.style.visibility = "visible";
    
    if(ActivarEditor)
    {
        scene.debugLayer.show();
    }

    //observadores personalizados
    scene.onGameOver = new BABYLON.Observable();//incia un observable de tipo puedo reiniciar
    scene.onIniciar = new BABYLON.Observable();

    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10, 0, 5), scene);
    camera.target = new BABYLON.Vector3(20, 10, 0)
    camera.beta = 1.5;
    camera.alpha = 0;
    camera.radius = 0.700;
    camera.panningSensibility =5000;
    // var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(20, 10, 0), scene);
    //camera.rotation = new BABYLON.Vector3(0, 110, 0);
    camera.attachControl(canvas, true);


    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    var light3 = new BABYLON.DirectionalLight("light3", new BABYLON.Vector3(0, 1, 0), scene);

    light1.intensity = 5;
    //light3.intensity = 5;
    light3.setDirectionToTarget(new BABYLON.Vector3(0,90,0));
    

    //en babylon las escenas se cargan asincronicamente por lo tanto para que funcionen
    //hay que manejar los modelos desde el sceneLoader,esto puede traer
    //muchos problemas,pero tendría que ser posible solucionarlo
    //por ahora de esta forma funciona,estudiar la asincronía de javascript
    BABYLON.SceneLoaderFlags.ShowLoadingScreen = false;//para no ver las barras de cargas cuando importo las mallas desde Blender3D
    BABYLON.SceneLoader.Append("./babylonExportBlender/", "Escenario.babylon", scene,
        //BABYLON.SceneLoader.ImportMesh("","/./","Gltf/Escenario.glb",scene,
        function (scene: BABYLON.Scene) {
            
            //PRueba con animaciones dejo comentado para que se vea
            //que es posible importar una malla dentro de una escena importada
            //en este caso importo la vuelta al mundoAnimada
            BABYLON.SceneLoader.ImportMesh("", "./babylonExportBlender/", "VueltaAlMundoAnimada.glb", scene,
            function (meshes,particle,Skeleton) {
                //console.log((meshes[0] as unknown as BABYLON.Animatable).getAnimations());
                var VueltaAlMundo:BABYLON.Mesh = scene.getNodeByName("VueltaAlMundoAnimada") as BABYLON.Mesh;
                var posicionVUeltaAlmundo:BABYLON.Mesh = scene.getNodeByName("posicionVUeltaAlmundo") as BABYLON.Mesh;
                var padreVueltaAlMundo:BABYLON.Node = scene.getMeshByName("MaestroEdificioDerecha") as BABYLON.Node;
                
                VueltaAlMundo.parent = padreVueltaAlMundo;//hago que vuelta al mundo sea hijo del objeto que se mueve
                VueltaAlMundo.setAbsolutePosition(posicionVUeltaAlmundo.getAbsolutePivotPoint()); 
            });
            
                
                
            //Esto es un ejemplo de como crear animaciónes con babylon.
            //Lo dejo comentado Para tenerlo por las dudas
            // // // var VueltaAllmundo:BABYLON.AbstractMesh = scene.getMeshByName("MaestroVueltaAlMundoRuleta") as BABYLON.AbstractMesh;//busco la vuelta al mundo

            // // // //Creo el tipo de  animación
            // // // var animacionVUeltaAlMundo:BABYLON.Animation = new BABYLON.Animation( 
            // // //         "vueltaAlMundoAnimacionRotacionSobreX",//nombre de la animación
            // // //         "rotation.x",//parametro donde influira la animación osea la rotación en x,tengan en cuenta de hacer asi para buscarlas "VueltaAllmundo.rotation.x"
            // // //         24,//fotogramas por segundo
            // // //         BABYLON.Animation.ANIMATIONTYPE_FLOAT,//tipo de animacion flotante numeros
            // // //         BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE//la animacion es ciclica cuando termina vuelve a reiniciar
            // // //     );
            
            // // // //creo las claves
            // // // // Animation keys
            // // // var keys = [];
            // // // //At the animation key 0, the value of rotation is "1"
            // // // keys.push({
            // // //     frame: 0,
            // // //     value: 0
            // // // });
            // // // //At the animation key 20, the value of rotation is "0.2"
            // // // keys.push({
            // // //     frame: 50,
            // // //     value: 2
            // // // });
            // // // //At the animation key 100, the value of rotation is "1"
            // // // keys.push({
            // // //     frame: 100,
            // // //     value: 4
            // // // });

            // // // //agrego las claves a la animación
            // // // animacionVUeltaAlMundo.setKeys(keys);
            
            // // // //enlazo la animación al objeto vuelta al mundo que esta en la escena
            // // // VueltaAllmundo.animations.push(animacionVUeltaAlMundo);
            
            // // // //inicio la animación en la escena,toma como parametro el objeto
            // // // scene.beginAnimation(VueltaAllmundo,0,100,true);//inicializo la animación


            //Ejemplo de como Crear un enviroment rapidamente
            // var helper = scene.createDefaultEnvironment();
            // helper.setMainColor(new BABYLON.Color3(0.26,0.45,0.9));     
            //var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
            //var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
            
            
            (scene.getNodeByName("CameraBlender") as BABYLON.Camera).fov = 0.40;//cambia el Field of view de la camara importada desde blender en este caso 0.30 representa 30 grados.
            //////////////////////////////////////////////////////////////////////////////////////////////////
            scene.onIniciar.notifyObservers(true);//"OBSERVADOR PERSONALIZADO"//notifica verdadero cuando inicio la escena 
            if(!desactivarCamaraRotadoraPrueba)
            {
                scene.activeCamera = camera;
            }
             

            /////SUELOS//////////////// SUELOS ////////////////// SUELOS //////
            //buscar los nodos,osea las columnas y suelo.Guardo en variables para manipular
            var sueloMalla:BABYLON.Mesh[] = scene.getMeshesByTags("sueloMalla") as BABYLON.Mesh[];
            sueloMalla.forEach(i => {
                i.isVisible = true;
                i.visibility = visibleSuelo;
            });
            
            
            var suelosColision:BABYLON.Mesh[] = scene.getMeshesByTags("sueloColision") as BABYLON.Mesh[];
            suelosColision.forEach(i => {
                i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 ,friction : 1,restitution : 0}, scene);//creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
                BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo")//agrego la etiqueta
                i.visibility = visibleTodasLasColisiones;//MUESTRA LA COLISION DEL SUELO
                //i.material.wireframe = true;
                if(desactivarColisionSuelo)
                {
                    i.dispose();
                }
            });


            var suelos: BABYLON.Mesh[] = scene.getMeshesByTags("suelo") as BABYLON.Mesh[];//busco el nodo padre que contiene a esas columnas
            suelos.forEach(i => { //recorro todos esos objetos ycreo un impostores físicos automaticamente
                i.isVisible = true;
                i.visibility = visibleMaestros;//MUESTRA LA MALLA DEL SUELO
                i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0 ,friction : 1,restitution : 0}, scene);//creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
                BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo")//agrego la etiqueta
            });
            
            //////////////////////////////////////////////////////////////////////////////////////////////////////
            /////COLUMNAS//////////////// COLUMNAS //////////////////COLUMNAS//////
            //De esta forma creo COLUMNAS físicas importadas desde Blender3D
            var ColumnasColision: BABYLON.Mesh[] = scene.getMeshesByTags("obstaculo") as BABYLON.Mesh[];//busco todos los objetos que tienen la etiqueta obstaculo son hijos de un nodo vacio que maneja las columnas fíśicas
            ColumnasColision.forEach(i => { //recorro todos esos objetos ycreo un impostores físicos automaticamente
                i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);//creo impostores físicos,la masa se va sumando
                i.visibility = visibleTodasLasColisiones;//MUESTRA LA COLISION DE LAS COLUMNAS
                if(desactivarColisionColumnas)
                {
                    i.dispose();
                }
            });
            
            //para hacer invisible las columnas
            var columnasVisibles:BABYLON.Mesh[] = scene.getMeshesByTags("columna") as BABYLON.Mesh[];
            columnasVisibles.forEach(i => {
                i.visibility =visibleColumnas;//NMUESTRA LAS COLUMNAS
            });

            //Un tema importante Coloque siempre al impostor sobre el padre después de los hijos.
            var columnasPrincipales: BABYLON.Mesh[] = scene.getMeshesByTags("columnasPrincipal") as BABYLON.Mesh[];//busco el nodo padre que contiene a esas columnas
            columnasPrincipales.forEach(i => { //recorro todos esos objetos ycreo un impostores físicos automaticamente
                i.physicsImpostor = new BABYLON.PhysicsImpostor(i, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0 }, scene);//creo el impostor físico al padre es importante que este último y que no tenga cuerpo ya que los cuerpos son manejados por los hijos
                BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo")//agrego la etiqueta                   
                i.position.set(i.position.x,numeroAleatorio(4,10),i.position.z);
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
            let ObtenerpajaroColision: BABYLON.AbstractMesh = scene.getNodeByName("pajaroColision") as BABYLON.AbstractMesh;
            let ObtenerPajaro: BABYLON.AbstractMesh = scene.getNodeByName("pajaro") as BABYLON.AbstractMesh;
            let pajaro:ObjetoFisico = new ObjetoFisico(ObtenerPajaro,ObtenerpajaroColision);
            pajaro.ColisionVisible(visibleColisionPajaro);

            // asi se detectan colisiones en babylon con el metodo onCollideEvent
            // uso como referencía physics impostor de un objeto como el pájaro
            pajaro.maestroFisico.onCollideEvent= (collider, collidedWith) => {
                //importantisimo detectar colisiones usando "Tags" serian grupos en godot
                if (BABYLON.Tags.GetTags(collidedWith) === "obstaculo") {
                    puedoReinciar = true;
                    pajaro.ImpulsarMorir();//impulso al morir por defecto -0.4
                    scene.onGameOver.notifyObservers(puedoReinciar);//cuando llego aqui notifico que es game over
                    //console.log("GAMEOVER desde la colisicón del pajaro: " + this.gameOverPublico);
                    //pajaroFisico.applyImpulse(new BABYLON.Vector3(0, -0.4, 0), pajaroFisico.getObjectCenter());
                    //pajaro.maestroFisico.applyImpulse(new BABYLON.Vector3(0, -0.9, 0), pajaro.maestroFisico.getObjectCenter());
                    //pajaro.maestroFisico.applyImpulse(new BABYLON.Vector3(0, -0.4, 0), pajaro.maestroFisico.getObjectCenter())
                }
            };
            if(desactivarFisicasPajaro)//si desactivo las físicas
            {
                pajaro.DestruirFisicaDeEsteObjeto();
            }
            //pajaro.dispose();//borrar para ver el pájaro

            ///VERIFICAR TECLAS PRESIONADOS USANDO LAS HERRAMIENTAS DE BABYLON
            scene.onPointerObservable.add((pointerInfo) => {
                switch (pointerInfo.type) {
                    case BABYLON.PointerEventTypes.POINTERDOWN:
                        if (!puedoReinciar)//sino es GameOver
                        {
                            pajaro.Impulsar();//por defecto 0.5 de impulso
                        }
                        break;
                }
            });

            if(camaraSigueJugador)//para hacer que la camara siga al jugador
            {
                camera.setTarget(pajaro.mesh,false,false);//la camara sigue al jugador llamado pajaro
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
            ////////DETECTAR PUNTOS ////////DETECTAR PUNTOS ////////DETECTAR PUNTOS ////////DETECTAR PUNTOS
            var Puntajes: BABYLON.Mesh[] = scene.getMeshesByTags("puntos") as BABYLON.Mesh[];//busco el nodo padre que contiene a esas columnas
            Puntajes.forEach(i => { //recorro todos esos objetos
                i.visibility = 0;//hago Visible/invisible las mallas que funcionan para sumar puntos
                //agrego un action manager a cada columna
                i.actionManager = new BABYLON.ActionManager(scene);//creo el nuevo action manager
                //register a new action with the marble's actionManager..this will execute code whenever the marble intersects the "killBox"
                i.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                        {
                        trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger,//cuando nu cuerpo entra a esta area
                        parameter:pajaro//cuando el pajaro entra a esta area
                        }, 
                        function()
                        {//funcion para sumar puntos
                            ConteoDePuntos +=1;
                            Puntos.innerHTML = ConteoDePuntos as unknown as string;//convierto a string
                            //console.log("el pajaro entro al area para los puntos");//muestro este mensaje por consola
                        }
                    )
                );
            });
            ///////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
            ///PARA MOVER////////////////PARA MOVER/////////////////////PARA MOVER//////////////////
            var velocidadDesplazamiento:number = 0;
            var dificultad:number = 0.000;
            function AumentarDificultad() : void
            {
                if(!puedoReinciar)
                {
                    dificultad -= dificultadGeneral / 10000;//valor usado para aumentar la difultad
                    console.log("aumenta la dificultad")
                    //console.log(dificultad)
                }
            }
            if(!desactivarDificultad)//sino desactive la dificultad
            {
                setInterval(AumentarDificultad,tiempoAumentarDificiltad);//llamo a esta función cada cierto tiempo
            }

            ////////HERRAMIENTA PARA REPOSICIONAR OBJETOS////////HERRAMIENTA PARA REPOSICIONAR OBJETOS////////HERRAMIENTA PARA REPOSICIONAR OBJETOS
            ////EmphtyReposicionar            ////EmphtyReposicionar            ////EmphtyReposicionar
            let guiaReposicionar:BABYLON.Mesh[] = scene.getMeshesByTags("guiaReposicionar") as BABYLON.Mesh[];
            guiaReposicionar.forEach(i =>
            {
                i.visibility = visibleEmphtyReposicionar;
            });
            let EmphtyReposicionar = (scene.getNodeByName("EmphtyReposicionar") as BABYLON.Mesh);
            let EmphtyReposicionar2 = (scene.getNodeByName("EmphtyReposicionar2") as BABYLON.Mesh);
            EmphtyReposicionar.visibility = visibleEmphtyReposicionar;
            EmphtyReposicionar2.visibility = visibleEmphtyReposicionar;     
            
            if(camaraSigueReposicionar)
            {
                camera.setTarget(scene.getNodeByName("EmphtyReposicionar") as BABYLON.Mesh,false,false);
            }

            /////////////FONDOS/////////////FONDOS/////////////FONDOS/////////////FONDOS
            var arboles:BABYLON.AbstractMesh[] = scene.getMeshesByTags("Arboles") as BABYLON.AbstractMesh[];//busco el fondo llamado arboles
            var ReposicionarArboles:BABYLON.AbstractMesh = scene.getMeshByName("ReposicionarArboles") as BABYLON.AbstractMesh;
            ReposicionarArboles.visibility = visibleMaestros;

            var edificios:BABYLON.AbstractMesh[] = scene.getMeshesByTags("edificios") as BABYLON.AbstractMesh[];
            edificios.forEach(i =>//para hacerlos visibles y invisibles a los maestros
                {
                    i.visibility =  visibleMaestros;
                });
            


            ////////////////////////////////////////////////////////////////////////////////
            ///////BUCLE PRINCIPAL///////BUCLE PRINCIPAL///////BUCLE PRINCIPAL///////BUCLE PRINCIPAL      
            //Este es el bucle principal con propiedades físicas tambien esta el bucle común
            scene.onAfterPhysicsObservable.add(() => { //ESTO ES COMO UN UPDATE DE GODOT O UNITY en babylon se usan los OBSERVABLES que son como señales personalizadas
                //console.log(suelo.position.z)
                if (!puedoReinciar) {
                    velocidadDesplazamiento = velocidadMovimientoJuego + dificultad * scene.getEngine().getDeltaTime();
                }
                else{
                    velocidadDesplazamiento = 0;
                    dificultad = 0; 
                }
                /////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS
                columnasPrincipales.forEach(i => {
                    i.setAbsolutePosition(new BABYLON.Vector3(
                        i.getAbsolutePosition().x,
                        i.getAbsolutePosition().y,
                        i.getAbsolutePosition().z + velocidadDesplazamiento)
                    );
                    if(i.position.z <= -30)//si la posicion es menos 30
                    {
                        i.position.set(
                            0,
                            numeroAleatorio(4,10),
                            40 + velocidadDesplazamiento);//la posicion sera 40,siempre sumo la velocidad de desplazamiento para que las columnas no queden desplazadas
                    }
                });
                /////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO
                suelos.forEach(i => 
                {
                    //i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime());//esto es para cambiar la posición del cuerpo fisico y la malla                       
     
                    i.setAbsolutePosition(new BABYLON.Vector3(
                        i.getAbsolutePosition().x,
                        i.getAbsolutePosition().y,
                        i.getAbsolutePosition().z + velocidadDesplazamiento)
                    );
                    if(i.getAbsolutePivotPoint().z <= -53)
                    {
                        //i.position.set(i.position.x,i.position.y,(40));
                        if(i.name == "suelo")
                        {
                            i.setAbsolutePosition(new BABYLON.Vector3(
                                i.getAbsolutePosition().x,
                                i.getAbsolutePosition().y,
                                EmphtyReposicionar2.getAbsolutePivotPoint().z  + velocidadDesplazamiento));//hay que sumarle la velocidad de desplazamieto para que los suelos queden pegados
                            //console.log(EmphtyReposicionar.getAbsolutePosition().z + velocidadDesplazamiento);
                        }
                        if(i.name == "suelo2")
                        {
                            i.setAbsolutePosition(new BABYLON.Vector3(
                                i.getAbsolutePosition().x,
                                i.getAbsolutePosition().y,
                                EmphtyReposicionar.getAbsolutePivotPoint().z  + velocidadDesplazamiento));//hay que sumarle la velocidad de desplazamieto para que los suelos queden pegados
                            //console.log( EmphtyReposicionar.getAbsolutePivotPoint().z + velocidadDesplazamiento);
                        }
                    }
                });
                ///////////MOVER FONDO PRIMER PLANO///////////MOVER FONDO PRIMER PLANO///////////MOVER FONDO PRIMER PLANO
                arboles.forEach(i =>
                {
                    i.setAbsolutePosition(new BABYLON.Vector3(
                        i.getAbsolutePosition().x,
                        i.getAbsolutePosition().y,
                        i.getAbsolutePosition().z + velocidadDesplazamiento / 4
                        )
                    );
                    if(i.getAbsolutePivotPoint().z <= -150)//si la posición es menor a -16 reposiciono,toma en cuenta el punto de origen
                    {
                        
                        i.setAbsolutePosition(new BABYLON.Vector3(
                            i.getAbsolutePosition().x,
                            i.getAbsolutePosition().y,
                            ReposicionarArboles.getAbsolutePivotPoint().z  + velocidadDesplazamiento));//hay que sumarle la velocidad de desplazamieto para que los suelos queden pegados
                        //console.log(EmphtyReposicionar.getAbsolutePosition().z + velocidadDesplazamiento);
                    }
                });
                /////////MOVER FONDO SEGUNDO PLANO /////////MOVER FONDO SEGUNDO PLANO /////////MOVER FONDO SEGUNDO PLANO
                edificios.forEach(i =>
                {
                    i.setAbsolutePosition(new BABYLON.Vector3(
                        i.getAbsolutePosition().x,
                        i.getAbsolutePosition().y,
                        i.getAbsolutePosition().z + velocidadDesplazamiento / 8
                    ));
                    if(i.getAbsolutePivotPoint().z < -150)
                    {
                        i.setAbsolutePosition(new BABYLON.Vector3(
                            i.getAbsolutePosition().x,
                            i.getAbsolutePosition().y,
                            80 + velocidadDesplazamiento
                        ));
                    }    
                });
            });
        });
    
    ////////INTERFACE//////////INTERFACE///////////INTERFACE////////////////////INTERFACE
     ///CREATE BUTTON
    scene.onGameOver.addOnce(function(gameOver:boolean) { //observable personalizado si es GameOver
        // // boton.isVisible = true;
        // // boton.isEnabled = true;
        setTimeout(() => { //despues que pasaron 300 segundos
            botonCssReiniciar.style.visibility = 'visible'; // hace invisible el boton  
        }, 300);
        
    })

    botonCssReiniciar.onclick = function()
    {
        //console.log("presione sobre el boton")
        if(puedoReinciar == true)
        {
            scene = CrearEscenaPrincipal(engine,canvas);//VUELVO A LLAMAR A LA FUNCION PARA REINICIAR LA ESCENA   
        }
    };
   
    
    
    function numeroAleatorio(min:number, max:number)//función para crear números aleatorios
    {
        return Math.round(Math.random() * (max - min) + min);
    }


    
    async function Timer(tiempoEspera : number)
    {
        return new Promise(resolve => setTimeout(resolve, tiempoEspera))
    }
        
    return scene;//retorno la escena
}

function CrearMenu(engine:BABYLON.Engine,canvas:HTMLCanvasElement):BABYLON.Scene
{
    scene = new BABYLON.Scene(engine);//crea la escena
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
    //VARIABLE GAME OVER INTERNA A LA ESCENA
    var puedoReinciar:boolean = true;
    var ConteoDePuntos:number = 0;
    Puntos.innerHTML = ConteoDePuntos as unknown as string;
    botonCssReiniciar.style.visibility = 'visible'; // hace invisible el boton
    Puntos.style.visibility = "hidden";
    
    //scene.debugLayer.show();

    //observadores personalizados
    scene.onGameOver = new BABYLON.Observable();//incia un observable de tipo puedo reiniciar
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

            let pajaro:BABYLON.Mesh = scene.getMeshByName("pajaro") as BABYLON.Mesh;
            pajaro.dispose();

            /////SUELOS//////////////// SUELOS ////////////////// SUELOS //////
            //buscar los nodos,osea las columnas y suelo.Guardo en variables para manipular
            var suelosColision:BABYLON.Mesh[] = scene.getMeshesByTags("sueloColision") as BABYLON.Mesh[];
            suelosColision.forEach(i => {
                i.visibility = 0;
                //i.material.wireframe = true;
            });

            var suelos: BABYLON.Mesh[] = scene.getMeshesByTags("suelo") as BABYLON.Mesh[];//busco el nodo padre que contiene a esas columnas
            suelos.forEach(i => { //recorro todos esos objetos ycreo un impostores físicos automaticamente
                i.visibility = 1;
                i.position.set(i.position.x,i.position.y,i.position.z -30);
                //BABYLON.Tags.AddTagsTo(i.physicsImpostor, "obstaculo")//agrego la etiqueta
            });
            
            //////////////////////////////////////////////////////////////////////////////////////////////////////
            /////COLUMNAS//////////////// COLUMNAS //////////////////COLUMNAS//////
            //De esta forma creo COLUMNAS físicas importadas desde Blender3D
            var Columnasfisicas: BABYLON.Mesh[] = scene.getMeshesByTags("obstaculo") as BABYLON.Mesh[];//busco todos los objetos que tienen la etiqueta obstaculo son hijos de un nodo vacio que maneja las columnas fíśicas
            Columnasfisicas.forEach(i => { //recorro todos esos objetos ycreo un impostores físicos automaticamente
                i.visibility = 0;
                //i.material.wireframe = true;
                //i.dispose();
                // // // var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

                // // // myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
                // // // i.material= myMaterial;
            });
            
            //para hacer invisible las columnas
            var columnasVisibles:BABYLON.Mesh[] = scene.getMeshesByTags("columna") as BABYLON.Mesh[];
            columnasVisibles.forEach(i => {
                i.visibility =1;
                
            });

            //Un tema importante Coloque siempre al impostor sobre el padre después de los hijos.
            var columnasPrincipales: BABYLON.Mesh[] = scene.getMeshesByTags("columnasPrincipal") as BABYLON.Mesh[];//busco el nodo padre que contiene a esas columnas
            columnasPrincipales.forEach(i => { //recorro todos esos objetos ycreo un impostores físicos automaticamente                 
                i.position.set(i.position.x,numeroAleatorio(4,10),i.position.z -30);
                i.visibility = 0;
                
            });
            

            ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
            ////////PUNTOS////////PUNTOS////////PUNTOS////////PUNTOS////////PUNTOS//////////
            var Puntajes: BABYLON.Mesh[] = scene.getMeshesByTags("puntos") as BABYLON.Mesh[];//busco el nodo padre que contiene a esas columnas
            Puntajes.forEach(i => { //recorro todos esos objetos
                i.visibility = 0;//hago Visible/invisible las mallas que funcionan para sumar puntos
                //agrego un action manager a cada columna
            });
            ///////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////                ////////////////////////////////////////////////////////////////////////////////////////////////
            ///PARA MOVER////////////////PARA MOVER/////////////////////PARA MOVER//////////////////
            var velocidadDesplazamiento:number = 0;
            var dificultad:number = 0.000;
            (scene.getNodeByName("EmphtyReposicionar") as BABYLON.Mesh).visibility = 0;
            (scene.getNodeByName("EmphtyReposicionar2") as BABYLON.Mesh).visibility = 0;     
        
            //Este es el bucle principal con propiedades físicas tambien esta el bucle común
            scene.onAfterPhysicsObservable.add(() => { //ESTO ES COMO UN UPDATE DE GODOT O UNITY en babylon se usan los OBSERVABLES que son como señales personalizadas
                //console.log(suelo.position.z)
                
                velocidadDesplazamiento = -0.001 + dificultad;
                
                /////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS/////////////MOVER COLUMNAS
                columnasPrincipales.forEach(i => {
                    i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime());//esto es para cambiar la posición del cuerpo fisico y la malla
                    if(i.position.z <= -30)
                    {
                        i.position.set(
                            0,
                            numeroAleatorio(4,10),
                            40);
                    }
                });
                /////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO/////////////MOVER SUELO
                suelos.forEach(i => {
                    //i.position.set(0, i.position.y, i.position.z + velocidadDesplazamiento * scene.getEngine().getDeltaTime());//esto es para cambiar la posición del cuerpo fisico y la malla                       
                    i.setAbsolutePosition(new BABYLON.Vector3(i.getAbsolutePosition().x,i.getAbsolutePosition().y,i.getAbsolutePosition().z  + velocidadDesplazamiento *scene.getEngine().getDeltaTime()));
                    
                    if(i.getAbsolutePosition().z <= -60)
                    {
                        //i.position.set(i.position.x,i.position.y,(40));
                        if(i.name == "suelo")
                        {
                            i.setAbsolutePosition(new BABYLON.Vector3(
                                i.getAbsolutePosition().x,
                                i.getAbsolutePosition().y,
                                (scene.getNodeByName("EmphtyReposicionar2") as BABYLON.Mesh).getAbsolutePosition().z-0.2));
                            //console.log((scene.getNodeByName("EmphtyReposicionar2") as BABYLON.Mesh).getAbsolutePivotPoint().z);
                            //console.log("esta reposicionando suelo 1");
                        }
                        if(i.name == "suelo2")
                        {
                            i.setAbsolutePosition(new BABYLON.Vector3(
                                i.getAbsolutePosition().x
                                ,i.getAbsolutePosition().y,
                                (scene.getNodeByName("EmphtyReposicionar") as BABYLON.Mesh).getAbsolutePosition().z-0.2));
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
            })
            ///////////////////////////////////////////////////////////////////
            /////////////////Crear números aleatorios/////////////////////////
            
        });
    
    ////////INTERFACE//////////INTERFACE///////////INTERFACE////////////////////INTERFACE
    ///CREATE BUTTON

    botonCssReiniciar.onclick = function()
    {
        //console.log("presione sobre el boton")
        if(puedoReinciar == true)
        {
            scene = CrearEscenaPrincipal(engine,canvas);//VUELVO A LLAMAR A LA FUNCION PARA REINICIAR LA ESCENA   
        }
    };
   
    function numeroAleatorio(min:number, max:number)//función para crear números aleatorios
    {
        return Math.round(Math.random() * (max - min) + min);
    }
        
    return scene;//retorno la escena
}

function PruebaEscenaMundo(engine:BABYLON.Engine,canvas:HTMLElement)
{
    scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10, 0, 5), scene);
    camera.target = new BABYLON.Vector3(20, 10, 0)
    camera.beta = 1.5;
    camera.alpha = 0;
    camera.radius = 0.700;
    camera.panningSensibility =5000;
    // var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(20, 10, 0), scene);
    //camera.rotation = new BABYLON.Vector3(0, 110, 0);
    camera.attachControl(canvas, true);
    scene.debugLayer.show();
    BABYLON.SceneLoader.Append("./babylonExportBlender/","Escenario.babylon",scene,
        function name(scene:BABYLON.Scene)
        {
            //scene.activeCamera = (scene.getNodeByName("CameraBlender") as BABYLON.Camera);

        }
    
    );
    return scene;
}


//NewScene();
// CrearMenu(engine,canvas);
CrearEscenaPrincipal(engine,canvas);//creo la escena
//PruebaEscenaMundo(engine,canvas);//creo la escena

//principal renderLoop
engine.runRenderLoop(function ()
{  
    scene.render();//renderizo la escena en el bucle principal
});






