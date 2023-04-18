using System;
using System.ComponentModel;
using System.Linq;
using System.Windows.Forms;
using trabalho01.model;

namespace trabalho01
{
    public partial class TelaDeCadastro : Form
    {
        BindingList<Pessoa> lista;
        TelaDeListaDeAlunos telaDeListaDeAlunos = new TelaDeListaDeAlunos();
        bool liberacadastro;
        int aux,auxatualizando;
        public TelaDeCadastro(BindingList<Pessoa> list,int ind,bool libera)
        {
            InitializeComponent();
            liberacadastro = libera;
            lista = list;
            if(!libera)
            {
                auxatualizando = list[ind].Id;
                txt_nome.Text = lista[ind].Nome;
                txt_cpf.Text = lista[ind].Cpf;
                txt_altura.Text = lista[ind].Altura;
                if (lista[ind].Sexo.Equals("Feminino"))
                {
                    rb_Feminino.Checked = true;
                }
                else
                {
                    rb_Masculino.Checked = true;
                }
                txt_cpf.Enabled = false;
            
            }
            aux = ind;
        }
        public TelaDeCadastro(DataGridView dataGridView,int ind)
        {
            InitializeComponent();
            
        }
        private void AoclicarRegistrar(object sender, EventArgs e)
        {
            string validacampos = string.Empty;
            if (string.IsNullOrEmpty(txt_nome.Text))
            {
                validacampos += "VOCÊ NÃO PREENCHEU O CAMPO DO NOME";
            }
            if(string.IsNullOrEmpty(txt_cpf.Text))
            {
                validacampos += "\nVOCÊ NÃO PREENCHEU O CAMPO DO CPF";
            }
            if(string.IsNullOrEmpty(txt_altura.Text))
            {
                validacampos += "\nVOCÊ NÃO PREENCHEU O CAMPO DA ALTURA";
            }
            if(!rb_Feminino.Checked && !rb_Masculino.Checked)
            {
                validacampos += "\nVOCÊ NÃO SELECIONOU UM SEXO";
            }
            if(!validacampos.Equals(""))
            {
                MessageBox.Show(validacampos, "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                int cont = 0;
                foreach (Pessoa p in lista)
                {
                    if (p.Cpf.Equals(txt_cpf.Text))
                    {
                        cont++;
                    }
                }
                if (cont != 0 && liberacadastro)
                {
                    MessageBox.Show("CPF JA EXISTE", "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                }
                else
                {
                    if(!liberacadastro)
                    {
                        Pessoa pessoa = new Pessoa();
                        pessoa.Id = auxatualizando;
                        pessoa.Nome = txt_nome.Text;
                        pessoa.Cpf = txt_cpf.Text;
                        pessoa.Altura = txt_altura.Text;
                        pessoa.Dat = dateTime.Text.ToString();
                        if(rb_Feminino.Checked)
                        {
                            pessoa.Sexo = "Feminino";
                        }
                        else
                        {
                            pessoa.Sexo = "Masculino";
                        }
                        lista[aux] = pessoa;
                        Close();
                    }
                    else
                    {
                        Pessoa pessoa = new Pessoa();
                        pessoa.Id = telaDeListaDeAlunos.cont();
                        pessoa.Nome = txt_nome.Text;
                        pessoa.Cpf = txt_cpf.Text;
                        pessoa.Altura = txt_altura.Text;
                        pessoa.Dat = dateTime.Text.ToString();
                        if (rb_Feminino.Checked)
                        {
                            pessoa.Sexo = "Feminino";
                        }
                        else
                        {
                            pessoa.Sexo = "Masculino";
                        }
                        lista.Add(pessoa);
                        Close();
                    }  
                }
            }
        }

        private void SAIR(object sender, EventArgs e)
        {
            Close();
        }
        public static void validaCampoNumero(KeyPressEventArgs e)
        {
            if (!char.IsLetter(e.KeyChar) && !(e.KeyChar == (char)Keys.Back) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }
        public static void validaCampoLetra(KeyPressEventArgs e)
        {
            if (!char.IsNumber(e.KeyChar) && !Char.IsControl(e.KeyChar) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }

        private void txt_nome_KeyPress(object sender, KeyPressEventArgs e)
        {
            validaCampoNumero(e);
        }

        private void txt_cpf_KeyPress(object sender, KeyPressEventArgs e)
        {
            validaCampoLetra(e);
        }

        private void txt_altura_KeyPress(object sender, KeyPressEventArgs e)
        {
            validaCampoLetra(e);
        }
    }
}
