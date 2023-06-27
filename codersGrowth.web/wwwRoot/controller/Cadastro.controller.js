
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/Text",
	"../services/Validacao",
	"sap/ui/core/BusyIndicator",
	"sap/ui/core/library",
	"../model/Formatter"
], function (Controller, JSONModel,Dialog,Button,mobileLibrary,Text,Validacao,BusyIndicator,coreLibrary,Formatter) {
	"use strict";
	const uri = 'https://localhost:7020/api/alunos';
	var ButtonType = mobileLibrary.ButtonType;
	var DialogType = mobileLibrary.DialogType;
	var ValueState = coreLibrary.ValueState;
	const inputNome = "inputNome";
	const inputAltura = "inputAltura";
	const inputCpf = "inputCpf";
	const inputData = "inputData";
	const inputSexo = "inputSexo";
	const stringVazia = "";
	return Controller.extend("sap.ui.demo.academia.controller.Cadastro", {
			onInit:function() {
			var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute("cadastro").attachPatternMatched(this._aoCoincidirRota, this);
				oRouter.getRoute("editar").attachPatternMatched(this._aoCoincidirRotaEditar, this);      
		},

		_aoCoincidirRota : function(oEvent)
		{
			let aluno = {
				nome : stringVazia,
				cpf : stringVazia,
				altura : stringVazia,
				dat : stringVazia,
				sexo : stringVazia
			}
			this.getView().setModel(new JSONModel(aluno), "alunos");				
			this.DefinirEstadoPadrao()
		},
		_modeloAlunos: function(modelo){
            const nomeModelo = "alunos";
            if (modelo){
                return this.getView().setModel(modelo, nomeModelo);   
            } else{
                return this.getView().getModel(nomeModelo);
            }
        },

		_aoCoincidirRotaEditar : function(oEvent)
		{
			let Id = oEvent.getParameter("arguments").id
			this.DefinirEstadoPadrao()
			this._PreencherTela(Id)
		},

		_PreencherTela : function(id)
		{
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

		aoClicarEmSalvar : async function(){
			let aluno = this._modeloAlunos().getData();
			aluno.cpf = this._RetirarCatacterCpf(aluno.cpf)
            if (aluno.id) {
                
				if(this._validarCampos())
				{
					this._EditarAluno()

				}      
            }
            else {
                if(this._validarCampos())
				{
					this._salvarAluno(aluno)
				}              
            }
				
		},

		_validarCampos: function()
		{			
			let nome = this.getView().byId(inputNome )
			let cpf = this.getView().byId(inputCpf)
			let altura = this.getView().byId(inputAltura)
			let sexo = this.getView().byId(inputSexo)
			let data = this.getView().byId(inputData)
			let NomeValidado = Validacao.validarNome(nome) 
			let CpfValidado  = Validacao.validarCpf(cpf)
			let AlturaValidado  = Validacao.validarAltura(altura)
			let SexoValidado  = Validacao.validarSexo(sexo) 
			let DataValidado  = Validacao.validarData(data)
			if(NomeValidado  && AlturaValidado  && SexoValidado  && CpfValidado  && DataValidado)
			{
				return true
			}
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
							this.DefinirEstadoPadrao()	
							this._navegarParaLista()
							this.oApproveDialog = null;
						}.bind(this)
					}),
					endButton: new Button({
						text: "Não",
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
			this._navegarParaLista();
		},

		_navegarParaLista: function(){
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("ListaDeAlunos", {}, true);
		},

		_limparTela: function () {
			let nome = this.byId(inputNome)
			let altura = this.byId(inputAltura)
			let cpf = this.byId(inputCpf)
			let data = this.byId(inputData)
			nome.setValue(stringVazia)
			altura.setValue(stringVazia)
			cpf.setValue(stringVazia)
			data.setValue(stringVazia)
		},

		_salvarAluno : function (aluno){
			BusyIndicator.show()
			 fetch(`${uri}/`,{
				method: "POST",
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(aluno)
			  }).then(response => {
				console.log(response)
				BusyIndicator.hide()
				if (response.status >=400 && response.status <=599 ){
					return response.text();
					
				}
				response.json()
			}).then(response => {
					let cpf = this.getView().byId(inputCpf).getValue()
					cpf = this._RetirarCatacterCpf(cpf)
					console.log(cpf)
                    if (response == `O cpf ${cpf} ja existe`) {
                        this.byId(inputCpf).setValueState(sap.ui.core.ValueState.Error);
                        this.byId(inputCpf).setValueStateText("CPF já existe");
						if (!this.oErrorMessageDialog) {
							this.oErrorMessageDialog = new Dialog({
								type: DialogType.Message,
								title: "Erro",
								state: ValueState.Error,
								content: new Text({text: "Não foi possivel efetuar o cadastro" }),
								beginButton: new Button({
									type: ButtonType.Emphasized,
									text: "OK",
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
							title: "Sucesso",
							content: new Text({ text: "Aluno cadastrado com sucesso" }),
							beginButton: new Button({
								type: ButtonType.Emphasized,
								text: "OK",
								press: function () {
									this.oApproveDialog.close();
									this._limparTela()
									this._navegarParaLista()
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

		_EditarAluno : function (){
			let aluno = this._modeloAlunos().getData();
			BusyIndicator.show()
			 fetch(`${uri}/${aluno.id}`,{
				method: 'PUT',
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(aluno)
			  }).then(response => {
				console.log(response)
				BusyIndicator.hide()
				if (response.status >=400 && response.status <=599 ){
					if (!this.oErrorMessageDialog) {
						this.oErrorMessageDialog = new Dialog({
							type: DialogType.Message,
							title: "Erro",
							state: ValueState.Error,
							content: new Text({text: "Não foi possivel efetuar a atualização" }),
							beginButton: new Button({
								type: ButtonType.Emphasized,
								text: "OK",
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
						title: "Sucesso",
						content: new Text({ text: "Aluno atualizado com sucesso" }),
						beginButton: new Button({
							type: ButtonType.Emphasized,
							text: "OK",
							press: function () {
								this.oApproveDialog.close();
								this._limparTela()
								this._navegarParaLista()
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
			let cpf = this.getView().byId(inputCpf)
			Formatter.formatarCpf(cpf)
		},

		aoInserirValorAltura : function(){
			let altura = this.getView().byId(inputAltura)
			Formatter.formatarAltura(altura)
		},

		DefinirEstadoPadrao : function () {
			const valorPadrao = "None";
            this.byId(inputNome).setValueState(valorPadrao);
            this.byId(inputAltura).setValueState(valorPadrao);
            this.byId(inputCpf).setValueState(valorPadrao);
            this.byId(inputData).setValueState(valorPadrao);
            this.byId(inputSexo).setValueState(valorPadrao);
        },

		_RetirarCatacterCpf :function(cpf)
		{
			return cpf.replace(/\D/g, '');
		},

		_Atualizar : function (id){
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