using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Linq.Expressions;
using System.Windows.Forms;

namespace trabalho01.model
{
    public class Validacao
    {
        private static BindingList<Pessoa> list = ListSingleton.Lista();
        public List<String> erros = new List<String>();
        public void ValidacaoCamposTexto(Pessoa p,bool atualiza)
        {
            if (p.Nome.Equals(""))
            {
                erros.Add("O USUARIO NAO DIGITOU O NOME");
            }
            if (p.Altura == "")
            {
                erros.Add("O USUARIO NAO DIGITOU A ALTURA");
            }
            if (p.Dat == "")
            {
                erros.Add("O USUARIO NAO SELECIONOU A DATA");
            }
            if (p.Cpf == "")
            {
                erros.Add("O USUARIO NAO DIGITOU O CPF");
            }
            if (p.Sexo == "")
            {
                erros.Add("O USUARIO NAO SELECIONOU UM SEXO");
            }
            if(!atualiza)
            {
                if (!ValidaCPF(p))
                {
                    erros.Add("CPF JA EXISTE");
                }
            }
            if (p.Cpf.Length != 11)
            {
                erros.Add("CPF INVALIDO");
            }
            if(erros.Count !=0)
            {
                var erro = string.Join(Environment.NewLine,erros);
                erros.Clear();
                throw new Exception(erro);
            }
        }
        public bool ValidaCPF(Pessoa p)
        {
            foreach (Pessoa pe in list)
            {
                if (p.Cpf.Equals(pe.Cpf))
                {
                    return false;
                }
            }
            return true;
        }
    }
}
