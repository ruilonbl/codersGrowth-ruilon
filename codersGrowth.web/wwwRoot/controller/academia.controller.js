sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../const/Const",
    "../services/Repositorio"
 ], function (Controller, JSONModel,Const,Repositorio) {
    "use strict";
    const caminhoControler = "sap.ui.demo.academia.controller.Academia"

    return Controller.extend(caminhoControler,{
      _i18n: null,
      onInit:function() {
         const nomeModeloi18n = "i18n"
			this._i18n = this.getOwnerComponent().getModel(nomeModeloi18n).getResourceBundle()
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
         Repositorio.criarModeloI18n(this._i18n)
         const valorPadraoGet = ""
         Repositorio.pegarAlunos(valorPadraoGet)
         .then(dados =>{
            debugger
            this._modeloAlunos(new JSONModel(dados))
         } )
      },

      aoClicarEmCadastro : function(){
          this._processarEvento(() => {
            let oRouter = this.getOwnerComponent().getRouter()
            oRouter.navTo(Const.RotaCadastro)
         })
      },

      aoFiltrar : function (evento) {
			var filtro = evento.getParameter("query");
         Repositorio.pegarAlunos(filtro)
         .then(dados => this._modeloAlunos(new JSONModel(dados)))
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