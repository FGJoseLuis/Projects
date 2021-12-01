
var app = angular.module("app1",[]);
app.controller("c1",function($scope,$http){
$scope.nombre = "jose";
$scope.cometariosNuevos = {};
$scope.comentarios = [
{
    comentario:"super bien",
    user:"manolo"
},

{ comentario:"super mal",
user:"manolo2"
}
];

$scope.agreagarComentario = function(){


$scope.comentarios.push($scope.cometariosNuevos);
$scope.cometariosNuevos = {};

}

$scope.getData = [];
$http.get("https://localhost:44397/api/Values").then(function(datos){ 

    $scope.getData = datos;

    }, function(error){ 

     });

    
}).controller("c2", function($scope,$http,$location){

$scope.user = "";
$scope.contrasena = "";
$scope.carga = 0;
$scope.error1 = false;
$scope.error2 = false;
$scope.mensajeDeError="";

$scope.verificarDatos = function(){

$scope.mensajeDeError = "";
if($scope.user == "" || $scope.contrasena == ""){
    $scope.error2 = true;
    $scope.error1 = false;
}else{

$scope.error2 =false;
$scope.post = {};
$scope.carga = 1;

$http.post("https://localhost:44397/api/Values",{

    usuario: $scope.user,
    contrasena: $scope.contrasena,
    id: 0

}).then(function(datos,status,headers,config) {

    if(datos.data.exito == 1){

    $scope.carga = 0;
    $scope.error1 = false;
    $scope.error2 = false;
    localStorage.setItem("id",datos.data.id);
    localStorage.setItem("user",$scope.user);
    $scope.user = "";
    $scope.contrasena = "";
    window.location="index.html";
    console.log("navegar"); 



    }else{

        $scope.error1 = true;
        $scope.carga = 0;
        console.log("denegado"); 
    }

}, function(error,status,headers,config) {

    $scope.carga = 0;
    $scope.mensajeDeError = "ERR_CONNECTION_REFUSED";
    
});

}

}


}).controller("c3",function($scope, $http){

$scope.id = localStorage.getItem("id");
$scope.user = localStorage.getItem("user");
console.log($scope.id);
$scope.post = [];

window.onload = function(){

$http.post("https://localhost:44397/api/GetValues",{

    usuario: "",
    contrasena: "",
    id: $scope.id

}).then(function(datos,status,headers,config){

    $scope.post = datos.data;
    console.log($scope.post);

},function(error,status,headers,config){



});

}

});