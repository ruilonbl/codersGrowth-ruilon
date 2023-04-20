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
        bool liberaCadastro;
        public TelaDeListaDeAlunos()
        {
            InitializeComponent();
            DT_mostra.DataSource= list;
        }
        private void AoClicarEmCadastrar(object sender, EventArgs e)
        {          
            liberaCadastro = true;
            TelaDeCadastro cadastrar = new TelaDeCadastro(list,ListSingleton.cont(liberaCadastro),liberaCadastro);
            cadastrar.Show();         
        }

        private void AoClicarEmAtualizar(object sender, EventArgs e)
        {
            int aux = DT_mostra.SelectedRows.Count;
            if (aux > 1)
            {
                MessageBox.Show("VOCÊ NÃO PODE EDITAR MAIS DE UMA ALUNO POR VEZ", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                liberaCadastro = false;
                var clienteSelecionado = (Pessoa)DT_mostra.SelectedRows[0].DataBoundItem;
                TelaDeCadastro cadastrar = new TelaDeCadastro(list,clienteSelecionado.Id, liberaCadastro);
                
                cadastrar.ShowDialog();
            }
            DT_mostra.DataSource = null;
            DT_mostra.DataSource = list;

        }

        private void AoClicarEmDeletar(object sender, EventArgs e)
        {
            int aux = DT_mostra.SelectedRows.Count;
            if(aux > 1) 
            {
                MessageBox.Show("VOCÊ NÃO PODE EXCLUIR MAIS DE UMA ALUNO POR VEZ", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                var excluir = MessageBox.Show("VOCÊ TEM CERTEZA QUE DESEJA EXCLUIR ESSE ALUNO?\n", "ALERTA", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
                if (excluir == DialogResult.Yes)
                {
                        var clienteSelecionado = (Pessoa)DT_mostra.SelectedRows[0].DataBoundItem;

                        foreach (Pessoa p in list.ToList())
                        {
                            if (clienteSelecionado.Id == p.Id)
                            {
                                list.Remove(p);
                            }
                        }
                }
                else
                {
                    MessageBox.Show("Aluno não excluido", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                }
            }           
        }
        
    }
}
