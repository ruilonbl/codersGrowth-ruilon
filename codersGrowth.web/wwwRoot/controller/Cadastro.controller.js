
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../services/Validacao",
	"sap/ui/core/BusyIndicator",
	"sap/ui/core/library",
	"../model/formatter",
    "../const/Const",
	"../services/MensagemTela",
	"../services/Repositorio"
], function (Controller,JSONModel,Validacao,BusyIndicator,coreLibrary,formatter,Const,MensagemTela,Repositorio) {
	"use strict";

	const ValueStateErro = coreLibrary.ValueState.Error;
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
		_i18n: null,
		formatter: formatter,

		onInit:function() {
			const nomeModeloi18n = "i18n"
			this._i18n = this.getOwnerComponent().getModel(nomeModeloi18n).getResourceBundle()
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

		_processarEvento: function(action){
			debugger
			const tipoDaPromise = "catch",
					tipoBuscado = "function";
			try {
					var promise = action();
					if(promise && typeof(promise[tipoDaPromise]) == tipoBuscado){
							promise.catch(error => MessageBox.error(error.message));
					}
			} catch (error) {
				MensagemTela.erro(this._i18n.getText("Erro"));
			}
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
            const IDinvalido = "ID não existente"
            Repositorio.pegarAlunoPeloId(id)
			.then(dados =>{
                debugger
                console.log(dados.erro)
                if(dados.erro ==IDinvalido)
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

		aoClicarEmSalvar : async function(){
			debugger
			this._processarEvento(() => {
				debugger
			let aluno = this._modeloAlunos().getData();
			aluno.cpf = formatter.RetirarCatacterCpf(aluno.cpf)
            if (this._validarCampos()){
					if(aluno.id)
					{
						this._EditarAluno()
					}
					else
					{
						debugger
						this._salvarAluno(aluno)
					}
				}
			 })
		},

		_validarCampos: function()
		{
			debugger
			let nome = this.getView().byId(inputNome )
			let cpf = this.getView().byId(inputCpf)
			let altura = this.getView().byId(inputAltura)
			let sexo = this.getView().byId(inputSexo)
			let dataValor = this.getView().byId(inputData)
			let dataButton = this.getView().byId(buttonDataId)

			Validacao.criarModeloI18n(this._i18n)
			let NomeValidado = Validacao.validarNome(nome)
			let CpfValidado  = Validacao.validarCpf(cpf)
			let AlturaValidado  = Validacao.validarAltura(altura)
			let SexoValidado  = Validacao.validarSexo(sexo)
			let DataValidado  = Validacao.validarData(dataValor, dataButton)

			return NomeValidado  && AlturaValidado  && SexoValidado  && CpfValidado  && DataValidado
		},

		aoClicarEmCancelar: function () {
			this._processarEvento(() =>{
				const CaixaDeDialogocancelar="CaixaDeDialogocancelar"
				MensagemTela.mensagemDeConfirmacao(this._i18n.getText(CaixaDeDialogocancelar),this._navegarParaLista.bind(this))
			})			
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
			debugger
			const CaixaDeDialogoCadastroErro = "CaixaDeDialogoCadastroErro"
			const CaixaDeDialogoCadastroAprovado = "CaixaDeDialogoCadastroAprovado"
			const cpfExiste = "CPF já existe"
			BusyIndicator.show()
			Repositorio.criarAluno(aluno)
         	.then(dados =>{
				BusyIndicator.hide()
				let cpf = this.getView().byId(inputCpf).getValue()
					cpf = formatter.RetirarCatacterCpf(cpf)
                    if ((dados.erro == `O cpf ${cpf} ja existe`)) {
                        this.byId(inputCpf).setValueState(ValueStateErro);
                        this.byId(inputCpf).setValueStateText(cpfExiste);
						MensagemTela.erro(this._i18n.getText(CaixaDeDialogoCadastroErro))						
                    }
					else
					{
						MensagemTela.sucesso(this._i18n.getText(CaixaDeDialogoCadastroAprovado),this._navegarParaLista.bind(this))
					}
			 })
		},

		_EditarAluno : function (){
			debugger
			const CaixaDeDialogoAtualizarErro = "CaixaDeDialogoAtualizarErro"
			const CaixaDeDialogoAtualizarAprovado = "CaixaDeDialogoAtualizarAprovado"
			let aluno = this._modeloAlunos().getData();
			BusyIndicator.show()
			Repositorio.editarAluno(aluno.id,aluno)
         	.then(dados =>{
				BusyIndicator.hide()
				if (dados.status >= Const.ErrodDeFetch400 && dados.status <= Const.ErrodDeFetch599) {
					MensagemTela.erro(this._i18n.getText(CaixaDeDialogoAtualizarErro))						
				}
				else
				{
					MensagemTela.sucesso(this._i18n.getText(CaixaDeDialogoAtualizarAprovado),this._navegarParaLista.bind(this))
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

		aoMudarValorData : function()
		{
			let data = this.getView().byId(inputData)
			formatter.formatarData(data)
		},

		abrirDatePicker: function (oEvent) {
			this.getView()
			  .byId(inputData)
			  .openBy(oEvent.getSource().getDomRef());
		}
	});

});