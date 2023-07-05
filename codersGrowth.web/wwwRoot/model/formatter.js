sap.ui.define([], function () {
	"use strict";
	return {
		
		RetirarCatacterCpf :function(cpf)
		{
			return cpf.replace(/\D/g, '');
		},

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
			let alturaFormatada = altura.getValue()
			return altura.setValue(alturaFormatada.replaceAll(/[^\d]/g, ""))
		},

		formatarData: function(data) {
			if (!data) {
				return "Escolha uma data"
			}
			var dataMoment = moment(data,"YYYY-MM-DDTHH:mm:ss.MMM");
			var dataHoraFormatada = dataMoment.format("DD/MM/YYYY");
			return dataHoraFormatada;
		},
	};
});