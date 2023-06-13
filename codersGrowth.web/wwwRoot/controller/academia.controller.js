sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
 ], function (Controller, JSONModel) {
    "use strict";
    const uri = 'https://localhost:7020/api/alunos';
    return Controller.extend("sap.ui.demo.academia.controller.Academia",{
      onInit:function() {
         let tela = this.getView();
         fetch(uri)
            .then(function(response){
               return response.json();
            })
            .then(function (data){
               tela.setModel(new JSONModel(data),"alunos");
            })
            .catch(function (error){
               console.error(error);
            });       
      },

      aoClicarEmCadastro : function(event){
         let oRouter = this.getOwnerComponent().getRouter()
         oRouter.navTo("cadastro")
      },

      aoFiltrar : function (oEvent) {
         let tela = this.getView();
			var sQuery = oEvent.getParameter("query");
         fetch(`${uri}?nome=${sQuery}`)
            .then(function(response){
               return response.json();
            })
            .then(function (data){
               tela.setModel(new JSONModel(data),"alunos");
            })
            .catch(function (error){
               console.error(error);
            }); 			
		},

      aoClicarNaLinha: function (evento) {
         let id = evento.getSource().getBindingContext("alunos").getObject().id
         let oRouter = this.getOwnerComponent().getRouter()
         oRouter.navTo("detalhes", {id})
       }
    });    
 });