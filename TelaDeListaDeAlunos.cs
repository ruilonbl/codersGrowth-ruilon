using System;
using System.ComponentModel;
using System.Windows.Forms;
using trabalho01.crud;
using trabalho01.model;

namespace trabalho01
{
    public partial class TelaDeListaDeAlunos : Form
    {
        private static BindingList<Pessoa> list = ListSingleton.Lista();

        RepositorioComBanco repository = new RepositorioComBanco();
        Pessoa pessoa = new Pessoa();
        bool liberaCadastro;

        public TelaDeListaDeAlunos()
        {
            InitializeComponent();
            Datagrid_Lista.DataSource = repository.ObterTodos();
        }
        private void AoClicarEmCadastrar(object sender, EventArgs e)
        {          
            TelaDeCadastro cadastrar = new TelaDeCadastro(0);
            cadastrar.Show();         
        }

        private void AoClicarEmAtualizar(object sender, EventArgs e)
        {
            int aux = Datagrid_Lista.SelectedRows.Count;
            if(aux<1)
            {
                MessageBox.Show("VOCÊ NÃO SELECIONOU NENHUM CAMPO", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                if (aux > 1)
                {
                    string erro = "ATUALIZAR";
                    ErrosDeSelecao(erro);
                }
                else
                {
                    liberaCadastro = false;
                    var clienteSelecionado = (Pessoa)Datagrid_Lista.SelectedRows[0].DataBoundItem;
                    TelaDeCadastro cadastrar = new TelaDeCadastro(clienteSelecionado.Id);

                    cadastrar.ShowDialog();
                }
                Datagrid_Lista.DataSource = null;
                Datagrid_Lista.DataSource = list;
            }
        }

        private void AoClicarEmDeletar(object sender, EventArgs e)
        {
            int aux = Datagrid_Lista.SelectedRows.Count;
            if (aux < 1)
            {
                MessageBox.Show("VOCÊ NÃO SELECIONOU NENHUM CAMPO", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                if (aux > 1)
                {
                    string erro = "DELETAR";
                    ErrosDeSelecao(erro);
                }
                else
                {
                    var excluir = MessageBox.Show("VOCÊ TEM CERTEZA QUE DESEJA EXCLUIR ESSE ALUNO?\n", "ALERTA", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
                    if (excluir == DialogResult.Yes)
                    {
                        var clienteSelecionado = (Pessoa)Datagrid_Lista.SelectedRows[0].DataBoundItem;
                        repository.Deletar(clienteSelecionado.Id);
                        repository.ObterTodos();
                    }
                    else
                    {
                        MessageBox.Show("Aluno não excluido", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    }
                }
            }          
        }

        public void ErrosDeSelecao(string erros)
        {
            MessageBox.Show($"VOCÊ NÃO PODE {erros} MAIS DE UM ALUNO POR VEZ", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }
        
    }
}