sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], function (XMLView) {
	"use strict";

	XMLView.create({
		viewName: "sap.ui.demo.academia.view.Academia"
	}).then(function (oView) {
		oView.placeAt("content");
	});

});
