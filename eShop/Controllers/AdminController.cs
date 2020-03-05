using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using eShop.Models;
using System.Configuration;
using System.Drawing;
using System.IO;
using eShop.App_Classes;
using System.Data.Entity;
using System.Threading;

namespace eShop.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        RemoveImg delimage = new RemoveImg();
        infoRequest infoRequest = new infoRequest();

        eShopContext db = new eShopContext();
        /// Admin panel umumi
        /// 
        public ActionResult Index()
        {
            bool movcudWp = false;
            bool movcudIns = false;
            bool movcudFb = false;
            bool movcudAd = false;
            bool movcudPh = false;
            bool movcudFt = false;
            bool movcudGm = false;
            bool movcudM = false;
            bool movcudSn = false;

            //whatsapp control
            foreach (var wp in db.Generals.ToList())
            {
                if (wp.wpLink == null)
                {
                    movcudWp = false;
                    continue;
                }
                else if (wp.wpLink != null)
                {
                    movcudWp = true;
                    break;
                }               
            }
            //End whatsapp control
            //Instagram control
            foreach (var ins in db.Generals.ToList())
            {
                if (ins.insLink == null)
                {
                    movcudIns = false;
                    continue;
                }
                else if (ins.insLink != null)
                {
                    movcudIns = true;
                    break;
                }
            }
            //End Instagram control
            //Facebook control
            foreach (var fb in db.Generals.ToList())
            {
                if (fb.fbLink == null)
                {
                    movcudFb = false;
                    continue;
                }
                else if (fb.fbLink != null)
                {
                    movcudFb = true;
                    break;
                }
            }
            //End facebook control
            //Address control
            foreach (var ad in db.Generals.ToList())
            {
                if (ad.address == null)
                {
                    movcudAd = false;
                    continue;
                }
                else if (ad.address != null)
                {
                    movcudAd = true;
                    break;
                }
            }
            //End address control
            //Phone control
            foreach (var ph in db.Generals.ToList())
            {
                if (ph.Phone == null)
                {
                    movcudPh = false;
                    continue;
                }
                else if (ph.Phone != null)
                {
                    movcudPh = true;
                    break;
                }
            }
            //End phone control
            //Footer-text control
            foreach (var ft in db.Generals.ToList())
            {
                if (ft.FooterText == null)
                {
                    movcudFt = false;
                    continue;
                }
                else if (ft.FooterText != null)
                {
                    movcudFt = true;
                    break;
                }
            }
            //End footer-text control
            //Google map control map
            foreach (var gm in db.Generals.ToList())
            {
                if (gm.mapApiKey == null)
                {
                    movcudGm = false;
                    continue;
                }
                else if (gm.mapApiKey != null)
                {
                    movcudGm = true;
                    break;
                }
            }
            //End google map control
            //Email setting control
            foreach (var em in db.EmailSettings.ToList())
            {
                if (em.eMail == null)
                {
                    movcudM = false;
                    continue;
                }
                else if (em.eMail != null)
                {
                    movcudM = true;
                    break;
                }
            }
            //End email setting control
            //Site name control
            foreach (var sn in db.Generals.ToList())
            {
                if (sn.MailName == null)
                {
                    movcudSn = false;
                    continue;
                }
                else if (sn.MailName != null)
                {
                    movcudSn = true;
                    break;
                }
            }
            //End site name control

            ViewBag.movcudWp = movcudWp;
            ViewBag.movcudIns = movcudIns;
            ViewBag.movcudFb = movcudFb;
            ViewBag.movcudAd = movcudAd;
            ViewBag.movcudPh = movcudPh;
            ViewBag.movcudFt = movcudFt;
            ViewBag.movcudGm = movcudGm;
            ViewBag.movcudM = movcudM;
            ViewBag.EmailSet = db.EmailSettings.ToList();
            ViewBag.movcudSn = movcudSn;

            return View(db.Generals.ToList());
        }
        /// For view categorys in the table
        /// 
        public ActionResult Category()
        {
            return View(db.categories.ToList());
        }
        ///New Category 
        ///
        [HttpPost]
        public ActionResult AddCategory(string catg, string desc, HttpPostedFileBase image)
        {
            //Yeni kateqoriyani elave etmek
            category Category = new category();
            Category.CategoryName = catg;
            Category.description = desc;
            db.categories.Add(Category);
            db.SaveChanges();
            //
            //Resm-i yerlesdirmek
            //int CategoryWidth = Convert.ToInt32(ConfigurationManager.AppSettings["CategoryWidth"].ToString()); //800
            //int CategoryHeight = Convert.ToInt32(ConfigurationManager.AppSettings["CategoryHeight"].ToString()); //1200
            eShop.Models.Image img = new Models.Image();
            System.Drawing.Image CategoryImage = System.Drawing.Image.FromStream(image.InputStream);
            string name = Guid.NewGuid() + Path.GetExtension(image.FileName);
            //Bitmap catimg = new Bitmap(CategoryWidth,CategoryHeight);

            string path = "/Content/e-commerce/minishop/image/category/" + name;
            Bitmap catimg = new Bitmap(CategoryImage);
            catimg.Save(Server.MapPath(path)); //Resmi papkada yaddasa vermek
            img.CategoryId = Category.id;
            img.category = Category;
            img.CategoryImage = path;
            db.Images.Add(img);
            db.SaveChanges();
            //
            return View("~/Views/Shared/EditTable/TableCategory.cshtml", db.categories.ToList());
        }

        ///Kateqoriyanin silinmesi
        ///
        public ActionResult CategoryDelete(int id)
        {
            var Cat = db.categories.Where(x => x.id == id).Include(p => p.Images).Include(p => p.products).FirstOrDefault();
            var pr = db.products.Where(x => x.CategoryId == id).Include(p => p.Images).Include(p => p.Orders).Include(p => p.Sizes).ToList();
            
            category Category = new category();
            Category = Cat;

            if (pr != null)
            {
                foreach (var p in pr.ToList())
                {
                    foreach (var imgPr in p.Images.ToList())
                    {
                        delimage.delete(imgPr.ProductImage);
                        db.Images.Remove(imgPr);
                        db.SaveChanges();
                    }

                }
                
            }
            
            
            foreach(var img in Cat.Images.ToList())
            {
                delimage.delete(img.CategoryImage);
                db.categories.Remove(Category).Images.Remove(img);
                db.Images.Remove(img);
            }
            
            db.SaveChanges();
            
            return View("Category",db.categories.ToList());
        }
        ///Category edit
        ///
        public JsonResult CategoryEdit(int id)
        {
            var Category = db.categories.Where(x => x.id == id).FirstOrDefault();
            return Json(new { id=Category.id,Name=Category.CategoryName,des=Category.description},JsonRequestBehavior.AllowGet);
        }
        ///Category edit result
        ///
        public ActionResult CategoryEditResult(int id, string Name, string description)
        {
            var UpdatedCategory = db.categories.Where(x => x.id == id).FirstOrDefault();
            UpdatedCategory.CategoryName = Name;
            if (description != "")
                UpdatedCategory.description = description;
            category Category = new category();
            Category = UpdatedCategory;
            db.Entry(Category).State = EntityState.Modified;
            db.SaveChanges();
            return View("~/Views/Shared/EditTable/TableCategory.cshtml",db.categories.ToList());
        }
        ///For Image show in the modal
        ///
        public JsonResult ImageShow(int id)
        {
            var img = db.Images.Where(x => x.id == id).FirstOrDefault();
            
            SelectListItem model = new SelectListItem() { Text = img.CategoryImage, Value = img.id.ToString() };
            return Json(model,JsonRequestBehavior.AllowGet);
        }
        ///Edit image
        ///
        [HttpPost]
        public ActionResult EditImage(int id,HttpPostedFileBase image)
        {
            var sekil = db.Images.Where(x => x.id == id).FirstOrDefault();
            //
            eShop.Models.Image img = new Models.Image();
            System.Drawing.Image CategoryImage = System.Drawing.Image.FromStream(image.InputStream);
            string name = Guid.NewGuid() + Path.GetExtension(image.FileName);

            string path = "/Content/e-commerce/minishop/image/category/" + name;
            Bitmap catimg = new Bitmap(CategoryImage);
            catimg.Save(Server.MapPath(path)); //Resmi papkada yaddasa vermek
            delimage.delete(sekil.CategoryImage);
            sekil.CategoryImage = path;
            Models.Image im = new Models.Image();
            im = sekil;
            db.Entry(im).State = EntityState.Modified;
            db.SaveChanges();
            //
            return View("~/Views/Shared/EditTable/TableCategory.cshtml", db.categories.ToList());
        }
        ///Product
        ///
        public ActionResult Product()
        {
            var model = db.products.OrderByDescending(x => x.CreatedDate).ToList();
            return View(model);
        }
        ///New product
        ///
        public ActionResult NewProduct()
        {
            ViewBag.categories = db.categories.ToList();

            product model = new product();
            return View(model);
        }
        [HttpPost]
        public ActionResult NewProduct(product pr, HttpPostedFileBase[] Images, int[] Sizes)
        {
            try
            {
                //New product
                product newproduct = new product();
                pr.CreatedDate = DateTime.Now;
                pr.id = Guid.NewGuid();
                newproduct = pr;
                db.products.Add(newproduct);
                db.SaveChanges();
                //
                //New sizes

                eShop.Models.Size newsize = new Models.Size();
                foreach (var sz in Sizes)
                {
                    newsize.ProductId = newproduct.id;
                    newsize.Size1 = sz;
                    db.Sizes.Add(newsize);
                    db.SaveChanges();
                }

                //
                //New product images
                
                eShop.Models.Image img = new Models.Image();
                foreach (var im in Images)
                {
                    System.Drawing.Image ProductImage = System.Drawing.Image.FromStream(im.InputStream);
                    string name = Guid.NewGuid() + Path.GetExtension(im.FileName);
                    string path = "/Content/e-commerce/minishop/image/product/" + name;
                    Bitmap primg = new Bitmap(ProductImage);
                    primg.Save(Server.MapPath(path));
                    img.ProductId = newproduct.id;
                    img.ProductImage = path;
                    db.Images.Add(img);
                    db.SaveChanges();

                }
                //
                infoRequest.Info = "" + newproduct.ProductName + " adlı məhsul əlavə olundu";
                infoRequest.UrlText = "Məhsul siyahısına qayıt";
                infoRequest.Url = "/Admin/Product/";
                infoRequest.Status = true;

            }
            catch (Exception)
            {
                infoRequest.Info = "Məlumatlar düzgün daxil edilməyib";
                //infoRequest.Info = ex.Message;
                infoRequest.UrlText = "Məhsul siyahısına qayıt";
                infoRequest.Url = "/Admin/Product/";
                infoRequest.Status = false;
            }
            ////
            
            return View("~/Views/Shared_Admin/_InfoRequest.cshtml",infoRequest);
        }

        ///For show size product
        ///
        public JsonResult ShowSize(Guid id)
        {
            var list = new List<listItem>();
            var Sizes = db.Sizes.Where(x => x.ProductId == id).ToList();
            foreach(var sz in Sizes)
            {
                list.Add(new listItem { Text = sz.Size1.ToString(), ValueImage = sz.id.ToString()});
            }
            list.Add(new listItem { ValueProduct = id.ToString() });
            
            return Json(list,JsonRequestBehavior.AllowGet);
        }
        ///Size delete
        ///
        public ActionResult RemoveSize(int id)
        {
            var size = db.Sizes.Where(x => x.id == id).FirstOrDefault();
            db.Sizes.Remove(size);
            db.SaveChanges();
            return View("Product", db.products.ToList());
        }

        ///Add size
        ///
        public JsonResult AddSize(int NewSize,Guid ProductId) 
        {
            var list = new SelectListItem();
            Models.Size sz = new Models.Size();
            var pr = db.products.Where(x => x.id == ProductId).FirstOrDefault();
            sz.Size1 = NewSize;
            sz.ProductId = ProductId;
            sz.product = pr;
            db.Sizes.Add(sz);
            db.SaveChanges();
            list.Text = sz.Size1.ToString();
            list.Value = sz.id.ToString();
            return Json(list,JsonRequestBehavior.AllowGet);
        }
        ///Show order
        ///
        public JsonResult ShowOrder(Guid id)
        {
            var orders = db.Orders.Where(x => x.ProductId == id).ToList();
            var list = new List<ModalOrderList>();
            string status = "";
            foreach (var or in orders)
            {
                if (or.status == false)
                    status = "Yerinə yetirilməyib";
                else
                    status = "Yerinə yetirilib";
                list.Add(new ModalOrderList { id=or.id,LastName=or.LastName,FirstName=or.FirstName,Phone=or.Phone,Email=or.Email,Status=status});
            }
            return Json(list,JsonRequestBehavior.AllowGet);
        }
        ///Edit image show
        ///
        public JsonResult ForEditImage(Guid id)
        {
            var images = db.Images.Where(x => x.ProductId == id).ToList();
            //var product = db.products.Where(x => x.id == id).FirstOrDefault();
            var list = new List<listItem>();
            foreach (var im in images)
            {
                list.Add(new listItem {  ValueImage = im.id.ToString(), Text = im.ProductImage });
            }
            list.Add(new listItem { ValueProduct = id.ToString() });
            return Json(list,JsonRequestBehavior.AllowGet);
        }
        ///Delete image of product
        ///
        public ActionResult DeleteImageOfProduct(int id)
        {
            var Image = db.Images.Where(x => x.id == id).FirstOrDefault();
            string path = Image.ProductImage;
            db.Images.Remove(Image);
            db.SaveChanges();
            delimage.delete(path);
            return View("Product", db.products.ToList());
        }
        ///Add image of product
        ///
        [HttpPost]
        public ActionResult addImageProduct(string id, HttpPostedFileBase image)
        {
            Guid Id = new Guid(id);
            var product = db.products.Where(x => x.id == Id).FirstOrDefault();
            Models.Image img = new Models.Image();
            var list = new listItem();

            System.Drawing.Image im = System.Drawing.Image.FromStream(image.InputStream);
            //"/Content/e-commerce/minishop/image/product/" + name;
            string name = "/Content/e-commerce/minishop/image/product/";
            string path = name + Guid.NewGuid() + Path.GetExtension(image.FileName);
            Bitmap imageofprod = new Bitmap(im);
            imageofprod.Save(Server.MapPath(path));

            img.ProductImage = path;
            img.ProductId = product.id;
            img.product = product;
            db.Images.Add(img);
            db.SaveChanges();

            list.ValueImage = img.id.ToString();
            list.Text = img.ProductImage;            
            
            return Json(list,JsonRequestBehavior.AllowGet);
        }
        ///Delete prodtuct
        ///
        public ActionResult DeleteProduct(Guid id)
        {
            var product = db.products.Where(x => x.id == id).Include(i => i.Sizes).Include(i => i.Orders).Include(i => i.Images).FirstOrDefault();
            var img = db.Images.Where(x => x.ProductId == id).ToList();
            db.products.Remove(product); 
            db.SaveChanges();
            foreach (var impath in img)
            {
                delimage.delete(impath.ProductImage);
                db.Images.Remove(impath);
                db.SaveChanges();
            }
            return View("product",db.products.ToList());
        }
        ///Show edit product
        ///
        public JsonResult ShowEditProduct(Guid id)
        {
            var product = db.products.Where(x => x.id == id).FirstOrDefault();
            var categories = db.categories.ToList();
            var list = new List<ForEditProduct>();
            for(int i = 0; i < 1; i++)
            {
                list.Add(new ForEditProduct { CatId=product.CategoryId,CatName=product.category.CategoryName,description=product.Description, manufacturer=
                    product.Manufacturer,productcode=product.ProductCode,productid=product.id,ProductName=product.ProductName,price=product.Price});
                break;
            }
            foreach(var catg in categories)
            {   
                list.Add(new ForEditProduct { CatId=catg.id,CatName=catg.CategoryName});
            }

            return Json(list,JsonRequestBehavior.AllowGet);
        }
        //Edit product
        [HttpPost]
        public ActionResult EditProduct(Guid id,int catid,string ProductName,string description,string productcode,string manufaturer,decimal price)
        {
            var Product = db.products.Where(x => x.id == id).FirstOrDefault();
            var category = db.categories.Where(x => x.id == Product.CategoryId).FirstOrDefault();
            Product.CategoryId = catid;
            Product.category = category;
            Product.ProductName = ProductName;
            if (description != null)
            {
                Product.Description = description;
            }
            Product.ProductCode = productcode;
            Product.Manufacturer = manufaturer;
            Product.Price = price;
            product model = new product();
            model = Product;
            db.Entry(model).State = EntityState.Modified;
            db.SaveChanges();
            return View("~/Views/Shared/EditTable/TableProduct.cshtml",db.products.ToList());
        }
        //Show Discount modal
        public JsonResult ShowDiscount(Guid id)
        {
            var list = new ForEditProduct();
            var product = db.products.Where(x => x.id == id).FirstOrDefault();
            list.price = product.Price;
            list.productid = product.id;
            return Json(list,JsonRequestBehavior.AllowGet);
        }
        ///New discount price
        ///
        [HttpPost]
        public ActionResult NewDiscountPrice(decimal newprice,Guid ProductId,int discount)
        {
            var product = db.products.Where(x => x.id == ProductId).FirstOrDefault();
            product.Discount = Convert.ToInt16(discount);
            product.DiscountedPrice = newprice;
            Models.product model = new product();
            model = product;
            db.Entry(model).State = EntityState.Modified;
            db.SaveChanges();
            return View("~/Views/Shared/EditTable/TableProduct.cshtml", db.products.ToList());
        }
        ///Show description 
        ///
        public JsonResult Showdescription(Guid id)
        {
            var list = new SelectListItem();
            var product = db.products.Where(x => x.id == id).FirstOrDefault();
            list = new SelectListItem { Value=product.ProductName,Text=product.Description};
            return Json(list,JsonRequestBehavior.AllowGet);
        }
        ///Orders
        ///
        public ActionResult Order()
        {
            var model = db.Orders.OrderByDescending(x => x.OrderCreationDate).ToList();
            return View(model);
        }
        ///Open modal for Order edit
        ///
        public JsonResult ShowOrderEditM(int id)
        {
            var ls = new ModalOrderList();
            var order = db.Orders.Where(x => x.id == id).FirstOrDefault();
            ls.id = order.id;
            ls.Phone = order.Phone;
            ls.ProductCode = order.product.ProductCode;
            ls.Size = order.size;
            return Json(ls,JsonRequestBehavior.AllowGet);
        }
        ///Save edited order
        ///
        public ActionResult SaveEditedOrder(ModalOrderList data)
        {
            Models.Order or = new Models.Order();
            var ord = db.Orders.Where(x => x.id == data.id).FirstOrDefault();
            ord.Phone = data.Phone;
            ord.product.ProductCode = data.ProductCode;
            ord.size = data.Size;

            or = ord;
            db.Entry(or).State = EntityState.Modified;
            db.SaveChanges();
            var model = db.Orders.OrderByDescending(x => x.OrderCreationDate).ToList();
            return View("~/Views/Shared/EditTable/TableOrder.cshtml",model);
        }
        ///Delete order
        ///
        public ActionResult DeleteOrder(int id)
        {
            var deletedOrder = db.Orders.Where(x => x.id == id).FirstOrDefault();
            db.Orders.Remove(deletedOrder);
            db.SaveChanges();
            var model = db.Orders.OrderByDescending(x => x.id).ToList();
            return View("Order",model);
        }
        ///Confirmation Order
        ///
        public ActionResult ConfirmationOrder(int id)
        {
            var order = db.Orders.Where(x => x.id == id).FirstOrDefault();
            order.status = true;
            db.SaveChanges();
            var model = db.Orders.OrderByDescending(x => x.OrderCreationDate).ToList();
            return View("~/Views/Shared/EditTable/TableOrder.cshtml", model);
        }
        ///Show modal for edit background image
        ///
        public JsonResult ImageOpenModal(int id)
        {
            var ls = new SelectListItem();
            var bgIm = db.Generals.Where(x => x.id == id).FirstOrDefault();
            ls.Value = bgIm.id.ToString();
            return Json(ls,JsonRequestBehavior.AllowGet);
        }
        ///Edit background image
        ///
        [HttpPost]
        public ActionResult EditBgImage(int id,HttpPostedFileBase bgImage)
        {
            var bgim = db.Generals.Where(x => x.id == id).FirstOrDefault();
            if(bgim!=null)
                delimage.delete(bgim.bgImage);


            General model = new General();
            
            

            System.Drawing.Image img = System.Drawing.Image.FromStream(bgImage.InputStream);
            string name = "/Content/e-commerce/minishop/image/BgImage/";
            string path = name + Guid.NewGuid() + Path.GetExtension(bgImage.FileName);

            //model.bgImage = path;
            bgim.bgImage = path;

            db.SaveChanges();


            Bitmap imageOfBgIm = new Bitmap(img);
            imageOfBgIm.Save(Server.MapPath(path));

            var ls = new SelectListItem();
            ls.Text = path;

            return Json(ls,JsonRequestBehavior.AllowGet);
        }
        ///Look facebook link
        ///
        public JsonResult LookFb(int id)
        {
            var ls = new SelectListItem();
            ls.Text = db.Generals.Where(x => x.id == id).FirstOrDefault().fbLink;
            return Json(ls,JsonRequestBehavior.AllowGet);
        }
        ///Edit facebook link
        ///
        [HttpPost]
        public ActionResult EditFbLink(int id,string newlink)
        {
            var fb = db.Generals.Where(x => x.id == id).FirstOrDefault();
            fb.fbLink = newlink;
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///Delete facebook link
        ///
        public ActionResult DeleteFb(int id)
        {
            var fblink = db.Generals.Where(x => x.id == id).FirstOrDefault();
            db.Generals.Remove(fblink);
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///New facobook link
        ///
        public JsonResult NewFbLink(string link)
        {
            General model = new General();
            model.fbLink = link;
            db.Generals.Add(model);
            db.SaveChanges();
            var ls = new SelectListItem();
            ls.Value = model.id.ToString();
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Look whatsapp link
        ///
        public JsonResult LookWp(int id)
        {
            var ls = new SelectListItem();
            ls.Text = db.Generals.Where(x => x.id == id).FirstOrDefault().wpLink;
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Edit whatsapp link
        ///
        [HttpPost]
        public ActionResult EditWpLink(int id, string newlink)
        {
            var wp = db.Generals.Where(x => x.id == id).FirstOrDefault();
            wp.wpLink = newlink;
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///Delete whatsapp link
        ///
        public ActionResult DeleteWp(int id)
        {
            var wplink = db.Generals.Where(x => x.id == id).FirstOrDefault();
            db.Generals.Remove(wplink);
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///New whatsapp link
        ///
        public JsonResult NewWpLink(string link)
        {
            General model = new General();
            model.wpLink = link;
            db.Generals.Add(model);
            db.SaveChanges();
            var ls = new SelectListItem();
            ls.Value = model.id.ToString();
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Look address
        ///
        public JsonResult LookAd(int id)
        {
            var ls = new SelectListItem();
            ls.Text = db.Generals.Where(x => x.id == id).FirstOrDefault().address;
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Edit address
        ///
        [HttpPost]
        public ActionResult EditAd(int id, string newlink)
        {
            var ad = db.Generals.Where(x => x.id == id).FirstOrDefault();
            ad.address = newlink;
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///Delete address
        ///
        public ActionResult DeleteAd(int id)
        {
            var address = db.Generals.Where(x => x.id == id).FirstOrDefault();
            db.Generals.Remove(address);
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///New address
        ///
        public JsonResult NewAd(string link)
        {
            General model = new General();
            model.address = link;
            db.Generals.Add(model);
            db.SaveChanges();
            var ls = new SelectListItem();
            ls.Value = model.id.ToString();
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Look phone
        ///
        public JsonResult LookPh(int id)
        {
            var ls = new SelectListItem();
            ls.Text = db.Generals.Where(x => x.id == id).FirstOrDefault().Phone;
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Edit phone
        ///
        [HttpPost]
        public ActionResult EditPh(int id, string newlink)
        {
            var ph = db.Generals.Where(x => x.id == id).FirstOrDefault();
            ph.Phone = newlink;
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///Delete phone
        ///
        public ActionResult DeletePh(int id)
        {
            var phone = db.Generals.Where(x => x.id == id).FirstOrDefault();
            db.Generals.Remove(phone);
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///New phone
        ///
        public JsonResult NewPh(string link)
        {
            General model = new General();
            model.Phone = link;
            db.Generals.Add(model);
            db.SaveChanges();
            var ls = new SelectListItem();
            ls.Value = model.id.ToString();
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Look footer-text
        ///
        public JsonResult LookFt(int id)
        {
            var ls = new SelectListItem();
            ls.Text = db.Generals.Where(x => x.id == id).FirstOrDefault().FooterText;
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Edit footer-text
        ///
        [HttpPost]
        public ActionResult EditFt(int id, string newlink)
        {
            var ft = db.Generals.Where(x => x.id == id).FirstOrDefault();
            ft.FooterText = newlink;
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///Delete footer-text
        ///
        public ActionResult DeleteFT(int id)
        {
            var footertext = db.Generals.Where(x => x.id == id).FirstOrDefault();
            db.Generals.Remove(footertext);
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///New footer-text
        ///
        public JsonResult NewFt(string link)
        {
            General model = new General();
            model.FooterText = link;
            db.Generals.Add(model);
            db.SaveChanges();
            var ls = new SelectListItem();
            ls.Value = model.id.ToString();
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Edit google map
        ///
        [HttpPost]
        public ActionResult EditGm(int id, string newlink)
        {
            var gm = db.Generals.Where(x => x.id == id).FirstOrDefault();
            gm.mapApiKey = newlink;
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///Delete google map
        ///
        public ActionResult DeleteGm(int id)
        {
            var googlemap = db.Generals.Where(x => x.id == id).FirstOrDefault();
            db.Generals.Remove(googlemap);
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///New google map
        ///
        public JsonResult NewGm(string link)
        {
            General model = new General();
            model.mapApiKey = link;
            db.Generals.Add(model);
            db.SaveChanges();
            var ls = new SelectListItem();
            ls.Value = model.id.ToString();
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Look instagram
        ///
        public JsonResult LookIns(int id)
        {
            var ls = new SelectListItem();
            var instagram = db.Generals.Where(x => x.id == id).FirstOrDefault();
            ls.Text = instagram.insLink;
            ls.Value = instagram.eMail;
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Edit instagram
        ///
        [HttpPost]
        public ActionResult EditIns(int id, string newlink,string newname)
        {
            var ins = db.Generals.Where(x => x.id == id).FirstOrDefault();
            ins.insLink = newlink;
            ins.eMail = newname;
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///Delete Instagram
        ///
        public ActionResult DeleteIns(int id)
        {
            var instagram = db.Generals.Where(x => x.id == id).FirstOrDefault();
            db.Generals.Remove(instagram);
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///New instagram
        ///
        public JsonResult NewIns(string link,string name)
        {
            General model = new General();
            model.insLink = link;
            model.eMail = name;
            db.Generals.Add(model);
            db.SaveChanges();
            var ls = new SelectListItem();
            ls.Value = model.id.ToString();
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///View email settings and open modal for email settings
        ///
        public JsonResult LookM(int id)
        {
            var emls = new EmailSettings();
            var em = db.EmailSettings.Where(x => x.id == id).FirstOrDefault();
            emls.id = em.id;
            emls.eMail = em.eMail;
            emls.Password = em.password;
            emls.EmailMailName = em.EmailMailName;
            emls.Host = em.Host;
            emls.Port = em.Port;
            emls.EnableSsl = em.EnableSsl;
            emls.UseDefaultCredentials = em.UseDefaultCredentials;
            return Json(emls,JsonRequestBehavior.AllowGet);
        }        
        ///Save edited mail
        ///
        [HttpPost]
        public ActionResult EditedMail(EmailSetting data)
        {
            EmailSetting model = new EmailSetting();
            model = data;
            db.Entry(model).State = EntityState.Modified;
            db.SaveChanges();
            return View("Index",db.Generals.ToList());
        }
        ///Delete mail
        ///
        public ActionResult DeleteM(int id)
        {
            var email = db.EmailSettings.Where(x => x.id == id).FirstOrDefault();
            db.EmailSettings.Remove(email);
            db.SaveChanges();
            return View("Index",db.Generals.ToList());
        }
        ///New mail
        ///
        public ActionResult NewMail(EmailSetting data)
        {
            EmailSetting model = new EmailSetting();
            var ls = new SelectListItem();
            model = data;
            db.EmailSettings.Add(model);
            db.SaveChanges();
            ls.Value = model.id.ToString();
            return Json(ls,JsonRequestBehavior.AllowGet);
        }
        ///Look site name
        ///
        public JsonResult LookSn(int id)
        {
            var ls = new SelectListItem();
            ls.Text = db.Generals.Where(x => x.id == id).FirstOrDefault().MailName;
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Edit site name
        ///
        [HttpPost]
        public ActionResult EditSiteName(int id, string newlink)
        {
            var sn = db.Generals.Where(x => x.id == id).FirstOrDefault();
            sn.MailName = newlink;
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///Delete site name
        ///
        public ActionResult DeleteSn(int id)
        {
            var sn= db.Generals.Where(x => x.id == id).FirstOrDefault();
            db.Generals.Remove(sn);
            db.SaveChanges();
            return View("Index", db.Generals.ToList());
        }
        ///New site name
        ///
        public JsonResult NewSiteName(string link)
        {
            General model = new General();
            model.MailName = link;
            db.Generals.Add(model);
            db.SaveChanges();
            var ls = new SelectListItem();
            ls.Value = model.id.ToString();
            return Json(ls, JsonRequestBehavior.AllowGet);
        }
        ///Messages view
        ///
        public ActionResult Message()
        {
            return View(db.Messages.OrderByDescending(x=>x.id).ToList());
        }
        ///View message text
        ///
        public JsonResult ViewMessage(int id)
        {
            var ls = new SelectListItem();
            var message = db.Messages.Find(id);
            ls.Value = message.Subject;
            ls.Text = message.Message1;
            return Json(ls,JsonRequestBehavior.AllowGet);
        }
        ///Delete message
        ///
        public ActionResult DeleteMessage(int id)
        {
            var message = db.Messages.Find(id);
            db.Messages.Remove(message);
            db.SaveChanges();
            return View("Message",db.Messages.OrderByDescending(x=>x.id).ToList());
        }
    }
}



/// General table - email(as instagram name)
/// General table - MailName (as site name)




