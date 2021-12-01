using LabplusSys.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LabplusSys.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ValuesController : ControllerBase
	{
		public IWebHostEnvironment _webHostEnvironment;

		public ValuesController(IWebHostEnvironment webHostEnvironment)
		{

			_webHostEnvironment = webHostEnvironment;

		}
		
		[HttpGet]
		public IActionResult Get()
		{

			using (LabPlusSystemContext context = new LabPlusSystemContext())
			{
				var lst = context.ResultadosClinicos.ToList();


				//Result result = new Result()
				//{
				//	Id = lst.First().Id,
				//	Image = lst.First().Image,
				//	root = _webHostEnvironment.WebRootPath

				//};
				return Ok(lst);

			}

		}

		[HttpPost]
		public IActionResult Post(VerificarUsuario verificar)
		{
			Response response = new Response() { exito = 0};

			using (LabPlusSystemContext context = new LabPlusSystemContext()) {


				var lista = from d in context.Usuarios where d.Usuario1 == verificar.Usuario && d.Contrasena == verificar.Contrasena select d;
				if(lista.Count() > 0)
				{
					response.id = lista.First().Id;
					response.exito = 1;
					 
				}

				return Ok(response);

			}

		}


		
	}
}
