sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/BusyIndicator",
    "../const/Const",
	"../services/MensagemTela"
], function(Controller,JSONModel,formatter,BusyIndicator,Const,MensagemTela) {
	"use strict"; 
	const rotaNotfound = "notFound"
	const caminhoControler = "sap.ui.demo.academia.controller.Detalhes"
	return Controller.extend(caminhoControler, {
        formatter: formatter,
        _i18n: null,

        onInit: function () {
            
            const nomeModeloi18n = "i18n"
			this._i18n = this.getOwnerComponent().getModel(nomeModeloi18n).getResourceBundle()
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(Const.RotaDetalhes).attachPatternMatched(this._aoCoincidirRota, this);
		},

        _aoCoincidirRota: function (oEvent) {
            let Id = oEvent.getParameter("arguments").id
            this._detalhes(Id);
		},

        _modeloAlunos: function(modelo){
            const nomeModelo = "alunos";
            if (modelo){
                return this.getView().setModel(modelo, nomeModelo);   
            } else{
                return this.getView().getModel(nomeModelo);
            }
        },

        aoClicarEmVoltar: function () {
            this._processarEvento(()=>{
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo(Const.RotaDeLista, {}, true);
            })
			
		},

        aoClicarEmEditar: function(){
            this._processarEvento(()=>{
                const caminhoEditar="editar"
                let id = this._modeloAlunos().getData().id;
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo(caminhoEditar, {
                    id: id
                });
            })
        },

        aoClicarEmExcluir : function(evento)
        {
            debugger
            this._processarEvento(()=>{
                const CaixaDeDialogoExcluir = "CaixaDeDialogoExcluir"
                let id = this._modeloAlunos().getData().id;
                MensagemTela.mensagemDeConfirmacao(this._i18n.getText(CaixaDeDialogoExcluir), this._removerAluno.bind(this), [id])
            })
        },

        _navegarParaLista: function(){
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(Const.RotaDeLista, {}, true);
		},

        _removerAluno: function()
        {
			const CaixaDeDialogoExcluirErro = "CaixaDeDialogoExcluirErro"
			const CaixaDeDialogoExcluirAprovado = "CaixaDeDialogoExcluirAprovado"
            let aluno = this._modeloAlunos().getData();
			BusyIndicator.show()
			 fetch(`${Const.Url}/${aluno.id}`,{
				method: 'DELETE',
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(aluno)
			  }).then(response => {
				BusyIndicator.hide()
				if (response.status >= Const.ErrodDeFetch400 && response.status <= Const.ErrodDeFetch500){				
					MensagemTela.erro(this._i18n.getText(CaixaDeDialogoExcluirErro))
				}
				else
				{
					MensagemTela.sucesso(this._i18n.getText(CaixaDeDialogoExcluirAprovado),this._navegarParaLista.bind(this))
					
				}
			})
        },

        _detalhes : function (id){
            let tela = this.getView();
            fetch(`${Const.Url}/${id}`)
               .then(response => {
					if(response.status >= Const.ErrodDeFetch400 && response.status <= Const.ErrodDeFetch500)
					{
						let oRouter = this.getOwnerComponent().getRouter();
            			oRouter.navTo(rotaNotfound, {}, true);
					}
                  return response.json();
               })
               .then(function (data){
                  tela.setModel(new JSONModel(data),"alunos")
               })
               .catch(function (error){
                  console.error(error);
               });	
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
	   },
	});
});