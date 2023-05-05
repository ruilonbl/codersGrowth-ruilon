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
            this.botaoCadastrar = new System.Windows.Forms.Button();
            this.bnt_atualizar = new System.Windows.Forms.Button();
            this.btn_deletar = new System.Windows.Forms.Button();
            this.Datagrid_Lista = new System.Windows.Forms.DataGridView();
            ((System.ComponentModel.ISupportInitialize)(this.Datagrid_Lista)).BeginInit();
            this.SuspendLayout();
            // 
            // botaoCadastrar
            // 
            this.botaoCadastrar.Location = new System.Drawing.Point(335, 300);
            this.botaoCadastrar.Name = "botaoCadastrar";
            this.botaoCadastrar.Size = new System.Drawing.Size(93, 23);
            this.botaoCadastrar.TabIndex = 0;
            this.botaoCadastrar.Text = "CADASTRAR";
            this.botaoCadastrar.UseVisualStyleBackColor = true;
            this.botaoCadastrar.Click += new System.EventHandler(this.AoClicarEmCadastrar);
            // 
            // bnt_atualizar
            // 
            this.bnt_atualizar.Location = new System.Drawing.Point(434, 300);
            this.bnt_atualizar.Name = "bnt_atualizar";
            this.bnt_atualizar.Size = new System.Drawing.Size(93, 23);
            this.bnt_atualizar.TabIndex = 5;
            this.bnt_atualizar.Text = "ATUALIZAR";
            this.bnt_atualizar.UseVisualStyleBackColor = true;
            this.bnt_atualizar.Click += new System.EventHandler(this.AoClicarEmAtualizar);
            // 
            // btn_deletar
            // 
            this.btn_deletar.Location = new System.Drawing.Point(533, 300);
            this.btn_deletar.Name = "btn_deletar";
            this.btn_deletar.Size = new System.Drawing.Size(93, 23);
            this.btn_deletar.TabIndex = 6;
            this.btn_deletar.Text = "DELETAR";
            this.btn_deletar.UseVisualStyleBackColor = true;
            this.btn_deletar.Click += new System.EventHandler(this.AoClicarEmDeletar);
            // 
            // Datagrid_Lista
            // 
            this.Datagrid_Lista.AllowUserToAddRows = false;
            this.Datagrid_Lista.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Datagrid_Lista.Location = new System.Drawing.Point(12, 12);
            this.Datagrid_Lista.Name = "Datagrid_Lista";
            this.Datagrid_Lista.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.Datagrid_Lista.Size = new System.Drawing.Size(614, 282);
            this.Datagrid_Lista.TabIndex = 7;
            // 
            // TelaDeListaDeAlunos
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(643, 335);
            this.Controls.Add(this.Datagrid_Lista);
            this.Controls.Add(this.btn_deletar);
            this.Controls.Add(this.bnt_atualizar);
            this.Controls.Add(this.botaoCadastrar);
            this.Name = "TelaDeListaDeAlunos";
            this.Text = "Tela de lista de alunos";
            ((System.ComponentModel.ISupportInitialize)(this.Datagrid_Lista)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button botaoCadastrar;
        private System.Windows.Forms.Button bnt_atualizar;
        private System.Windows.Forms.Button btn_deletar;
        private System.Windows.Forms.DataGridView Datagrid_Lista;
    }
}

