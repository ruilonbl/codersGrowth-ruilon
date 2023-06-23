sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/Text",
	"../services/Validacao",
	"sap/ui/core/BusyIndicator",
], function (Controller, JSONModel,Dialog,Button,mobileLibrary,Text,Validacao,BusyIndicator) {
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
			window.inputNome = this.byId("inputNome");
			let aluno = {
				nome : "",
				cpf : "",
				altura : "",
				dat : "",
				sexo : ""
			}
			this.getView().setModel(new JSONModel(aluno), "alunos");
			window.dataaaa = this.getView().byId("inputData");
		},

		aoClicarEmSalvar : async function(){
			let alunoCriacao = this.getView().getModel("alunos").getData();
			alunoCriacao.cpf = this._cpf(alunoCriacao.cpf)
			let nome = this.getView().byId("inputNome")
			let cpf = this.getView().byId("inputCpf")
			let altura = this.getView().byId("inputAltura")
			let sexo = this.getView().byId("inputSexo")
			let data = this.getView().byId("inputData")
			let NomeValidado = Validacao.validarNome(nome) 
			let CpfValidado  = Validacao.validarCpf(cpf)
			let AlturaValidado  = Validacao.validarAltura(altura)
			let SexoValidado  = Validacao.validarSexo(sexo) 
			let DataValidado  = Validacao.validarData(data)
			if(NomeValidado  && AlturaValidado  && SexoValidado  && CpfValidado  && DataValidado)
			{
				await this._salvarAluno(alunoCriacao)
			}
			// Validacao.validarCpf(cpf)
			// Validacao.validarAltura(altura)
			// Validacao.validarSexo(sexo)
			// Validacao.validarData(data)
				
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
							this._aoDevolverCamposVazios()	
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
			this.oApproveDialog.open()
		},

        aoClicarEmVoltar: function () {
			this._limparTela()
			this._aoDevolverCamposVazios()	
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

		_salvarAluno : function (aluno){
			BusyIndicator.show()
			 fetch(uri, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(aluno)
			  }).then(response => {
				debugger
				console.log(response)
				BusyIndicator.hide()
				if (response.status >=400 && response.status <=599 ){
					return response.text();
					
				}
				response.json()
			}).then(response => {
					debugger
					let cpg = this.getView().byId("inputCpf").getValue()
					cpg = this._cpf(cpg)
					console.log(cpg)
                    if (response == `O cpf ${cpg} ja existe`) {
                        this.byId("inputCpf").setValueState(sap.ui.core.ValueState.Error);
                        this.byId("inputCpf").setValueStateText("CPF já existe");
						if (!this.oApproveDialog) {
							this.oApproveDialog = new Dialog({
								type: DialogType.Message,
								title: "Erro",
								content: new Text({text: "Não foi possivel efetuar o cadastro" }),
								beginButton: new Button({
									type: ButtonType.Emphasized,
									text: "OK",
									press: function () {
										this.oApproveDialog.close();
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

		aoInserirValorCpf: function () {
			let cpf = this.getView().byId("inputCpf")
			Validacao.formatarCpf(cpf)
		},
		aoInserirValorAltura : function(){
			let altura = this.getView().byId("inputAltura")
			Validacao.formatarAltura(altura)
		},
		_aoDevolverCamposVazios : function () {
            this.byId("inputNome").setValueState("None");
            this.byId("inputAltura").setValueState("None");
            this.byId("inputCpf").setValueState("None");
            this.byId("inputData").setValueState("None");
            this.byId("inputSexo").setValueState("None");
        },

		_cpf :function(cpf)
		{
			return cpf.replace(/\D/g, '');
		}
	});

});