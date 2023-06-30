sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/ui/core/BusyIndicator",
    "sap/ui/core/library"
], function(Controller,JSONModel,formatter,Button,mobileLibrary,Dialog,Text,BusyIndicator,coreLibrary) {
	"use strict"; 
    const ButtonType = mobileLibrary.ButtonType;
	const DialogType = mobileLibrary.DialogType;
    const ValueState = coreLibrary.ValueState;
	let _i18n = null
	const _nomeModeloi18n = "i18n"
    const uri = 'https://localhost:7020/api/alunos';
	const caminhoControler = "sap.ui.demo.academia.controller.Detalhes"
	const rotaDeLista = "ListaDeAlunos"
	const tituloBotaoErro = "Erro"
	const tituloBotaoSucesso = "Sucesso"
	const opcaoOK = "OK"
	const rotaDetalhes = "detalhes"
	return Controller.extend(caminhoControler, {
        formatter: formatter,
        onInit: function () {
			_i18n = this.getOwnerComponent().getModel(_nomeModeloi18n).getResourceBundle()
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaDetalhes).attachPatternMatched(this._aoCoincidirRota, this);
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
            oRouter.navTo(rotaDeLista, {}, true);
		},

        aoClicarEmEditar: function(){
			const caminhoEditar="editar"
            let alunos = this._modeloAlunos().getData();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(caminhoEditar, {
                id: alunos.id
            });
        },

        aoClicarEmExcluir : function()
        {
			const caixaDeDialogoExcluir = "caixaDeDialogoExcluir"
			const tituloBotao = "Excluir"
			const opcaoSim = "Sim"
			const opcaoNao = "Não"
            if (!this.oApproveDialog) {
				this.oApproveDialog = new Dialog({
					type: DialogType.Message,
					title: tituloBotao,
					content: new Text({ text: _i18n.getText(caixaDeDialogoExcluir)}),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: opcaoSim,
						press: function () {
							this.oApproveDialog.close();
                            this._removerAluno()
							this.oApproveDialog = null;
						}.bind(this)
					}),
					endButton: new Button({
						text: opcaoNao,
						press: function () {
							this.oApproveDialog.close();
							this.oApproveDialog = null;
						}.bind(this)
					})
				});
			}
			this.oApproveDialog.open()
        },

        _navegarParaLista: function(){
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(rotaDeLista, {}, true);
		},

        _removerAluno: function()
        {
			const caixaDeDialogoExcluirErro = "caixaDeDialogoExcluirErro"
			const caixaDeDialogoExcluirAprovado = "caixaDeDialogoExcluirAprovado"
            let aluno = this._modeloAlunos().getData();
			BusyIndicator.show()
			 fetch(`${uri}/${aluno.id}`,{
				method: 'DELETE',
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(aluno)
			  }).then(response => {
				BusyIndicator.hide()
				if (response.status >=400 && response.status <=599 ){
					if (!this.oErrorMessageDialog) {
						this.oErrorMessageDialog = new Dialog({
							type: DialogType.Message,
							title: tituloBotaoErro,
							state: ValueState.Error,
							content: new Text({text: _i18n.getText(caixaDeDialogoExcluirErro)}),
							beginButton: new Button({
								type: ButtonType.Emphasized,
								text: opcaoOK,
								press: function () {
									this.oErrorMessageDialog.close();
									this.oErrorMessageDialog = null;
								}.bind(this)
							})
						});
					}
					this.oErrorMessageDialog.open();
				}
				else
				{
					if (!this.oApproveDialog) {
					this.oApproveDialog = new Dialog({
						type: DialogType.Message,
						title: tituloBotaoSucesso,
						content: new Text({ text: _i18n.getText(caixaDeDialogoExcluirAprovado)}),
						beginButton: new Button({
							type: ButtonType.Emphasized,
							text: opcaoOK,
							press: function () {
								this.oApproveDialog.close();
								this._navegarParaLista()
								this.oApproveDialog = null;
							}.bind(this)
						})
					});
					}
					this.oApproveDialog.open();
					}
			})
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