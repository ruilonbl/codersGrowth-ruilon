using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using trabalho01.crud;
using trabalho01.model;

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
        public int cont()
        {
            i++;
            return i;
        }
    }
}
