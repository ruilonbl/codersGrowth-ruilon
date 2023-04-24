using System;
using System.ComponentModel;
using System.Linq;
using System.Windows.Forms;
using trabalho01.crud;
using trabalho01.model;

namespace trabalho01
{
    public partial class TelaDeCadastro : Form
    {
        private static BindingList<Pessoa> list = ListSingleton.Lista();
        Repository repository = new Repository();
        Validacao validacao = new Validacao();
        Pessoa p = new Pessoa();
        int idAtualizar;
        bool atualizar,erro;
        public TelaDeCadastro(Pessoa pessoa)
        {
            InitializeComponent();
            p = pessoa;
            if(pessoa != null)
            {
                idAtualizar = pessoa.Id;
                txt_nome.Text = pessoa.Nome;
                txt_cpf.Text = pessoa.Cpf;
                txt_altura.Text = pessoa.Altura;
                if(pessoa.Sexo.Equals("Feminino"))
                {
                    rb_Feminino.Checked = true;
                }
                else
                {
                    rb_Masculino.Checked = true;
                }
                txt_cpf.Enabled = false;
            }
            
        }
        private void AoclicarRegistrar(object sender, EventArgs e)
        {
            try
            {
                if (p == null)
                {
                    p = RecebePessoas(p);
                    atualizar = false;
                }
                else
                {
                    if (p.Id != 0)
                    {
                        p = AtualizaPessoas(p);
                        atualizar = true;
                    }                    
                }
                validacao.ValidacaoCamposTexto(p, atualizar);
                if (!atualizar && validacao.erros.Count == 0)
                {
                    atualizar = false;
                    p.Id = ListSingleton.cont(atualizar);
                    repository.Criar(p);
                    Close();
                }
                else
                {
                    if(validacao.erros.Count == 0)
                    {
                        repository.atualizar(p, idAtualizar);
                        Close();
                    }   
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                if (p.Id == 0)
                {
                    p = null;
                }
            }
            
        }

        public Pessoa RecebePessoas(Pessoa pessoacadastro)
        {
            Pessoa pessoa = new Pessoa();
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
            return pessoa;
        }
        public Pessoa AtualizaPessoas(Pessoa pessoa)
        {
            foreach (Pessoa p in list)
            {
                if (idAtualizar == p.Id)
                {
                    p.Nome = txt_nome.Text;
                    p.Cpf = txt_cpf.Text;
                    p.Altura = txt_altura.Text;
                    if (rb_Feminino.Checked)
                    {
                        p.Sexo = "Feminino";
                    }
                    else
                    {
                        p.Sexo = "Masculino";
                    }
                    pessoa = p;
                }
            } 
            return pessoa;
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
