sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
 ], function (Controller, JSONModel) {
    "use strict";
    //const uri = 'https://localhost:7020/api/alunos';
    return Controller.extend("sap.ui.demo.academia.controller.academia",{
      onInit:function() {
         let tela = this.getView();
         fetch("https://localhost:7020/api/alunos")
            .then(function(response){
               return response.json();
            })
            .then(function (data){
               tela.setModel(new JSONModel(data),"alunos");
            })
            .catch(function (error){
               console.error(error);
            });
               
      }
    });    
 });