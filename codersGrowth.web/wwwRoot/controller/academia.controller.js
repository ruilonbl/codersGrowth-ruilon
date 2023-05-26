sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
 ], function (Controller) {
    "use strict";
    const uri = 'https://localhost:7020/api/alunos';
    return Controller.extend("sap.ui.demo.academia.controller.App", {
      getItems : function (){
      fetch(uri)
      .then(reponse => reponse.json())
      .then(data => _displayItems(data))
      }
    });
    
 });