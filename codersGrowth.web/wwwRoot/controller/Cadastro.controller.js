sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/Text",
	"../services/Validacao"
], function (Controller, JSONModel,Dialog,Button,mobileLibrary,Text,Validacoes) {
	"use strict";
	const uri = 'https://localhost:7020/api/alunos/';
	var ButtonType = mobileLibrary.ButtonType;
	var DialogType = mobileLibrary.DialogType;
	return Controller.extend("sap.ui.demo.academia.controller.Cadastro", {
			onInit:function() {
			var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute("cadastro").attachPatternMatched(this._aoCoincidirRota, this);     
		},

		_aoCoincidirRota : function()
		{
			let aluno = {
				nome : "",
				cpf : "",
				altura : "",
				dat : "",
				sexo : ""
			}
			this.getView().setModel(new JSONModel(aluno), "alunos");
		},

		aoClicarEmSalvar : function(){
			let alunoCriacao = this.getView().getModel("alunos").getData();
			this.salvarAluno(alunoCriacao);
		},

		aoClicarEmCancelar: function () {
			if (!this.oApproveDialog) {
				this.oApproveDialog = new Dialog({
					type: DialogType.Message,
					title: "Cancelar",
					content: new Text({ text: "Deseja realmente cancelar?" }),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "sim",
						press: function () {
							this.oApproveDialog.close();
							this._limparTela()
							this.aoClicarEmVoltar()
							this.oApproveDialog = null;
						}.bind(this)
					}),
					endButton: new Button({
						text: "nao",
						press: function () {
							this.oApproveDialog.close();
							this.oApproveDialog = null;
						}.bind(this)
					})
				});
			}
			this.oApproveDialog.open();
		},

        aoClicarEmVoltar: function () {
			this._limparTela()
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("academia", {}, true);
		},

		_limparTela: function () {
			let nome = this.byId("inputNome")
			let altura = this.byId("inputAltura")
			let cpf = this.byId("inputCpf")
			let data = this.byId("inputData")
			nome.setValue("")
			altura.setValue("")
			cpf.setValue("")
			data.setValue("")
		},

		salvarAluno(aluno){
			console.log(aluno);
			const response = fetch(uri, {
				method: "POST", 
				mode: "cors", 
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(aluno), 
			  }).then(response => {
				response.json()
				if (response.status == 400){
					if (!this.oApproveDialog) {
						this.oApproveDialog = new Dialog({
							type: DialogType.Message,
							title: "Erro",
							content: new Text({ text: "Não foi possivel cadastrar o aluno" }),
							beginButton: new Button({
								type: ButtonType.Emphasized,
								text: "OK",
								press: function () {
									this.oApproveDialog.close();
									this._limparTela()
									this.oApproveDialog = null;
								}.bind(this)
							})
						});
					}
					this.oApproveDialog.open();	
				}
				else
				{
					if (!this.oApproveDialog) {
						this.oApproveDialog = new Dialog({
							type: DialogType.Message,
							title: "Sucesso",
							content: new Text({ text: "Aluno cadastrado com sucesso" }),
							beginButton: new Button({
								type: ButtonType.Emphasized,
								text: "OK",
								press: function () {
									this.oApproveDialog.close();
									this._limparTela()
									this.aoClicarEmVoltar()
									this.oApproveDialog = null;
								}.bind(this)
							})
						});
					}
					this.oApproveDialog.open();	
				}
			})
			.then(data => console.log(data))	  
		},

		aoIncerirDadoNome : function()
		{
			var oInputNome = this.getView().byId("inputNome");
			var resultadoValidacaoInput = Validacao.validarInput(oInputNome);
			this.validacaoResultado.nome = resultadoValidacaoInput;
			this.aoValidarAtivarOuNaoBotaoSalvar();
		}
	});

});