using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using trabalho01.model;

namespace trabalho01
{
    public partial class TelaDeCadastro : Form
    {
        private static BindingList<Pessoa> list = new BindingList<Pessoa>();
        TelaDeListaDeAlunos telaDeListaDeAlunos = new TelaDeListaDeAlunos();
        DataGridView dataGridView1 = new DataGridView();
        int aux;
        public TelaDeCadastro(DataGridView dataGridView)
        {
            InitializeComponent();
            dataGridView1 = dataGridView;
        }
        public TelaDeCadastro(DataGridView dataGridView,int ind)
        {
            InitializeComponent();
            dataGridView1 = dataGridView;
            txt_nome.Text = list[ind].Nome;
            txt_cpf.Text = list[ind].Cpf;
            txt_altura.Text = list[ind].Altura;
            txt_dtn.Text = list[ind].Dat.ToString();
            aux = ind;
        }
        private void AoclicarRegistrar(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(txt_nome.Text) || string.IsNullOrEmpty(txt_cpf.Text))
            {
                MessageBox.Show("VOCE NÃO PREENCHEU UM CAMPO",
                                "ALERTA",
                                MessageBoxButtons.OK,
                                MessageBoxIcon.Warning);
            }
            else
            {              
                bool verifica = txt_cpf.Text.All(char.IsDigit);
                if (txt_cpf.Text.Length != 11 || !verifica)
                {
                    MessageBox.Show("CPF INVALIDO",
                                    "ALERTA",
                                    MessageBoxButtons.OK,
                                    MessageBoxIcon.Warning);
                }
                else
                {
                    int cont = 0;
                    foreach (Pessoa p in list)
                    {
                        if (p.Cpf.Equals(txt_cpf.Text))
                        {
                            cont++;
                        }
                    }
                    if (cont != 0)
                    {
                        MessageBox.Show("CPF JA EXISTE",
                                    "ALERTA",
                                    MessageBoxButtons.OK,
                                    MessageBoxIcon.Warning);
                    }
                    else
                    {
                        Pessoa pessoa = new Pessoa();
                        pessoa.Id = telaDeListaDeAlunos.cont();
                        pessoa.Nome = txt_nome.Text;
                        pessoa.Cpf = txt_cpf.Text;
                        list.Add(pessoa);
                        Close();
                        dataGridView1.DataSource = list;
                    }
                }
            }
        }

        private void AoClicarEmAtualizar(object sender, EventArgs e)
        {
            Pessoa pessoa = new Pessoa();
            pessoa.Id = aux+1;
            pessoa.Nome = txt_nome.Text;
            pessoa.Cpf = txt_cpf.Text;
            list[aux] = pessoa;
            foreach (Pessoa p in list)
            {
                MessageBox.Show("ID: "+p.Id+" Nome: "+p.Nome+" CPF: "+p.Cpf,
                                    "ATUALIZADO",
                                    MessageBoxButtons.OK,
                                    MessageBoxIcon.Warning);
            }

            Close();   
        }
    }
}
