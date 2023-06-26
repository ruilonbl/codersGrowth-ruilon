sap.ui.define([], function () {
	"use strict";
	return {
			formataCPF : function(cpf){
            cpf = cpf.replace(/[^\d]/g, "");
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        },
		formatarCpf : function(cpf){
			let cpformatado = cpf.getValue()
			if(cpformatado.length==11)
			{
			   return cpf.setValue(this.formataCPF(cpformatado))
			}else {
					  return cpf.setValue(cpformatado.replaceAll(/[^0-9]/g,''))
			}    
		  },
	  
		  formatarAltura : function(altura){
			debugger
			let alturaFormatada = altura.getValue()
			return altura.setValue(alturaFormatada.replaceAll(/[^\d]/g, ""))
		  }
	};
});