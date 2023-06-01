sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
 ], function (Controller, JSONModel,MessageToast,ResourceModel, Filter, FilterOperator) {
    "use strict";
    const uri = 'https://localhost:7020/api/alunos';
    return Controller.extend("sap.ui.demo.academia.controller.App",{
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
      onCadastro : function(){
         MessageToast.show("vamos cadastrar");
      },
      onFiltro : function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("nome", FilterOperator.Contains, sQuery));
			}
			var oList = this.byId("lista");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
    });    
 });