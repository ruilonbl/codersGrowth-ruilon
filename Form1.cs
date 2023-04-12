using System;
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
    public partial class Form1 : Form
    {
        static List<Pessoa> list = new List<Pessoa>();
        static int i = 1;
        public Form1()
        {
            InitializeComponent();
        }

        private void btn_registrar_Click(object sender, EventArgs e)
        {
            if (String.IsNullOrEmpty(txt_nome.Text) || String.IsNullOrEmpty(txt_cpf.Text))
            {
                MessageBox.Show("VOCE NÃO PREENCHEU UM CAMPO",
                                "ALERTA",
                                MessageBoxButtons.OK,
                                MessageBoxIcon.Warning);
            }
            int teste;
            Boolean verifica = txt_cpf.Text.All(char.IsDigit);
            if (txt_cpf.Text.Length !=11 || !verifica)
            {
                MessageBox.Show("CPF INVALIDO",
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
            i++;
            DialogResult retorno = MessageBox.Show("Voce foi registrado :" + txt_nome.Text + " " + txt_cpf.Text+
                                                    "\n deseja reistrar outra pessoa"+verifica,
                                                    "REGISTRADO",
                                                    MessageBoxButtons.YesNo,
                                                    MessageBoxIcon.Information);
            }
        }

        private void bnt_ver_Click(object sender, EventArgs e)
        {
            String mostra="";
            foreach(Pessoa i in list)
            {
                mostra += "ID :"+i.Id+" Nome :"+i.Nome+" Cpf :"+i.Cpf+"\n";
            }
            MessageBox.Show("Pessoas inseridas\n"+mostra);
        }
    }
}
