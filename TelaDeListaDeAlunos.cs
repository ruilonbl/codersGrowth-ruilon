using System;
using System.Windows.Forms;

namespace trabalho01
{  
    public partial class TelaDeListaDeAlunos : Form
    {
        static int i = 0;
        public TelaDeListaDeAlunos()
        {
            InitializeComponent();
        }
        private void AoClicarEmCadastrar(object sender, EventArgs e)
        {
            TelaDeCadastro cadastrar = new TelaDeCadastro(DT_mostra);
            cadastrar.Show();         
        }

        private void AoClicarEmAtualizar(object sender, EventArgs e)
        {
            int ind = DT_mostra.CurrentRow.Index;
            TelaDeCadastro cadastrar = new TelaDeCadastro(DT_mostra,ind);
            cadastrar.Show();
        }

        private void AoClicarEmDeletar(object sender, EventArgs e)
        {
            DT_mostra.Rows.RemoveAt(DT_mostra.CurrentRow.Index);
        }

        public int Cont()
        {
            return ++i;
        }
    }
}
