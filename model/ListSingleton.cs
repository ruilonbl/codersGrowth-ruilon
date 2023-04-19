using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace trabalho01.model
{
    public sealed class ListSingleton
    {
        //private ListSingleton() { }
        private static BindingList<Pessoa> lista;
        static int i = 1;
        public static BindingList<Pessoa> Lista()
        {
            if(lista == null)
            {
                lista = new BindingList<Pessoa>();
            }
            return lista;
           // set { lista = value; }
        }
        public static int cont(bool atualiza)
        {
            if(atualiza)
            {
                return i;
            }
            return i++;
        }
    }
}
