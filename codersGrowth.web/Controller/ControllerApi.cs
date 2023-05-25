using BancoDeDados;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using trabalho01.crud;
using trabalho01.model;

namespace codersGrowth.web.Controller
{
    [Route("/api/alunos")]
    [ApiController]
    public class ControllerApi : ControllerBase
    {
        private readonly IRepositorio _repositorio;

        public ControllerApi(IRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public IActionResult BuscarTodosOsAlunos()
        {
            BindingList<Pessoas> alunos = _repositorio.ObterTodos();
            return Ok(alunos);
        }

        [HttpGet("{id}")]
        public IActionResult BuscarAlunoPorId(int id)
        {
            Pessoas alunos = _repositorio.ObiterNaListaPorId(id);
            return Ok(alunos);
        }

        [HttpPost]
        public IActionResult AdicionarPessoa([FromBody, Required()] Pessoas pessoa)
        {
            if (pessoa == null)
                return BadRequest();

            Validacao validacao = new();
            validacao.ValidarPessoa(pessoa, _repositorio);

            _repositorio.Criar(pessoa);
            return Created($"pessoa", pessoa);
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarPessoa([FromBody, Required()] Pessoas pessoa, int id)
        {
            if (pessoa == null)
                return BadRequest();

            Validacao validacao = new();
            pessoa.Id = id;
            validacao.ValidarPessoa(pessoa, _repositorio);

            _repositorio.Atualizar(pessoa, id);
            return Ok(pessoa);
        }
        [HttpDelete("{id}")]
        public IActionResult DeletaPessoa(int id)
        {
           _repositorio.Deletar(id);
            return Ok();
        }
    }
}
