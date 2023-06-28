sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter"
], function(Controller,JSONModel,formatter) {
	"use strict";
    const uri = 'https://localhost:7020/api/alunos';
	return Controller.extend("sap.ui.demo.academia.controller.Detalhes", {
        formatter: formatter,
        onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhes").attachPatternMatched(this._aoCoincidirRota, this);
		},

        _aoCoincidirRota: function (oEvent) {
            let Id = oEvent.getParameter("arguments").id
            this._detalhes(Id);
		},

        modeloAlunos: function(modelo){
            const nomeModelo = "alunos";
            if (modelo){
                return this.getView().setModel(modelo, nomeModelo);   
            } else{
                return this.getView().getModel(nomeModelo);
            }
        },

        aoClicarEmVoltar: function () {
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("ListaDeAlunos", {}, true);
		},

        aoClicarEmEditar: function(){
            let alunos = this. modeloAlunos().getData();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("editar", {
                id: alunos.id
            });
        },

        _detalhes : function (id){
            let tela = this.getView();
            fetch(`${uri}/${id}`)
               .then(function(response){
                  return response.json();
               })
               .then(function (data){
                  tela.setModel(new JSONModel(data),"alunos")
               })
               .catch(function (error){
                  console.error(error);
               });	
        },
	});
});