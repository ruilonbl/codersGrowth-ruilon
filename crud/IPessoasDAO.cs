using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using trabalho01.model;

namespace trabalho01.crud
{
    internal interface IPessoasDAO
    {
        Pessoa create(Pessoa pessoa);
        Pessoa update(Pessoa pessoa);
        void delete(int id);
        List<Pessoa> findAll(int id);
    }
}
