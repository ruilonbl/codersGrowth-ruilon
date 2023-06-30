
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
	"../model/formatter"
], function (Controller, JSONModel,Dialog,Button,mobileLibrary,Text,Validacao,BusyIndicator,coreLibrary,formatter) {
	"use strict";
	const _uri = 'https://localhost:7020/api/alunos';
	const ButtonType = mobileLibrary.ButtonType;
	const DialogType = mobileLibrary.DialogType;
	const ValueState = coreLibrary.ValueState;
	const ValueStateErro = coreLibrary.ValueState.Error;
	let _i18n = null
	const _nomeModeloi18n = "i18n"
	const inputNome = "inputNome";
	const inputForm = "inputForm"
	const inputAltura = "inputAltura";
	const inputCpf = "inputCpf";
	const inputData = "inputData";
	const buttonDataId = "buttonDataId";
	const inputSexo = "inputSexo";
	const stringVazia = "";
	const rotaDeLista = "ListaDeAlunos"
	rotaDeLista
	const rotaEditar ="editar"
	const cpfExiste = "CPF já existe"
	const tituloBotaoErro = "Erro"
	const tituloBotaoSucesso = "Sucesso"
	const opcaoOK = "OK"
	const caminhoControler = "sap.ui.demo.academia.controller.Cadastro"
	return Controller.extend(caminhoControler, {
			formatter: formatter,
			onInit:function() {
			_i18n = this.getOwnerComponent().getModel(_nomeModeloi18n).getResourceBundle()
			var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute(rotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
				oRouter.getRoute(rotaEditar).attachPatternMatched(this._aoCoincidirRotaEditar, this);
		},

		_setarModeloAluno(){
			let aluno = {
				nome : stringVazia,
				cpf : stringVazia,
				altura : stringVazia,
				dat : stringVazia,
				sexo : stringVazia
			}
			this.getView().setModel(new JSONModel(aluno), "alunos");
		},

		_aoCoincidirRota : function()
		{
			const tituloTelaCadastro = "Cadastro"
			this._setarModeloAluno();
			this.byId(inputForm).setTitle(tituloTelaCadastro);
			this.DefinirEstadoPadrao()
			let input = this.getView().byId(inputCpf)
			input.setEnabled(true)
		},
		
		_aoCoincidirRotaEditar : function(aluno)
		{
			const tituloTelaAtualizar = "Atualizar Aluno"
			this._setarModeloAluno();
			let Id = aluno.getParameter("arguments").id
			this.byId(inputForm).setTitle(tituloTelaAtualizar);
			this.DefinirEstadoPadrao()
			this._PreencherTela(Id)
			let input = this.getView().byId(inputCpf)
			input.setEnabled(false)
		},

		_modeloAlunos: function(modelo){
            const nomeModelo = "alunos";
            if (modelo){
                return this.getView().setModel(modelo, nomeModelo);
            } else{
                return this.getView().getModel(nomeModelo);
            }
        },

		_PreencherTela : function(id)
		{
			let tela = this.getView();
            fetch(`${_uri}/${id}`)
               .then(function(response){
                  return response.json();
               })
               .then(function (data){
				  data.cpf = formatter.formataCPF(data.cpf)
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
			let dataValor = this.getView().byId(inputData)
			let dataButton = this.getView().byId(buttonDataId)
			let NomeValidado = Validacao.validarNome(nome)
			let CpfValidado  = Validacao.validarCpf(cpf)
			let AlturaValidado  = Validacao.validarAltura(altura)
			let SexoValidado  = Validacao.validarSexo(sexo)
			let DataValidado  = Validacao.validarData(dataValor, dataButton)
			return NomeValidado  && AlturaValidado  && SexoValidado  && CpfValidado  && DataValidado
		},

		aoClicarEmCancelar: function () {
			const caixaDeDialogocancelar="caixaDeDialogocancelar"
			const tituloBotao = "Cancelar"
			const opcaoSim = "Sim"
			const opcaoNao = "Não"
			if (!this.oApproveDialog) {
				this.oApproveDialog = new Dialog({
					type: DialogType.Message,
					title: tituloBotao,
					content: new Text({text: _i18n.getText(caixaDeDialogocancelar)}),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: opcaoSim ,
						press: function () {
							this.oApproveDialog.close();
							this._limparTela()
							this._navegarParaLista()
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

        aoClicarEmVoltar: function () {
			this._navegarParaLista();
		},

		_navegarParaLista: function(){
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(rotaDeLista, {}, true);
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
			const caixaDeDialogoCadastroErro = "caixaDeDialogoCadastroErro"
			const caixaDeDialogoCadastroAprovado = "caixaDeDialogoCadastroAprovado"
			
			BusyIndicator.show()
			 fetch(`${_uri}/`,{
				method: "POST",
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(aluno)
			  }).then(response => {
				BusyIndicator.hide()
				if (response.status >=400 && response.status <=599 ){
					return response.text();

				}
				response.json()
			}).then(response => {
					let cpf = this.getView().byId(inputCpf).getValue()
					cpf = this._RetirarCatacterCpf(cpf)
                    if (response == `O cpf ${cpf} ja existe`) {
                        this.byId(inputCpf).setValueState(ValueStateErro);
                        this.byId(inputCpf).setValueStateText(cpfExiste);
						if (!this.oErrorMessageDialog) {
							this.oErrorMessageDialog = new Dialog({
								type: DialogType.Message,
								title: tituloBotaoErro ,
								state: ValueState.Error,
								content: new Text({text: _i18n.getText(caixaDeDialogoCadastroErro)}),
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
							content: new Text({ text: _i18n.getText(caixaDeDialogoCadastroAprovado)}),
							beginButton: new Button({
								type: ButtonType.Emphasized,
								text:  opcaoOK,
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
			const caixaDeDialogoAtualizarErro = "caixaDeDialogoAtualizarErro"
			const caixaDeDialogoAtualizarAprovado = "caixaDeDialogoCadastroAprovado"
			let aluno = this._modeloAlunos().getData();
			BusyIndicator.show()
			 fetch(`${_uri}/${aluno.id}`,{
				method: 'PUT',
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
							content: new Text({text: _i18n.getText(caixaDeDialogoAtualizarErro)}),
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
						content: new Text({ text: _i18n.getText(caixaDeDialogoAtualizarAprovado)}),
						beginButton: new Button({
							type: ButtonType.Emphasized,
							text: opcaoOK,
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
		},

		aoInserirValorCpf: function () {
			let cpf = this.getView().byId(inputCpf)
			formatter.formatarCpf(cpf)
		},

		aoInserirValorAltura : function(){
			let altura = this.getView().byId(inputAltura)
			formatter.formatarAltura(altura)
		},

		DefinirEstadoPadrao : function () {
			const valorPadrao = "None";
            this.byId(inputNome).setValueState(valorPadrao);
            this.byId(inputAltura).setValueState(valorPadrao);
            this.byId(inputCpf).setValueState(valorPadrao);
            this.byId(inputData).setValueState(valorPadrao);
			this.byId(buttonDataId).setType(sap.m.ButtonType.Default)
            this.byId(inputSexo).setValueState(valorPadrao);
        },

		_RetirarCatacterCpf :function(cpf)
		{
			return cpf.replace(/\D/g, '');
		},

		aoMudarValorData : function()
		{
			let data = this.getView().byId(inputData)
			formatter.formatarData(data)
		},

		_Atualizar : function (id){
            let tela = this.getView();
            fetch(`${_uri}/${id}`)
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
		abrirDatePicker: function (oEvent) {
			this.getView()
			  .byId(inputData)
			  .openBy(oEvent.getSource().getDomRef());
		  },
	});

});