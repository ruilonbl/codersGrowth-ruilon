sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel,MessageToast) {
	"use strict";
	const uri = 'https://localhost:7020/api/alunos/';
	
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
			this._limparTela()
			this.aoClicarEmVoltar()
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
			  }).then(response => response.json())
			  .then(data => console.log(data))
			  .then(function (){
				MessageToast.show("Aluno cadastrado com sucesso");
			 	})
				 .then(() => {
					this.aoClicarEmVoltar()
				  }) 
		}
	});

});