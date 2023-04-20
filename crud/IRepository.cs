﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using trabalho01.model;

namespace trabalho01.crud
{
    public interface IRepository
    {
        BindingList<Pessoa> atualizar(Pessoa pessoa,int id);
        void Criar(Pessoa pessoa);
        void Deletar(int id);
        BindingList<Pessoa> retorno();
    }
}