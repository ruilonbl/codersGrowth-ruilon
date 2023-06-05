sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.academia.controller.Detalhes", {

        onInit: function () {

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhes").attachPatternMatched(this._hhhhhhhhhhhhh, this);
		}
	});
});