
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../services/Validacao",
	"sap/ui/core/BusyIndicator",
	"sap/ui/core/library",
	"../model/formatter",
    "../const/Const",
	"../services/MensagemTela"
], function (Controller,JSONModel,Validacao,BusyIndicator,coreLibrary,formatter,Const,MensagemTela) {
	"use strict";
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
	const caminhoControler = "sap.ui.demo.academia.controller.Cadastro"
	
	return Controller.extend(caminhoControler, {
			formatter: formatter,
			onInit:function() {
			_i18n = this.getOwnerComponent().getModel(_nomeModeloi18n).getResourceBundle()
			var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute(Const.RotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
				oRouter.getRoute(Const.RotaEditar).attachPatternMatched(this._aoCoincidirRotaEditar, this);
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
            fetch(`${Const.Url}/${id}`)
               .then(response => {
				if(response.status >= 400 && response.status <= 599)
				{
					let oRouter = this.getOwnerComponent().getRouter();
					oRouter.navTo(Const.RotaNotfound, {}, true);
				}
				return response.json();
				})
               .then(data =>{
				  data.cpf = formatter.formataCPF(data.cpf)
				  this._modeloAlunos(new JSONModel(data))
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
			Validacao.criarModeloI18n(_i18n)
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
			const CaixaDeDialogocancelar="CaixaDeDialogocancelar"
			MensagemTela.mensagemDeConfirmacao(_i18n.getText(CaixaDeDialogocancelar),this._navegarParaLista.bind(this))
		},

        aoClicarEmVoltar: function () {
			this._navegarParaLista();
		},

		_navegarParaLista: function(){
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(Const.RotaDeLista, {}, true);
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
			const CaixaDeDialogoCadastroErro = "CaixaDeDialogoCadastroErro"
			const CaixaDeDialogoCadastroAprovado = "CaixaDeDialogoCadastroAprovado"
			const cpfExiste = "CPF já existe"
			BusyIndicator.show()
			 fetch(`${Const.Url}/`,{
				method: "POST",
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(aluno)
			  }).then(response => {
				BusyIndicator.hide()
				if (response.status >= 400 && response.status <= 599 ){
					return response.text();

				}
				response.json()
			}).then(response => {
					let cpf = this.getView().byId(inputCpf).getValue()
					cpf = this._RetirarCatacterCpf(cpf)
                    if (response == `O cpf ${cpf} ja existe`) {
                        this.byId(inputCpf).setValueState(ValueStateErro);
                        this.byId(inputCpf).setValueStateText(cpfExiste);
						MensagemTela.erro(_i18n.getText(CaixaDeDialogoCadastroErro))						
                    }
					else
					{
						MensagemTela.sucesso(_i18n.getText(CaixaDeDialogoCadastroAprovado),this._navegarParaLista.bind(this))
					}
			})
		},

		_EditarAluno : function (){
			const CaixaDeDialogoAtualizarErro = "CaixaDeDialogoAtualizarErro"
			const CaixaDeDialogoAtualizarAprovado = "CaixaDeDialogoCadastroAprovado"
			let aluno = this._modeloAlunos().getData();
			BusyIndicator.show()
			 fetch(`${Const.Url}/${aluno.id}`,{
				method: 'PUT',
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(aluno)
			  }).then(response => {
				BusyIndicator.hide()
				if (response.status >=400 && response.status <=599 ){
					MensagemTela.erro(_i18n.getText(CaixaDeDialogoAtualizarErro))						
				}
				else
				{
					MensagemTela.sucesso(_i18n.getText(CaixaDeDialogoAtualizarAprovado),this._navegarParaLista.bind(this))
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
            fetch(`${Const.Url}/${id}`)
               .then(response => {
					if(response.status >=400 && response.status <=599)
					{
						let oRouter = this.getOwnerComponent().getRouter();
						oRouter.navTo(Const.RotaNotfound, {}, true);
					}
					return response.json();
					})
					.then(data =>{
						this._modeloAlunos(new JSONModel(data))
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