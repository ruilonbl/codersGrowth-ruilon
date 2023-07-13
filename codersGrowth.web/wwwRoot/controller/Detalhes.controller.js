sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/BusyIndicator",
    "../const/Const",
	"../services/MensagemTela",
    "../services/Repositorio"
], function(Controller,JSONModel,formatter,BusyIndicator,Const,MensagemTela,Repositorio) {
	"use strict"; 
	
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
            this._obterAluno(Id);
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
            let id = this._modeloAlunos().getData().id;
            debugger
			Repositorio.deletarAluno(id)
			.then(dados => {
				if (dados.status >= Const.ErrodDeFetch400 && dados.status <= Const.ErrodDeFetch500){				
					MensagemTela.erro(this._i18n.getText(CaixaDeDialogoExcluirErro))
				}
				else
				{
					MensagemTela.sucesso(this._i18n.getText(CaixaDeDialogoExcluirAprovado),this._navegarParaLista.bind(this))
					
				}
			})
        },

        _obterAluno : function (id){
            const IDinvalido = "ID não existente"
            BusyIndicator.show()
            Repositorio.pegarAlunoPeloId(id)
			.then(dados =>{
                BusyIndicator.hide();
                console.log(dados.erro)
                if(dados.erro == IDinvalido)
                {
                    let oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo(Const.RotaNotfound, {}, true);
                }
                else
                {
                    this._modeloAlunos(new JSONModel(dados))
                }
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
	   },
	});
});