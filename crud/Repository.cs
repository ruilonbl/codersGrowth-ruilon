using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using trabalho01.model;

namespace trabalho01.crud
{
    internal class Repository : IRepository
    {
        BindingList<Pessoa> lista = ListSingleton.Lista();
        public BindingList<Pessoa> atualizar(Pessoa pessoa, int id)
        {
            foreach (Pessoa p in lista)
            {
                if (id == p.Id)
                {
                    p.Nome = pessoa.Nome;
                    p.Cpf = pessoa.Cpf;
                    p.Altura = pessoa.Altura;
                    p.Sexo = pessoa.Sexo;
                    pessoa = p;
                }
            }
            return lista;
        }

        public void Criar(Pessoa pessoa)
        {
            lista.Add(pessoa);
        }

        public void Deletar(int id)
        {
            var e = lista.Select(x => x.Id == id).FirstOrDefault();
            foreach (Pessoa p in lista)
            {
                if (id == p.Id)
                {
                    lista.Remove(p);
                    break;
                }
            }
        }

        public BindingList<Pessoa> retorno()
        {
            throw new NotImplementedException();
        }
    }
}
