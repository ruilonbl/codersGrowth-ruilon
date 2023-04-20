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
            throw new NotImplementedException();
        }

        public void Criar(Pessoa pessoa)
        {
            lista.Add(pessoa);
        }

        public void Deletar(int id)
        {
            throw new NotImplementedException();
        }

        public BindingList<Pessoa> retorno()
        {
            throw new NotImplementedException();
        }
    }
}
