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
        private static BindingList<Pessoa> list = new BindingList<Pessoa>();
        static int i = 1;
        bool liberaCadastro;
        public TelaDeListaDeAlunos()
        {
            InitializeComponent();
            DT_mostra.DataSource= list;
        }
        private void AoClicarEmCadastrar(object sender, EventArgs e)
        {
            liberaCadastro = true;
            TelaDeCadastro cadastrar = new TelaDeCadastro(list,i,liberaCadastro);
            cadastrar.Show();         
        }

        private void AoClicarEmAtualizar(object sender, EventArgs e)
        {
            int aux = DT_mostra.GetCellCount(DataGridViewElementStates.Selected);
            if (aux > 6)
            {
                MessageBox.Show("VOCÊ NÃO PODE EDITAR MAIS DE UMA ALUNO POR VEZ", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                liberaCadastro = false;
                int ind = DT_mostra.CurrentRow.Index;
                TelaDeCadastro cadastrar = new TelaDeCadastro(list, ind, liberaCadastro);
                cadastrar.Show();
            }
            
        }

        private void AoClicarEmDeletar(object sender, EventArgs e)
        {
            int aux = DT_mostra.GetCellCount(DataGridViewElementStates.Selected);
            if(aux > 6) 
            {
                MessageBox.Show("VOCÊ NÃO PODE EXCLUIR MAIS DE UMA ALUNO POR VEZ", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                var excluir = MessageBox.Show("VOCÊ TEM CERTEZA QUE DESEJA EXCLUIR ESSE ALUNO?\n", "ALERTA", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
                if (excluir == DialogResult.Yes)
                {
                    DT_mostra.Rows.RemoveAt(DT_mostra.CurrentRow.Index);
                }
                else
                {
                    MessageBox.Show("Aluno não excluido", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                }
            }           
        }
        public int cont()
        {
            return i++;
        }
    }
}
