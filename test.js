/// <reference path="babylon.d.ts" />

var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var gameOver = false;

/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);//crea la escena
    //BABYLON.Inspector.Show(scene);  //Muestra el inspector

    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(10,0,5), scene);
    camera.target = new BABYLON.Vector3(20,10,0)
    camera.beta = 1.5;
    camera.alpha = 0;
    camera.radius = 0.700;
    camera.attachControl(canvas, true);

    //activo físicas
    scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.CannonJSPlugin());

    
        
    
    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    

    // Add and manipulate meshes in the scene
    //var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);

    
    

    //var assetsManager = new BABYLON.AssetsManager(scene);
    
    //scene.actionManager = new BABYLON.ActionManager(scene);

    var container = new BABYLON.AssetContainer(scene);//para manejar los recursos de una escena
    

    //en babylon las escenas se cargan asincronicamente por lo tanto para que funcionen
    //hay que manejar los modelos desde el sceneLoader,esto puede traer
    //muchos problemas,pero tendría que ser posible solucionarlo
    BABYLON.SceneLoader.ImportMesh("","./babylonExportBlender/","Escenario.babylon",scene,
    //BABYLON.SceneLoader.ImportMesh("","/./","Gltf/Escenario.glb",scene,
        function (newMeshes)
        {
            scene.createDefaultEnvironment();
            

            //para manejar el pájaro
            var pajaro = scene.getNodeByName("pajaro");
            var pajaroFisico= new BABYLON.PhysicsImpostor(pajaro, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1, friction: 1, restitution: 0 }, scene);
            
            //ESTO ES EL INPUT EVENT,si presiono click activo físicas y impulso.
            window.addEventListener("click", function () {
                pajaroFisico.setLinearVelocity(new BABYLON.Vector3(0,0,0));
                pajaroFisico.applyImpulse(new BABYLON.Vector3(0,0.5,0),pajaroFisico.getObjectCenter());
                // if(!gameOver)
                // {
                //     pajaroFisico.setLinearVelocity(new BABYLON.Vector3(0,0,0));
                //     pajaroFisico.applyImpulse(new BABYLON.Vector3(0,0.5,0),pajaroFisico.getObjectCenter());
                //     //console.log(pajaroFisico.getLinearVelocity());
                // }
            });
                   
            

            //buscar los nodos,osea las columnas y suelo.Guardo en variables para manipular
            var suelo = scene.getNodeByName("suelo");
            var suelo2 = scene.getNodeByName("suelo2");
            var suelo3 = scene.getNodeByName("suelo3");
            var suelo4 = scene.getNodeByName("suelo4");
            var suelo5 = scene.getNodeByName("suelo5");
            var suelo6 = scene.getNodeByName("suelo6");
            var suelo7 = scene.getNodeByName("suelo7");
            var columnas = scene.getNodeByName("columnas");
            var columnas2 = scene.getNodeByName("columnas2");
            var columnas3 = scene.getNodeByName("columnas3");
            var columnas4 = scene.getNodeByName("columnas4");
            var columnas5 = scene.getNodeByName("columnas5");
            var columnas6 = scene.getNodeByName("columnas6");
            var columnas7 = scene.getNodeByName("columnas7");

           
            //suelos físicos
            var sueloFisico = new BABYLON.PhysicsImpostor(suelo , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0 }, scene);
            var sueloFisico2 = new BABYLON.PhysicsImpostor(suelo2 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0 }, scene);
            var sueloFisico3 = new BABYLON.PhysicsImpostor(suelo3 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0 }, scene);
            var sueloFisico4 = new BABYLON.PhysicsImpostor(suelo4 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0 }, scene);
            var sueloFisico5 = new BABYLON.PhysicsImpostor(suelo5 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0 }, scene);
            var sueloFisico6 = new BABYLON.PhysicsImpostor(suelo6 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0 }, scene);
            var sueloFisico7 = new BABYLON.PhysicsImpostor(suelo7 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0 }, scene);

            //columnas fisicas
            var columnasFisicas = new BABYLON.PhysicsImpostor(columnas , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene);
            var columnasFisicas2 = new BABYLON.PhysicsImpostor(columnas2 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene);
            var columnasFisicas3 = new BABYLON.PhysicsImpostor(columnas3 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene);
            var columnasFisicas4 = new BABYLON.PhysicsImpostor(columnas4 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene);
            var columnasFisicas5 = new BABYLON.PhysicsImpostor(columnas5 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene);
            var columnasFisicas6 = new BABYLON.PhysicsImpostor(columnas6 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene);
            var columnasFisicas7 = new BABYLON.PhysicsImpostor(columnas7 , BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1, restitution: 0 }, scene);




            //mostrar colisiones
            // columnas.showBoundingBox= true;
            // columnas2.showBoundingBox = true;
            // columnas3.showBoundingBox = true;
            // columnas4.showBoundingBox = true;

            
            // suelo.showBoundingBox = true;
            // suelo2.showBoundingBox = true;
            // suelo3.showBoundingBox = true;
            // suelo4.showBoundingBox = true;
            // suelo5.showBoundingBox = true;
            // suelo6.showBoundingBox = true;
            // suelo7.showBoundingBox = true;
            // pajaro.showBoundingBox= true;

            //agrego etiquetas o grupos a los objetos para poder detectar facilmente
            //NOTA IMPORTANTE:
            //Con el plugin oficial de babylon en blender3D es posible
            //importar mallas con las etiquetas,esto se agrega
            //desde las propiedades de datos del objetos en el panel de babylon
            BABYLON.Tags.AddTagsTo(sueloFisico,"obstaculo");
            BABYLON.Tags.AddTagsTo(sueloFisico2,"obstaculo");
            BABYLON.Tags.AddTagsTo(sueloFisico3,"obstaculo");
            BABYLON.Tags.AddTagsTo(sueloFisico4,"obstaculo");
            BABYLON.Tags.AddTagsTo(sueloFisico5,"obstaculo");
            BABYLON.Tags.AddTagsTo(sueloFisico7,"obstaculo");
            BABYLON.Tags.AddTagsTo(sueloFisico7,"obstaculo");
            
            BABYLON.Tags.AddTagsTo(columnasFisicas,"obstaculo");
            BABYLON.Tags.AddTagsTo(columnasFisicas2,"obstaculo");
            BABYLON.Tags.AddTagsTo(columnasFisicas3,"obstaculo");
            BABYLON.Tags.AddTagsTo(columnasFisicas4,"obstaculo");
            BABYLON.Tags.AddTagsTo(columnasFisicas5,"obstaculo");
            BABYLON.Tags.AddTagsTo(columnasFisicas6,"obstaculo");
            BABYLON.Tags.AddTagsTo(columnasFisicas7,"obstaculo");

           

            //asi se detectan colisiones en babylon con el metodo onCollideEvent
            //uso como referencía physics impostor de un objeto como el pájaro
            pajaroFisico.onCollideEvent = (collider, collidedWith) =>{
                //console.log(BABYLON.Tags.GetTags(collidedWith,"obstaculo"));
                //importantisimo detectar colisiones usando "Tags" serian grupos en godot
                if(BABYLON.Tags.GetTags(collidedWith) === "obstaculo")
                {
                    console.log("colisiono con el suelo");
                    gameOver = true;
                    pajaroFisico.applyImpulse(new BABYLON.Vector3(0,-0.3,0),pajaroFisico.getObjectCenter());
                }
            };

            //para iniciar
            // IniciarPosYColumnasAleatorio(scene,columnaManejador)
            // IniciarPosYColumnasAleatorio(scene,columnaManejador2)
            // IniciarPosYColumnasAleatorio(scene,columnaManejador3)
            // IniciarPosYColumnasAleatorio(scene,columnaManejador3)
            // IniciarPosYColumnasAleatorio(scene,columnaManejador4)
            // IniciarPosYColumnasAleatorio(scene,columnaManejador5)
            // IniciarPosYColumnasAleatorio(scene,columnaManejador6)
            // IniciarPosYColumnasAleatorio(scene,columnaManejador7)
            
            

            // //Mover todos los objetos en la escena aqui represento como el update
            // MoverSuelo(scene,suelo,0,0,0,-0.5);
            // MoverSuelo(scene,suelo2,0,0,10,-0.5);
            // MoverSuelo(scene,suelo3,0,0,20,-0.5);
            // MoverSuelo(scene,suelo4,0,0,30,-0.5);
            // MoverSuelo(scene,suelo5,0,0,40,-0.5);
            // MoverSuelo(scene,suelo6,0,0,50,-0.5);
            // MoverSuelo(scene,suelo7,0,0,60,-0.5);
            

            //MoverColumnas(scene,columna,0,7.5,10,-0.5)
            // MoverColumnas(scene,columna2,0,7.5,20,-0.5)
            // MoverColumnas(scene,columna3,0,7.5,30,-0.5)
            // MoverColumnas(scene,columna4,0,7.5,40,-0.5)
            // MoverColumnas(scene,columna5,0,7.5,50,-0.5)
            // MoverColumnas(scene,columna6,0,7.5,60,-0.5)
            // MoverColumnas(scene,columna7,0,7.5,70,-0.5)
            
            
            var velocidadDesplazamiento = 0;
            //Este es el bucle principal con propiedades físicas tambien esta el bucle común
            scene.onBeforePhysicsObservable.add(() => {
                // console.log(suelo.position.z)
                // if(!gameOver)
                // {
                //     velocidadDesplazamiento -= 0.05;    
                // }
                // columnas.position.set(0,7.5,10 + velocidadDesplazamiento);//esto es para cambiar la posición del cuerpo fisico y la malla
                
                // console.log(suelo.position.z);
                
                // suelo2.position.set(0,0,10 + velocidadDesplazamiento);
                // suelo3.position.set(0,0,20 + velocidadDesplazamiento);
                // suelo4.position.set(0,0,30 + velocidadDesplazamiento);
                // columnas.position.set(0,18,10 + velocidadDesplazamiento);
                // columnas2.position.set(0,18,20 + velocidadDesplazamiento);
                // columnas3.position.set(0,18,30 + velocidadDesplazamiento);
                // columnas4.position.set(0,18,40 + velocidadDesplazamiento);
                // columnasAbajo.position.set(0,-3,10 + velocidadDesplazamiento);
                // columnasAbajo2.position.set(0,-3,20 + velocidadDesplazamiento);
                // columnasAbajo3.position.set(0,-3,30 + velocidadDesplazamiento);
                // columnasAbajo4.position.set(0,-3,40 + velocidadDesplazamiento);
                
                // pajaro.position.set(0, pajaro.position.y, pajaro.position.z);//asi se bloquea un eje axisLOCK
                // pajaro.rotation.set(0,0,0);//tendria que bloquear rotación pero no lo hace
                // //console.log(pajaro.rotation);
                
                //IMPORTANTE de esta forma veo las colisiones aunque baja mucho el rendimiento
                // var physicsViewer = new BABYLON.Debug.PhysicsViewer();
              
                // physicsViewer.showImpostor(columnasFisicas,columnasFisicas);
                
                
                
            
            })
        });
        
        
    return scene;
};

function IniciarPosYColumnasAleatorio(scene,columuna)
{
    
    scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
        var yAleatorio = numeroAleatorio(3.5,11)
        columna.position.set(columuna.position.x,yAleatorio,columuna.position.z);
    });

}


function MoverSuelo(scene,suelo,x,y,z,velocidadDesplazamiento)
{
    scene.onBeforePhysicsObservable.add(() => {
        if(!gameOver)
        {
            velocidadDesplazamiento -= 0.1;    
        }
        
        if(suelo.position.z < -30)
        {
            velocidadDesplazamiento = 0;
            z = 40;
           
        }
        suelo.position.set(x,y,z + velocidadDesplazamiento);
    });
}

function MoverColumnas(scene,columna,x,y,z,velocidadDesplazamiento)
{
    scene.onBeforePhysicsObservable.add(() => {
        if(!gameOver)
        {
            velocidadDesplazamiento -= 0.1;    
        }
        
        if(columna.position.z < -30)
        {
            velocidadDesplazamiento = -0.05;
            z = 40;
            y = numeroAleatorio(3.5,11)
           
        }
        columna.position.set(x,y,z + velocidadDesplazamiento);
    });
}

function numeroAleatorio(min, max) 
{
    return Math.round(Math.random() * (max - min) + min);
}

//SI MUERO ES GAME OVER REINICIA LA VARIABLE 
//QUE CONTIENE LA ESCENA OSEA REINICIA EL JUEGO
// window.addEventListener("click", function () {
//     //si es GameOver
//     console.log("estoy presionando click luego de terinar la escena")

//     if(gameOver)
//     {
//         console.log("game over es verdadero")
//         gameOver = false;
        
//     }
// });


/////////////////// Init game ////////////////////////////
var sceneCreate = createScene(); //Call the createScene function

 //muestro el editor
 BABYLON.Inspector.Show(sceneCreate);

//ESTO ES PARA REINICIAR LA ESCENA CUANDO PIERDO
// window.addEventListener("click", function () { //si presiono click
//     //si es GameOver
//     if(gameOver)
//     {
//         gameOver = false//hago que game over sea falso
//         sceneCreate = createScene();//IMPORTANT I LOAD THE SCENE IN THE VARIABLE AGAIN
//     }
// });

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {//loop de engine  
        sceneCreate.render();//renderizo escena
});

//////////////////////////////////////////////////////////////

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});



//Para crear materiales,esto lo guardo de apunte.
// function MaterialRojo(scene)
// {
//     var rojo = new BABYLON.StandardMaterial("rojo",scene);
//     rojo.diffuseColor = new BABYLON.Color3.Yellow;
//     return rojo;
// }

// function  MaterialVerde(scene)
// {
//     var verde = new BABYLON.StandardMaterial("verde",scene);
//     verde.diffuseColor = new BABYLON.Color3.Green;
//     verde.reflectionFresnelParameters = 10;
//     verde._roughness = 0;
//     return verde;
// }



//detectar teclas presionadas otra forma lo guardo como apunte
            /*scene.onKeyboardObservable.add((kbInfo) => {
                switch (kbInfo.type) {
                    case BABYLON.KeyboardEventTypes.KEYDOWN:
                        switch (kbInfo.event.key) {
                            
                            case "w":
                            case "W":
                                console.log("presiono W");
                                pajaroFisico.setLinearVelocity(new BABYLON.Vector3(0,0,0));
                                pajaroFisico.applyImpulse(new BABYLON.Vector3(0,5,0),pajaroFisico.getObjectCenter());
                                console.log(pajaroFisico.getLinearVelocity());
                            break
                            
                        }
                    break;
                }
            });*/