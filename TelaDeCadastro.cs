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
        int i;
        private static BindingList<Pessoa> list = new BindingList<Pessoa>();
        DataGridView dataGridView1 = new DataGridView();

        public TelaDeCadastro(DataGridView dataGridView)
        {
            InitializeComponent();
            dataGridView1 = dataGridView;
        }
        private void AoclicarRegistrar(object sender, EventArgs e)
        {
            if(list.Count==0)
            {
                i = 0;
            }
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
                    foreach (Pessoa i in list)
                    {
                        if (i.Cpf.Equals(txt_cpf.Text))
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
                        pessoa.Id = i;
                        pessoa.Nome = txt_nome.Text;
                        pessoa.Cpf = txt_cpf.Text;
                        list.Add(pessoa);
                        Close();

                        dataGridView1.DataSource = list;
                        i++;
                        //foreach (Pessoa i in list)
                        //{
                        //    MessageBox.Show("ID: "+i.Id+"\n Nome: "+i.Nome+"\n Cpf"+i.Cpf,
                        //           "ALERTA",
                        //           MessageBoxButtons.OK,
                        //           MessageBoxIcon.Warning);
                        //}
                    }
                }
            }
        }

        private void AoClicarVoltar(object sender, EventArgs e)
        {
            Close();
        }
    }
}
