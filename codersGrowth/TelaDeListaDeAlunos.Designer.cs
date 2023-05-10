namespace trabalho01
{
    partial class TelaDeListaDeAlunos
    {
        /// <summary>
        /// Variável de designer necessária.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpar os recursos que estão sendo usados.
        /// </summary>
        /// <param name="disposing">true se for necessário descartar os recursos gerenciados; caso contrário, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código gerado pelo Windows Form Designer

        /// <summary>
        /// Método necessário para suporte ao Designer - não modifique 
        /// o conteúdo deste método com o editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            botaoCadastrar = new Button();
            bnt_atualizar = new Button();
            btn_deletar = new Button();
            Datagrid_Lista = new DataGridView();
            ((System.ComponentModel.ISupportInitialize)Datagrid_Lista).BeginInit();
            SuspendLayout();
            // 
            // botaoCadastrar
            // 
            botaoCadastrar.Location = new Point(391, 346);
            botaoCadastrar.Margin = new Padding(4, 3, 4, 3);
            botaoCadastrar.Name = "botaoCadastrar";
            botaoCadastrar.Size = new Size(108, 27);
            botaoCadastrar.TabIndex = 0;
            botaoCadastrar.Text = "CADASTRAR";
            botaoCadastrar.UseVisualStyleBackColor = true;
            botaoCadastrar.Click += AoClicarEmCadastrar;
            // 
            // bnt_atualizar
            // 
            bnt_atualizar.Location = new Point(506, 346);
            bnt_atualizar.Margin = new Padding(4, 3, 4, 3);
            bnt_atualizar.Name = "bnt_atualizar";
            bnt_atualizar.Size = new Size(108, 27);
            bnt_atualizar.TabIndex = 5;
            bnt_atualizar.Text = "ATUALIZAR";
            bnt_atualizar.UseVisualStyleBackColor = true;
            bnt_atualizar.Click += AoClicarEmAtualizar;
            // 
            // btn_deletar
            // 
            btn_deletar.Location = new Point(622, 346);
            btn_deletar.Margin = new Padding(4, 3, 4, 3);
            btn_deletar.Name = "btn_deletar";
            btn_deletar.Size = new Size(108, 27);
            btn_deletar.TabIndex = 6;
            btn_deletar.Text = "DELETAR";
            btn_deletar.UseVisualStyleBackColor = true;
            btn_deletar.Click += AoClicarEmDeletar;
            // 
            // Datagrid_Lista
            // 
            Datagrid_Lista.AllowUserToAddRows = false;
            Datagrid_Lista.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            Datagrid_Lista.Location = new Point(14, 14);
            Datagrid_Lista.Margin = new Padding(4, 3, 4, 3);
            Datagrid_Lista.Name = "Datagrid_Lista";
            Datagrid_Lista.Size = new Size(716, 325);
            Datagrid_Lista.TabIndex = 7;
            // 
            // TelaDeListaDeAlunos
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(750, 387);
            Controls.Add(Datagrid_Lista);
            Controls.Add(btn_deletar);
            Controls.Add(bnt_atualizar);
            Controls.Add(botaoCadastrar);
            Margin = new Padding(4, 3, 4, 3);
            Name = "TelaDeListaDeAlunos";
            Text = "Tela de lista de alunos";
            ((System.ComponentModel.ISupportInitialize)Datagrid_Lista).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private System.Windows.Forms.Button botaoCadastrar;
        private System.Windows.Forms.Button bnt_atualizar;
        private System.Windows.Forms.Button btn_deletar;
        private System.Windows.Forms.DataGridView Datagrid_Lista;
    }
}

