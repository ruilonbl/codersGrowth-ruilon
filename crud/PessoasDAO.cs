using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using trabalho01.model;

namespace trabalho01.crud
{
    internal class PessoasDAO : IPessoasDAO
    {
        static List<Pessoa> list = new List<Pessoa>();
        public Pessoa create(Pessoa pessoa)
        {
            
            list.Add (pessoa);
            return pessoa;
        }

        public void delete(int id)
        {
            list.RemoveAt(id);
        }

        public List<Pessoa> findAll(int id)
        {
            throw new NotImplementedException();
        }

        public Pessoa update(Pessoa pessoa)
        {
            throw new NotImplementedException();
        }
    }
}
