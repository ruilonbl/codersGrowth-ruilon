sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History"
], function(Controller,JSONModel,History) {
	"use strict";
    const uri = 'https://localhost:7020/api/alunos';
	return Controller.extend("sap.ui.demo.academia.controller.Detalhes", {

        onInit: function () {

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhes").attachPatternMatched(this. _onObjectMatched, this);
		},
        _onObjectMatched: function (oEvent) {
            var Id = oEvent.getParameter("arguments").id
            this.detalhes(Id);
		},
        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("academia", {}, true)
			}
		},
        detalhes : function (id){
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