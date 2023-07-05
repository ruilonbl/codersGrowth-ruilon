sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../const/Const"
 ], function (Controller, JSONModel,Const) {
    "use strict";
    const caminhoControler = "sap.ui.demo.academia.controller.Academia"
    return Controller.extend(caminhoControler,{
      onInit:function() {
         var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(Const.RotaDeLista).attachPatternMatched(this._aoCoincidirRota, this);     
      },
      
      _modeloAlunos: function(modelo){
         const nomeModelo = "alunos";
         if (modelo){
             return this.getView().setModel(modelo, nomeModelo);   
         } else{
             return this.getView().getModel(nomeModelo);
         }
     },

      _aoCoincidirRota : function()
      {
         fetch(Const.Url)
            .then(function(response){
               return response.json();
            })
            .then(data =>{
               this._modeloAlunos(new JSONModel(data))
            })
            .catch(function (error){
               console.error(error);
            }); 
      },

      aoClicarEmCadastro : function(){
          this._processarEvento(() => {
            let oRouter = this.getOwnerComponent().getRouter()
            oRouter.navTo(Const.RotaCadastro)
         })
      },

      aoFiltrar : function (oEvent) {
			var sQuery = oEvent.getParameter("query");
         fetch(`${Const.Url}?nome=${sQuery}`)
            .then(function(response){
               return response.json();
            })
            .then(data =>{
               this._modeloAlunos(new JSONModel(data))
            })
            .catch(function (error){
               console.error(error);
            }); 			
		},

      aoClicarNaLinha: function (evento) {
         this._processarEvento(() => {
            let id = evento.getSource().getBindingContext("alunos").getObject().id
            let oRouter = this.getOwnerComponent().getRouter()
            oRouter.navTo(Const.RotaDetalhes , {id})

         })
       },

       _processarEvento: function(action){
			const tipoDaPromise = "catch",
					tipoBuscado = "function";
			try {
					var promise = action();
					if(promise && typeof(promise[tipoDaPromise]) == tipoBuscado){
							promise.catch(error => MessageBox.error(error.message));
					}
			} catch (error) {
					MessageBox.error(error.message);
			}
	   }
       
    });    
 });