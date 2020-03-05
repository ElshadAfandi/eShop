using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using eShop.Models;
using System.Web.Security;

namespace eShop.Controllers
{
    [AllowAnonymous]
    public class SecurityController : Controller
    {
        // GET: Security
        eShopContext db = new eShopContext();
        public ActionResult Login()
        {
            return View();
        }
        /// Login to login panel
        /// 
        [HttpPost]
        public ActionResult Login(aspnet_Membership istifadeci, string remember)
        {
            List<string> rolesname = new List<string>();
            istifadeci.LastLoginDate = DateTime.Now;
            bool result = Membership.ValidateUser(istifadeci.aspnet_Users.UserName,istifadeci.Password);
            if (result)
            {
                istifadeci.aspnet_Users.aspnet_Roles = db.aspnet_Users.Where(x => x.UserName == istifadeci.aspnet_Users.UserName).FirstOrDefault().aspnet_Roles;
                foreach(var rol in istifadeci.aspnet_Users.aspnet_Roles)
                {
                    rolesname.Add(rol.RoleName);
                }
                Session["LastLoginDate"] = DateTime.Now;
            }
            bool adminOrUser = rolesname.Exists(x => x.EndsWith("admin"));
            if (result && adminOrUser)
            {
                if (remember == "on")
                {
                    FormsAuthentication.RedirectFromLoginPage(istifadeci.aspnet_Users.UserName, true);
                    return RedirectToAction("Index", "Admin");
                }
                else
                {
                    FormsAuthentication.RedirectFromLoginPage(istifadeci.aspnet_Users.UserName, false);
                    return RedirectToAction("Index", "Admin");
                }
            }
            else
            {
                ViewBag.Error = "İstifadəçi adı və ya şifrə səhvdir...";
                return View();
            }            
        }
        /// Logout from admin panel
        /// 
        public ActionResult Logout()
        {
            Session.Abandon();
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }
    }
}

////Admini girisi temin etmek++++