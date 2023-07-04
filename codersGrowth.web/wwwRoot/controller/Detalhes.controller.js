sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/BusyIndicator",
    "../const/Const",
	"../services/MensagemTela"
], function(Controller,JSONModel,formatter,BusyIndicator,Const,MensagemTela) {
	"use strict"; 
	let _i18n = null
	const _nomeModeloi18n = "i18n"
	const rotaNotfound = "notFound"
	const caminhoControler = "sap.ui.demo.academia.controller.Detalhes"
	return Controller.extend(caminhoControler, {
        formatter: formatter,

        onInit: function () {
			_i18n = this.getOwnerComponent().getModel(_nomeModeloi18n).getResourceBundle()
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
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(Const.RotaDeLista, {}, true);
		},

        aoClicarEmEditar: function(){
			const caminhoEditar="editar"
            let alunos = this._modeloAlunos().getData();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(caminhoEditar, {
                id: alunos.id
            });
        },

        aoClicarEmExcluir : function(evento)
        {
			const CaixaDeDialogoExcluir = "CaixaDeDialogoExcluir"
			let alunos = this._modeloAlunos().getData();
			MensagemTela.mensagemDeConfirmacao(_i18n.getText(CaixaDeDialogoExcluir), this._removerAluno.bind(this), [alunos.id])
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
				if (response.status >=400 && response.status <=599 ){				
					MensagemTela.erro(_i18n.getText(CaixaDeDialogoExcluirErro))
				}
				else
				{
					MensagemTela.sucesso(_i18n.getText(CaixaDeDialogoExcluirAprovado),this._navegarParaLista.bind(this))
					
				}
			})
        },

        _detalhes : function (id){
            let tela = this.getView();
            fetch(`${Const.Url}/${id}`)
               .then(response => {
					if(response.status >= 400 && response.status <= 599)
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
	});
});