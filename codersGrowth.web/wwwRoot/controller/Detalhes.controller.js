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
    var ButtonType = mobileLibrary.ButtonType;
	var DialogType = mobileLibrary.DialogType;
    var ValueState = coreLibrary.ValueState;
    const uri = 'https://localhost:7020/api/alunos';
	return Controller.extend("sap.ui.demo.academia.controller.Detalhes", {
        formatter: formatter,
        onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhes").attachPatternMatched(this._aoCoincidirRota, this);
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
            oRouter.navTo("ListaDeAlunos", {}, true);
		},

        aoClicarEmEditar: function(){
            let alunos = this._modeloAlunos().getData();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("editar", {
                id: alunos.id
            });
        },

        aoClicarEmExcluir : function()
        {
            if (!this.oApproveDialog) {
				this.oApproveDialog = new Dialog({
					type: DialogType.Message,
					title: "Excluir",
					content: new Text({ text: "Deseja realmente excluir esse alunos?" }),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "Sim",
						press: function () {
							this.oApproveDialog.close();
                            this._removerAluno()
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

        _navegarParaLista: function(){
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("ListaDeAlunos", {}, true);
		},

        _removerAluno: function()
        {
            debugger
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
							title: "Erro",
							state: ValueState.Error,
							content: new Text({text: "Não foi possivel exlucir esse aluno" }),
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
						content: new Text({ text: "Aluno excluido com sucesso" }),
						beginButton: new Button({
							type: ButtonType.Emphasized,
							text: "OK",
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