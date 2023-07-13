sap.ui.define([
    "sap/ui/core/mvc/Controller",
 ], function (Controller) {
    "use strict";
    const caminhoControler = "sap.ui.demo.academia.controller.NotFound"
    const rotaDeLista = "ListaDeAlunos"
    return Controller.extend(caminhoControler,{
    aoClicarEmVoltar: function () {
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(rotaDeLista, {}, true);
		},
    });

 });