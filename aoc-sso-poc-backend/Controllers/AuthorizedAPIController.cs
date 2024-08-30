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

    [Authorize]
    [ApiController]
    public class AuthorizedAPI : ControllerBase{

        
        public AuthorizedAPI(){
         
        }

        private Guid GetUserId()
        {
            Guid userId;

            if (!Guid.TryParse(HttpContext.User.GetObjectId(), out userId))
            {
                throw new Exception("User ID is not valid.");
            }

            return userId;
        }

        /// <summary>
        /// Access tokens that have neither the 'scp' (for delegated permissions) nor
        /// 'roles' (for application permissions) claim are not to be honored.
        ///
        /// An access token issued by Azure AD will have at least one of the two claims. Access tokens
        /// issued to a user will have the 'scp' claim. Access tokens issued to an application will have
        /// the roles claim. Access tokens that contain both claims are issued only to users, where the scp
        /// claim designates the delegated permissions, while the roles claim designates the user's role.
        ///
        /// To determine whether an access token was issued to a user (i.e delegated) or an application
        /// more easily, we recommend enabling the optional claim 'idtyp'. For more information, see:
        /// https://docs.microsoft.com/azure/active-directory/develop/access-tokens#user-and-application-tokens
        /// </summary>
        private bool IsAppMakingRequest()
        {
            // Add in the optional 'idtyp' claim to check if the access token is coming from an application or user.
            // See: https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims
            if (HttpContext.User.Claims.Any(c => c.Type == "idtyp"))
            {
                return HttpContext.User.Claims.Any(c => c.Type == "idtyp" && c.Value == "app");
            }
            else
            {
                // alternatively, if an AT contains the roles claim but no scp claim, that indicates it's an app token
                return HttpContext.User.Claims.Any(c => c.Type == "roles") && !HttpContext.User.Claims.Any(c => c.Type == "scp");
            }
        }

        private bool RequestCanAccessToDo(Guid userId)
        {
            return IsAppMakingRequest() || (userId == GetUserId());
        }

        [Route("/test")]
        [HttpGet]
        [RequiredScopeOrAppPermission(
            RequiredScopesConfigurationKey = "AzureAD:Scopes:Read",
            RequiredAppPermissionsConfigurationKey = "AzureAD:AppPermissions:Read"
        )]
        public string Get(){
            Console.WriteLine("AuthorizedAPI");

            return "Response from Authorized API";
        }
    }
}