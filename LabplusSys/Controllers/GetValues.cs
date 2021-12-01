using LabplusSys.Models;
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
	public class GetValues : ControllerBase
	{


		[HttpPost]
		public IActionResult postResult(VerificarUsuario getId)
		{

			using (LabPlusSystemContext context = new LabPlusSystemContext())
			{



				var lista = (from d in context.ResultadosClinicos where d.Id == getId.id select d).ToList();
				return Ok(lista);

			}




		}




	}
}
