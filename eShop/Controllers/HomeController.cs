using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using eShop.Models;
using eShop.App_Classes;
using System.Net.Mail;
using PagedList.Mvc;
using PagedList;

namespace eShop.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        // GET: Home
        eShopContext db = new eShopContext();


        ///Home page
        ///
        public ActionResult Index()
        {
            ViewBag.Category = db.categories.ToList();
            //var model = db.products.ToList();
            var model = db.products.OrderByDescending(x => x.CreatedDate).ToList();
            model = model.Take(10).ToList();
            return View(model);
        }
        ///Single product
        ///
        public ActionResult SingleProduct(Guid id)
        {
            var product = db.products.Where(x => x.id == id).FirstOrDefault();
            ViewBag.sizes = product.Sizes.Count;
            return View(product);
        }
        ///All products
        ///
        public ActionResult AllProduct(int page=1,int pagesize=4)
        {
            //pagesize bir sehifede nece dene mehsul olacagin gostermek ucun
            //var model = db.products.OrderByDescending(x => x.CreatedDate).ToList();
            List<product> products = db.products.OrderByDescending(x => x.CreatedDate).ToList();
            PagedList<product> model = new PagedList<product>(products,page,pagesize);
            return View(model);
        }
        ///Product of category
        ///
        public ActionResult ProductofCategory(int id,int page=1,int pagesize=4)
        {
            List<product> products = db.products.Where(x => x.CategoryId == id).OrderByDescending(x => x.CreatedDate).ToList();
            PagedList<product> model = new PagedList<product>(products, page, pagesize);
            var pr = db.products.Where(x => x.CategoryId == id).ToList();
            ViewBag.Category = db.categories.Find(id).CategoryName;
            return View(model);
        }
        
        ///Contact
        ///
        public ActionResult Contact()
        {
            ViewBag.Mail = db.EmailSettings.ToList();
            return View(db.Generals.ToList());
        }

        ///For order modal
        ///
        public JsonResult ForOrder(Guid id)
        {
            var list = new List<listItem>();
            var product = db.products.Where(x => x.id == id).FirstOrDefault();
            for (int i = 0; i < 1; i++)
            {
                list.Add(new listItem { ValueProduct = product.id.ToString(), Text = product.ProductName });
                break;
            }
            foreach (var sz in product.Sizes)
            {
                list.Add(new listItem { ValueImage = sz.Size1.ToString() });
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        ///order modal for single product
        ///
        [HttpPost]
        public ActionResult OrderSingle(Guid id, string size)
        {
            string repetet = "";
            var list = new List<SelectListItem>();
            var product = db.products.Where(x => x.id == id).FirstOrDefault();
            if (size != "undefined")
            {
                for (int i = 0; i < 1; i++)
                {
                    list.Add(new SelectListItem { Value = id.ToString(), Text = size.ToString() });
                    repetet = size.ToString();
                    break;
                }
                foreach (var sz in product.Sizes)
                {
                    if (repetet == sz.Size1.ToString())
                    {
                        continue;
                    }
                    list.Add(new SelectListItem { Text = sz.Size1.ToString() });
                }
            }
            else
            {
                foreach (var sz in product.Sizes)
                {
                    list.Add(new SelectListItem { Value = id.ToString(), Text = sz.Size1.ToString()});
                    repetet = sz.Size1.ToString();
                    break;
                }
                foreach (var sz in product.Sizes)
                {
                    if (sz.Size1.ToString() == repetet)
                    {
                        continue;
                    }
                    list.Add(new SelectListItem { Text=sz.Size1.ToString()});
                }
            }
            
            return Json(list, JsonRequestBehavior.AllowGet);
        
        }
        ///Order product
        ///
        [HttpPost]
        public ActionResult order(Order data)
        {
            data.status = false;
            data.OrderCreationDate = DateTime.Now;
            db.Orders.Add(data);
            db.SaveChanges();
            //
            var product = db.products.Where(x => x.id == data.ProductId).FirstOrDefault();
            //
            //
            var email = db.EmailSettings.FirstOrDefault();
            ///email
            if (email != null)
            {
                var senderEmail = new MailAddress("" + email.eMail + "", "" + email.EmailMailName + "");
                string password = email.password;
                var receiverEmail = new MailAddress(data.Email, "");
                var receiverOwnEmail = new MailAddress("" + email.eMail + "", "" + email.EmailMailName + "");
                var smtp = new SmtpClient
                {
                    Host = email.Host,
                    EnableSsl = email.EnableSsl,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Port = email.Port,
                    UseDefaultCredentials = email.UseDefaultCredentials,
                    Credentials = new System.Net.NetworkCredential(senderEmail.Address, password)
                };
                using (var mesaj = new MailMessage(senderEmail, receiverEmail)
                {
                    Subject = "" + product.ProductName + " məhsulun sifarişi",
                    Body = "" + product.ProductName + " məhsulunu " + data.OrderCreationDate + "  tarixində sifariş etmisiniz. " +
                    "Sizin sifariş kodunuz " + data.id + "-dir."
                })
                {
                    smtp.Send(mesaj);
                }

                if (data.product.DiscountedPrice == null || data.product.DiscountedPrice == data.product.Price)
                {
                    using (var ownmessage = new MailMessage(senderEmail, receiverOwnEmail)
                    {
                        Subject = "Sifariş",
                        Body = "Məhsul kodu " + product.ProductCode + " olan məhsul " + data.LastName + " " + data.FirstName + " tərəfindən sifariş verildi." +
                    "Məhsulun qiyməti " + data.product.Price.ToString("#.##") + "AZN." +
                    "Məhsulun ölçüsü " + data.size + ".Sifarişin kodu " + data.id + "-dir. Müştərinin telefon nömrəsi: " + data.Phone + ",Email ünvanı: " + data.Email + ""
                    })
                    {
                        smtp.Send(ownmessage);
                    }
                }
                else if (data.product.DiscountedPrice != null || data.product.DiscountedPrice != 0)
                {
                    using (var ownmessage = new MailMessage(senderEmail, receiverOwnEmail)
                    {
                        Subject = "Sifariş",
                        Body = "Məhsul kodu " + product.ProductCode + " olan məhsul " + data.LastName + " " + data.FirstName + " tərəfindən sifariş verildi." +
                    "Məhsulun qiyməti " + data.product.Price.ToString("#.##") + "AZN Endirilmiş qiymət " + String.Format("{0:N2}", data.product.DiscountedPrice) + " AZN." +
                    " Məhsulun ölçüsü " + data.size + ".Sifarişin kodu " + data.id + "-dir. Müştərinin telefon nömrəsi: " + data.Phone + ",Email ünvanı: " + data.Email + ""
                    })
                    {
                        smtp.Send(ownmessage);
                    }
                }

            }

            //
            else
            {
                var senderEmail = new MailAddress("ElshadStore@gmail.com", "EStore"); //adressi ve adi general table-den goturmek
                string password = "1a2s3d4f5gqwert";
                var receiverEmail = new MailAddress(data.Email, "");
                var receiverOwnEmail = new MailAddress("ElshadStore@gmail.com", "EStore");
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Port = 587,
                    UseDefaultCredentials = true,
                    Credentials = new System.Net.NetworkCredential(senderEmail.Address, password)
                };
                using (var mesaj = new MailMessage(senderEmail, receiverEmail)
                {
                    Subject = "" + product.ProductName + " məhsulun sifarişi",
                    Body = "" + product.ProductName + " məhsulunu " + data.OrderCreationDate + "  tarixində sifariş etmisiniz. " +
                    "Sizin sifariş kodunuz " + data.id + "-dir."
                })
                {
                    smtp.Send(mesaj);
                }
                if (data.product.DiscountedPrice == null || data.product.DiscountedPrice == data.product.Price)
                {
                    using (var ownmessage = new MailMessage(senderEmail, receiverOwnEmail)
                    {
                        Subject = "Sifariş",
                        Body = "Məhsul kodu " + product.ProductCode + " olan məhsul " + data.LastName + " " + data.FirstName + " tərəfindən sifariş verildi." +
                    "Məhsulun qiyməti " + data.product.Price.ToString("#.##") + "AZN." +
                    "Məhsulun ölçüsü " + data.size + ".Sifarişin kodu " + data.id + "-dir. Müştərinin telefon nömrəsi: " + data.Phone + ",Email ünvanı: " + data.Email + ""
                    })
                    {
                        smtp.Send(ownmessage);
                    }
                }
                else if (data.product.DiscountedPrice != null || data.product.DiscountedPrice != 0)
                {
                    using (var ownmessage = new MailMessage(senderEmail, receiverOwnEmail)
                    {
                        Subject = "Sifariş",
                        Body = "Məhsul kodu " + product.ProductCode + " olan məhsul " + data.LastName + " " + data.FirstName + " tərəfindən sifariş verildi." +
                    "Məhsulun qiyməti " + data.product.Price.ToString("#.##") + "AZN Endirilmiş qiymət " + String.Format("{0:N2}", data.product.DiscountedPrice) + " AZN." +
                    " Məhsulun ölçüsü " + data.size + ".Sifarişin kodu " + data.id + "-dir. Müştərinin telefon nömrəsi: " + data.Phone + ",Email ünvanı: " + data.Email + ""
                    })
                    {
                        smtp.Send(ownmessage);
                    }
                }
            }
            var list = new SelectListItem();
            list.Text = "" + data.product.ProductName + " məhsulunun sifarişi qeydə alındı.Sizinlə tezliklə əlaqə saxlanılacaq." +
            "Sizin sifariş kodunuz " + data.id + " -dir(Kod email ünvanınıza göndərildi).";
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        ///Send message
        ///
        [HttpPost]
        public ActionResult SendMessage(Message data)
        {
            Message ms = new Message();
            ms = data;
            db.Messages.Add(ms);
            db.SaveChanges();

            var email = db.EmailSettings.FirstOrDefault();
            var senderEmail = new MailAddress("" + email.eMail + "", "" + email.EmailMailName + "");
            string password = email.password;
            var receiverOwnEmail = new MailAddress("" + email.eMail + "", "" + email.EmailMailName + "");
            var smtp = new SmtpClient
            {
                Host = email.Host,
                EnableSsl = email.EnableSsl,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Port = email.Port,
                UseDefaultCredentials = email.UseDefaultCredentials,
                Credentials = new System.Net.NetworkCredential(senderEmail.Address, password)
            };
            using (var mesaj = new MailMessage(senderEmail, receiverOwnEmail)
            {
                Subject = "Şikayət və təklif("+data.Subject+")",
                Body = ""+data.Message1+" Qeyd:Bazada mesajin nömrəsi: "+ms.id+""
            })
            {
                smtp.Send(mesaj);
            }

            return RedirectToAction("Contact");
        }
    }
}

///SingalR - tetbiq etmek  ilk novbede basqa proyektin uzerinde
///Publish etmek baza ile birlikde++++

/// General table - email(as instagram name)
/// General table - MailName (as site name)
/// 


