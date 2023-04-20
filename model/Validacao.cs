using System;
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
        public void ValidacaoCamposTexto(Pessoa p)
        {
            string excecoes = "";
            if (p.Nome.Equals(""))
            {
                excecoes += "O USUARIO NAO DIGITOU O NOME";
            }
            if (p.Altura == "")
            {
                excecoes += "\nO USUARIO NAO DIGITOU A ALTURA";
            }
            if (p.Dat == "")
            {
                excecoes += "\nO USUARIO NAO SELECIONOU A DATA";
            }
            if (p.Cpf == "")
            {
                excecoes += "\nO USUARIO NAO DIGITOU O CPF";
            }
            if (p.Sexo == "")
            {
                excecoes += "\nO USUARIO NAO DIGITOU A ALTURA";
            }
            if(!ValidaCPF(p) || p.Cpf.Length !=11)
            {
                excecoes += "\nCPF INVALIDO";
            }
            if((!excecoes.Equals("")))
            {
                throw new Exception(excecoes);
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
