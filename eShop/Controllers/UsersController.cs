using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using eShop.Models;
using System.Web.Security;
using eShop.App_Classes;
using System.Data.Entity;

namespace eShop.Controllers
{    
    public class UsersController : Controller
    {
        // GET: Users
        eShopContext db = new eShopContext();
        public ActionResult Index()
        {
            return View(db.aspnet_Membership.ToList());
        }
        ///New rol name save
        ///
        public ActionResult NewRolName(string name)
        {
            var ls = new SelectListItem();
            if (!Roles.RoleExists(name))
            {
                Roles.CreateRole(name);
                ls.Value = name + " rolu əlavə olundu";

            }
            else
            {
                ls.Value = "Bu rol adı mövcuddur.";
            }

            //return View("Index", db.aspnet_Membership.ToList());
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///View Roles
        ///
        public JsonResult ViewRoles()
        {
            var ls = new List<SelectListItem>();
            var roles = db.aspnet_Roles.ToList();
            foreach (var role in roles)
            {
                ls.Add(new SelectListItem { Value = role.RoleId.ToString(), Text = role.RoleName });
            }
            return Json(ls,JsonRequestBehavior.AllowGet);
        }
        ///Delete role
        ///
        public ActionResult DeleteRol(Guid id)
        {
            var role = db.aspnet_Roles.Where(x => x.RoleId == id).FirstOrDefault();
            
            if (role.RoleName != "admin")
            {
                foreach (var user in role.aspnet_Users.ToList())
                {
                    Roles.RemoveUserFromRole(user.UserName,role.RoleName);
                }
                Roles.DeleteRole(role.RoleName, true);
                return View("Index", db.aspnet_Membership.ToList());
            }
            else
            {
                var ls = new SelectListItem();
                ls.Text = "admin-i silmək olmaz";
                return Json(ls,JsonRequestBehavior.AllowGet);
            }
            
        }
        ///New user saved
        ///
        [HttpPost]
        public ActionResult SaveNewUser(NewUser data)
        {
            
            //
            string mesaj = "";
            MembershipCreateStatus hal;
            var ms = new SelectListItem();

            MembershipUser newuser = Membership.CreateUser(data.UserName,data.Password,data.Email,data.SecurityQuestion,data.SecurityAnswer, true,out hal);
            if (newuser != null)
            {
                Roles.AddUserToRole(newuser.UserName, data.RoleName);
            }
            switch (hal)
            {
                case MembershipCreateStatus.Success:
                    break;
                case MembershipCreateStatus.InvalidUserName:
                    mesaj += "Səhv istifdəçi adı";
                    break;
                case MembershipCreateStatus.InvalidPassword:
                    mesaj += "Səhv şifrə";
                    break;
                case MembershipCreateStatus.InvalidQuestion:
                    break;
                case MembershipCreateStatus.InvalidAnswer:
                    break;
                case MembershipCreateStatus.InvalidEmail:
                    mesaj += "Səhv email";
                    break;
                case MembershipCreateStatus.DuplicateUserName:
                    mesaj += "Təkrarlanan istifadəçi adı";
                    break;
                case MembershipCreateStatus.DuplicateEmail:
                    mesaj += "Təkrarlanan email";
                    break;
                case MembershipCreateStatus.UserRejected:
                    mesaj += "Rədd edilmiş istifadəçi";
                    break;
                case MembershipCreateStatus.InvalidProviderUserKey:
                    break;
                case MembershipCreateStatus.DuplicateProviderUserKey:
                    break;
                case MembershipCreateStatus.ProviderError:
                    break;
                default:
                    break;
            }
            if (hal==MembershipCreateStatus.Success)
            {
                Models.User us = new Models.User();
                us.LastName = data.LastName;
                us.FirstName = data.FirstName;
                us.Brithday = data.Brithday;
                us.Phone = data.Phone;
                us.id= db.aspnet_Users.Where(x => x.UserName == data.UserName).FirstOrDefault().UserId;
                db.Users.Add(us);
                
                db.SaveChanges();
                ms.Text = "İstifadəçi əlavə edildi";
                return View("~/Views/Shared/EditTable/TableUsers.cshtml", db.aspnet_Membership.ToList());
                
            }
            else
            {
                ms.Text = mesaj;
                return Json(ms, JsonRequestBehavior.AllowGet);
            }
            
        }
        ///Delete user
        ///
        public ActionResult DeleteUser(Guid id)
        {
            var ls = new SelectListItem();
            var user = db.Users.Where(x => x.id == id).FirstOrDefault();
            var users = db.Users.ToList();
            int countadminuser = 0;
            List<SelectListItem> roles = new List<SelectListItem>();
            foreach(var u in db.aspnet_Users.ToList())
            {
                
                foreach(var r in u.aspnet_Roles)
                {
                    if (r.RoleName != "admin")
                    {
                        continue;
                        
                    }
                    else if (r.RoleName=="admin")
                    {
                        countadminuser++;
                    }
                }
                
            }

            foreach(var roluser in user.aspnet_Membership.aspnet_Users.aspnet_Roles)
            {
                roles.Add(new SelectListItem { Text = roluser.RoleName });
            }

            if (users.Count > 1 && roles.Exists(x=>x.Text=="user"))
            {
                if (roles.Exists(x=>x.Text=="admin"))
                {
                    if (countadminuser > 1)
                    {
                        string username = db.Users.Where(x => x.id == id).FirstOrDefault().aspnet_Membership.aspnet_Users.UserName;
                        db.Users.Remove(user);
                        db.SaveChanges();

                        Membership.DeleteUser(username, true);
                        return View("Index", db.aspnet_Membership.ToList());
                    }
                    else
                    {
                        ls.Text = "Error: " + user.aspnet_Membership.aspnet_Users.UserName + " adlı istifadəçi yeganə admin olduğu üçün silinə bilməz";
                        return Json(ls, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    string username = db.Users.Where(x => x.id == id).FirstOrDefault().aspnet_Membership.aspnet_Users.UserName;
                    db.Users.Remove(user);
                    db.SaveChanges();

                    Membership.DeleteUser(username, true);
                    return View("Index", db.aspnet_Membership.ToList());
                }
            }
            else if (countadminuser>1)
            {
                
                string username = db.Users.Where(x => x.id == id).FirstOrDefault().aspnet_Membership.aspnet_Users.UserName;
                db.Users.Remove(user);
                db.SaveChanges();
                
                Membership.DeleteUser(username, true);
                return View("Index", db.aspnet_Membership.ToList());
            }
            else 
            {
                
                ls.Text ="Error: "+ user.aspnet_Membership.aspnet_Users.UserName +" adlı istifadəçi yeganə admin olduğu üçün silinə bilməz";
                return Json(ls, JsonRequestBehavior.AllowGet);
            }
            
        }
        ///View roles of user
        ///
        public JsonResult ViewUserRoles(Guid id)
        {
            var ls = new List<SelectListItem>();
            var user = db.aspnet_Users.Where(x => x.UserId == id).FirstOrDefault();
            foreach (var role in user.aspnet_Roles)
            {
                ls.Add(new SelectListItem { Text=role.RoleName});
            }
            for(int i = 0; i < 1; i++)
            {
                ls.Add(new SelectListItem { Value = user.UserName });
                break;
            }

            return Json(ls,JsonRequestBehavior.AllowGet);
        }
        ///Delete role of user
        ///
        [HttpPost]
        public ActionResult DeleteRoleUser(string username,string id)
        {
            Roles.RemoveUserFromRole(username,id);            
            return View("Index",db.aspnet_Membership.ToList());
        }
        ///Add user to role
        ///
        [HttpPost]
        public ActionResult AddUserToRole(string userName, string roleName)
        {
            Roles.AddUserToRole(userName,roleName);
            return View("Index", db.aspnet_Membership.ToList());
        }
        ///View Edit Modal User
        ///
        public JsonResult ViewEditModalUser(Guid id)
        {
            var ls = new NewUser();
            var user = db.Users.Where(x => x.id == id).FirstOrDefault();
            ls.LastName = user.LastName;
            ls.FirstName = user.FirstName;
            ls.Phone = user.Phone;
            ls.UserName = user.aspnet_Membership.aspnet_Users.UserName;
            return Json(ls,JsonRequestBehavior.AllowGet);
        }
        ///Save edited user elements
        ///
        public ActionResult SaveEditUser(NewUser data)
        {
            var user = db.Users.Where(x => x.aspnet_Membership.aspnet_Users.UserName == data.UserName).FirstOrDefault();
            user.LastName = data.LastName;
            user.FirstName = data.FirstName;
            user.Phone = data.Phone;
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();            
            return View("~/Views/Shared/EditTable/TableUsers.cshtml",db.aspnet_Membership.ToList());
        }
        ///Change user password
        ///
        public ActionResult ChangePassword(Guid id,string oldPassword,string newPassword)
        {
            var us = db.aspnet_Users.Where(x => x.UserId == id).FirstOrDefault();
            var ls = new SelectListItem();
            
            MembershipUser t = Membership.GetUser(us.UserName);
            
            
            if (t.ChangePassword(t.ResetPassword(), newPassword))
            {
                ls.Text = "Şifrə dəyişdirildi";
            }
            else
            {
                ls.Text = "Səhv,şifrə dəyişdirilmədi";
            }
            
            
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
    }
}


