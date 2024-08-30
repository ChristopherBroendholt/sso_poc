using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;

namespace AOC_SSP_POC_BACKEND{

    public class UnauthorizedAPI : Controller{

        public UnauthorizedAPI(){

        }

        [Route("/UnauthorizedAPI")]
        public string Get(){
            Console.WriteLine("UnauthorizedAPI");
            return "Response from Unauthorized API";
        }

    }
}