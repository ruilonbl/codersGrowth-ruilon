using System.ComponentModel;

namespace trabalho01.model
{
    public sealed class ListSingleton
    {
        private static BindingList<Pessoa> lista;
        static int i = 1;

        public static BindingList<Pessoa> Lista()
        {
            if(lista == null)
            {
                lista = new BindingList<Pessoa>();
            }
            return lista;
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
