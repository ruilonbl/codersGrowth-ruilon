using System.ComponentModel;
using trabalho01.crud;
using trabalho01.model;

namespace trabalho01
{
    public partial class TelaDeListaDeAlunos : Form
    {
        private static BindingList<Pessoas> list = ListSingleton.Lista();
        private readonly IRepositorio repository;
        const int linhasInvalidas = 1;
        const int celulaSelecionada = 0;

        public TelaDeListaDeAlunos(IRepositorio repositorio)
        {
            InitializeComponent();
            repository = repositorio;
            Datagrid_Lista.DataSource = repository.ObterTodos();
        }

        private void AoClicarEmCadastrar(object sender, EventArgs e)
        {
            const int _id = 0;
            TelaDeCadastro cadastrar = new TelaDeCadastro(_id, repository);
            cadastrar.ShowDialog();
            PreencherDataGrid();
        }

        private void AoClicarEmAtualizar(object sender, EventArgs e)
        {
            int quardaNumeroDeLinhasSelecionadas = Datagrid_Lista.SelectedRows.Count;
            if (quardaNumeroDeLinhasSelecionadas < linhasInvalidas)
            {
                MessageBox.Show("VOCÊ NÃO SELECIONOU NENHUM CAMPO", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                if (quardaNumeroDeLinhasSelecionadas > linhasInvalidas)
                {
                    string erro = "ATUALIZAR";
                    ErrosDeSelecao(erro);
                }
                else
                {
                    var clienteSelecionado = (Pessoas)Datagrid_Lista.SelectedRows[celulaSelecionada].DataBoundItem;
                    TelaDeCadastro cadastrar = new TelaDeCadastro(clienteSelecionado.Id, repository);
                    cadastrar.ShowDialog();
                }
                PreencherDataGrid();
            }
        }

        private void AoClicarEmDeletar(object sender, EventArgs e)
        {
            int quardaNumeroDeLinhasSelecionadas = Datagrid_Lista.SelectedRows.Count;
            if (quardaNumeroDeLinhasSelecionadas < linhasInvalidas)
            {
                MessageBox.Show("VOCÊ NÃO SELECIONOU NENHUM CAMPO", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                if (quardaNumeroDeLinhasSelecionadas > linhasInvalidas)
                {
                    string erro = "DELETAR";
                    ErrosDeSelecao(erro);
                }
                else
                {
                    var excluir = MessageBox.Show("VOCÊ TEM CERTEZA QUE DESEJA EXCLUIR ESSE ALUNO?\n", "ALERTA", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
                    if (excluir == DialogResult.Yes)
                    {
                        var clienteSelecionado = (Pessoas)Datagrid_Lista.SelectedRows[celulaSelecionada].DataBoundItem;
                        repository.Deletar(clienteSelecionado.Id);
                        PreencherDataGrid();
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

        public void PreencherDataGrid()
        {
            Datagrid_Lista.DataSource = null;
            Datagrid_Lista.DataSource = repository.ObterTodos();
        }

    }
}