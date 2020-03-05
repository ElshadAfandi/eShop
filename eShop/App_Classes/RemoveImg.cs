using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eShop.App_Classes
{
    public class RemoveImg
    {
        public void delete(string path)
        {
            //System.IO.File.Delete(path);
            System.IO.File.Delete(@"E:\C#_Web\eShop\eShop\" + path);
        }
    }
}