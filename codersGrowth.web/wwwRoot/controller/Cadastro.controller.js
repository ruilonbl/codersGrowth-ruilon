sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	const uri = 'https://localhost:7020/api/alunos/';
	
	return Controller.extend("sap.ui.demo.academia.controller.Cadastro", {
		aoClicarEmSalvar : function(){
			var aluno = {
				nome: this.byId("inputNome").getValue(),
				cpf: this.byId("inputCpf").getValue(),
				altura: this.byId("inputAltura").getValue(),
				dat: this.byId("inputData").getProperty("dateValue").toISOString(),
				sexo: this.byId("inputSexo").getProperty("select"),
			};
			
			console.log(this.byId("inputSexo").getProperty(""))
			 //this.salvarAluno(aluno);
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
			aluno.sexo = aluno.sexo == 1 ? "Masculino" : "Feminino"
			const response = fetch(uri, {
				method: "POST", 
				mode: "cors", 
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(aluno), 
			  }).then(response => response.json())
			  .then(data => console.log(data));
		}
	});

});