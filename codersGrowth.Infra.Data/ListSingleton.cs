using System.ComponentModel;

namespace trabalho01.model
{
    public sealed class ListSingleton
    {
        private static BindingList<Pessoas> lista;
        static int i = 1;

        public static BindingList<Pessoas> Lista()
        {
            if(lista == null)
            {
                lista = new BindingList<Pessoas>();
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
