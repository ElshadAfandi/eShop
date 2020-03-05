                                                                    //New Product//


//Sekil elave etmek ucun card-in sehifeye elave edilmesi
function NewCard() {
    $("#newarea").append(' <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 ">' +
    '<figure class="card card-figure">' +
        '<div class="figure">' +
            '<div class="figure-img">' +
                '<img src="/Content/Admin/Resm/card/card.png" class="img-fluid btn bagla"/>' +
            '</div>' +
            '<div class="figure-caption card-subtitle">' +
                '<input type="file" name="Images" class="img-fluid" />' +
            '</div>' +
        '</div>' +
    '</figure>' +
'</div>');
}

//Acilmis card-i uzerine kliklemekle silmekS
$(function () {
    $("#newarea").on("click", ".bagla", function () {
        $(this).parent().parent().parent().parent().remove();
    });
});

//Olculeri elave etmek ucun
function NewSizes() {
    var size = $("#NewSizes").val();
    $(".newSizeArea").append('<div style="float:left;" id="sizeremove"><input name="Sizes" id="ForClear" hidden value="' + size + '" />'+
'<span class="baglaSize btn"  style="color:white;background-color:#171717;border:1px solid #171717;'+
'border-radius:15px; padding:5px;">' + size + '</span>&nbsp;</div>');
}
//Olculeri secilmisi teme
$(function () {
    $('.newSizeArea').on('click', '.baglaSize', function () {
        $(this).parent().remove();
        //$("#ForClear").remove();
    });
});

////// Ajax.beginForm-un 
function onbegin() {
    //$(".modal").modal('show');
    $("#spinnerDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
}
function oncomplate() {
    //$(".modal").modal('hide');
    $("#spinner").remove();
}
function onfailure(data) {
    //alert('Error');
    $("#spinner").remove();
}
function onsuccess(data) {
    bootbox.alert('Tamamlandı');
    //$(".modal").modal('hide');
    $("#spinner").remove();
    $('.form').find('input:text,input:file').val('');
    $('.form').find('input[type=number]').val('0');
    $('.newSizeArea').empty();
    $('.bagla').parent().parent().parent().parent().remove();
}

//Formun sifirlanmasi
function ClearForm() {
    $('.newSizeArea').empty();
    $('.bagla').parent().parent().parent().parent().remove();
}

                                                                    //End new Product//

                                                                        //Product//

//Show size of product in modal
$(function () {
    $('#example').on('click', '.SizeButton', function () {
        var btn = $(this);
        var Id = btn.data('id');
        $.ajax({
            url: "/Admin/ShowSize",
            contentType: "application/json",
            data: { id: Id },
            success: function (datas) {
                $('#exampleModalLabel').empty();
                $('#body').empty();
                $('.modal-footer').empty();
                $('#exampleModalLabel').append('Ölçülər');
                $('#body').append('<div id="sizes"></div>')
                $.each(datas, function (i, data) {
                    if (data.Text == null) {
                        return false;
                    }
                    else {
                        $('#sizes').append('<div style="float:left;" id="child"><span style="font-weight:bold;">' + (i + 1) + '.</span>&nbsp;<span class="baglaSize btn"  style="color:white;background-color:#171717;' +
                        'border:1px solid #171717;border-radius:15px; padding:5px;">' + data.Text + '</span>&nbsp' +
                        '<a data-id="' + data.ValueImage + '" class="btn sizeremove" data-toggle="tooltip" data-original-title="Sil" data-placement="right">' +
                        '<img src="/Content/Admin/Resm/icon/delete.ico" /></a></div>');
                    }
                });
                $.each(datas, function (i, data) {
                    if (data.ValueProduct != null) {
                        $("#body").append('<input hidden id="productid" value="' + data.ValueProduct + '"/>');
                        return false;
                    }
                });
                $('#body').append('<br /><br /><p style="font-weight:bold;">Yeni ölçü əlavə et</p>');
                $('#body').append('<p><input style="width:50px; value="0"; type="number"' +
                    'id="Size" min="0";max="100";/>&nbsp;<a class="btn" onclick="NewSize()" style="font-weight:bold;">+</a></p>');
                $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
            }
        });
    });
});

//Delete size of product
$(function () {
    $('#body').on('click', '.sizeremove', function () {
        var btn = $(this);
        var sizeId = btn.data('id');
        $.ajax({
            url: "/Admin/RemoveSize",
            contentType: "application/json",
            data: { id: sizeId },
            beforeSend() {
                $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
            },
            success: function () {
                btn.parent().remove();
                $("#spinner").remove();
            }
        });
    });
});
//Add new sizes to product
function NewSize() {
    var newsize = $("#Size").val();
    var ProductId = $("#productid").val();
    $.ajax({
        url: "/Admin/AddSize",
        contentType: "application/json",
        data: { NewSize: newsize, ProductId: ProductId },
        beforeSend: function () {
            $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#sizes').append('<div style="float:left;" id="child"><span class="baglaSize btn"  style="color:white;background-color:#171717;' +
                        'border:1px solid #171717;border-radius:15px; padding:5px;">' + data.Text + '</span>&nbsp' +
                        '<a data-id="' + data.Value + '" class="btn sizeremove" data-toggle="tooltip" ' +
                        'data-original-title="Sil" data-placement="right">' +
                        '<img src="/Content/Admin/Resm/icon/delete.ico" /></a></div>');
            $('#spinner').remove();
        }
    });
}
//Show orders
$(function () {
    $('#example').on('click', '.OrderButton', function () {
        var btn = $(this);
        var productid = btn.data('id');
        $.ajax({
            url: "/Admin/ShowOrder",
            data: { id: productid },
            success: function (datas) {
                $('#exampleModalLabel').empty();
                $('#body').empty();
                $('.modal-footer').empty();
                $('#exampleModalLabel').append('Sifarişlər');
                $('#body').append('<div class="table table-responsive">' +
'<table class="table table-hover">' +
'<thead>' +
    '<tr>' +
        '<th>id</th>' +
        '<th>Soyad</th>' +
        '<th>Ad</th>' +
        '<th>Telefon</th>' +
        '<th>Email</th>' +
        '<th>Status</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody id="tableBody"></tbody></table></div>');
                $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
                $.each(datas, function (i, data) {
                    $('#tableBody').append('<tr>' +
                        '<td>' + data.id + '</td><td>' + data.LastName + '</td><td>' + data.FirstName + '</td><td>' + data.Phone + '</td>' +
                        '<td>' + data.Email + '</td><td>' + data.Status + '</td>' +
                        '</tr>');
                });
            }
        });
    });
});
//Show edit image of product modal
$(function () {
    $('#example').on('click', '#editImage', function () {
        var btn = $(this);
        var id = btn.data('id');
        $.ajax({
            url: "/Admin/ForEditImage",
            contentType: "application/json",
            data: { id: id },
            success: function (datas) {
                $('#exampleModalLabel').empty();
                $('#body').empty();
                $('.modal-footer').empty();
                $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
                $('#exampleModalLabel').append('Rəsmlər');
                $('#body').append('<div id="images"></div>');
                $.each(datas, function (i, data) {
                    if (data.Text == null) {
                        return false;
                    }
                    else {
                        $('#images').append('<div style="float:left;" id="imagesChild">' +
                        '<span style="font-weight:bold;">' + (i + 1) + '.</span>&nbsp;<a data-fancybox="gallary" href="' + data.Text + '">' +
                        '<img style="width:50px;height:50px;" src="' + data.Text + '"/></a>' +
                     '<a class="btn" data-id="' + data.ValueImage + '" id="ImageDelete"><img src="/Content/Admin/Resm/icon/delete.ico" /></a></div>');
                    }

                });
                $.each(datas, function (i, data) {
                    if (data.ValueProduct != null) {
                        $('#body').append('<input hidden value="' + data.ValueProduct + '" id="productId"/>');
                        return false;
                    }
                });
                $('#body').append('<br /><div style="clear:left;" id="addImage"><p style="font-weight:bold;">Yeni rəsm əlavə et &nbsp;(800x1200)</p></div>');
                $('#addImage').append('<input type="file" id="ImageFile"/>&nbsp;' +
                    '<a class="btn" style="font-weight:bold;font-size:20px;" onclick="addImageProduct()">+</a>');
            }
        });
    });
});
//Add image of product
function addImageProduct() {
    var productid = $('#productId').val();
    var formdata = new FormData();
    formdata.append('image', $('#ImageFile').get(0).files[0]);
    formdata.append('id', productid);
    $.ajax({
        url: "/Admin/addImageProduct/",
        type: "POST",
        processData: false,
        contentType: false,
        data: formdata,
        beforeSend() {
            $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#images').append('<div style="float:left;" id="imagesChild">' +
                        '<a data-fancybox="gallary" href="' + data.Text + '">' +
                        '<img style="width:50px;height:50px;" src="' + data.Text + '"/></a>' +
                     '<a class="btn" data-id="' + data.ValueImage + '" id="ImageDelete"><img src="/Content/Admin/Resm/icon/delete.ico" /></a></div>');
            $('#spinner').remove();
        }
    });
}
//Delete image of product
$(function () {
    $('#body').on('click', '#ImageDelete', function () {
        var btn = $(this);
        var ImageId = btn.data('id');
        $.ajax({
            url: "/Admin/DeleteImageOfProduct",
            data: { id: ImageId },
            beforeSend: function () {
                $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
            },
            success: function () {
                btn.parent().remove();
                $('#spinner').remove();
            }
        });
    });
});
//Delete product
$("#example").on("click", ".btnDeleteProduct", function () {
    var id = $(this).data("id");
    var btn = $(this);
    bootbox.confirm("Silməyə əminmisiniz?", function (result) {
        if (result) {
            $.ajax({
                type: "GET",
                url: "/Admin/DeleteProduct/" + id,
                beforeSend(){
                    $('#example').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
                },
                success: function () {
                    btn.parent().parent().remove();
                    $('#spinner').remove();
                },
                error: function () {
                    $('#spinner').remove();
                    bootbox.alert('Error');
                }
            });
        };
    });
});
// Show Edit product
$(function () {
    $('#example').on('click', '.btnEditProduct', function () {
        var btn = $(this);
        var productid = btn.data('id');
        $.ajax({
            url: "/Admin/ShowEditProduct",
            contentype: "application/json",
            data: { id: productid },
            success: function (datas) {
                $('#exampleModalLabel').empty();
                $('#body').empty();
                $('.modal-footer').empty();
                $.each(datas, function (i, data) {
                    $('#exampleModalLabel').append('' + data.ProductName + '');
                    return false;
                });
                $('#body').append('<div class="form-group"><select id="catg" class="form-control"></select></div>');
                //$.each(datas, function (i, data) {
                //    return false;
                //    $('#catg').append('<option value="' + data.CatId + '">' + data.CatName + '</option>');
                //    return false;
                //});
                $.each(datas, function (i, data) {
                    if (data.productid == null)
                        return false;
                    else {

                        $('#body').append('<input id="productid" value="' + data.productid + '" hidden/>');
                        $('#body').append('<div class="form-group"><input id="productname" value="' + data.ProductName + '" class="form-control" placeholder="Məhsulun adı"/></div>');
                        if (data.description != null)
                            $('#body').append('<div class="form-group"><input id="description" value="' + data.description + '" class="form-control" placeholder="Açıqlama"/></div>');
                        else
                            $('#body').append('<div class="form-group"><input id="description" value="" class="form-control" placeholder="Açıqlama"/></div>');

                        $('#body').append('<div class="form-group"><input id="productcode" value="' + data.productcode + '" class="form-control" placeholder="Məhsulun kodu"/></div>');
                        $('#body').append('<div class="form-group"><input id="price" value="' + data.price + '" class="form-control" placeholder="Məhsulun qiyməti"/></div>');
                        $('#body').append('<div class="form-group"><input id="manufacturer" value="' + data.manufacturer + '" class="form-control" placeholder="İstehsalçı"/></div>');
                        return false;
                    }
                });
                $.each(datas, function (i, data) {
                    if (data.CatId == null)
                        return false;
                    $('#catg').append('<option value="' + data.CatId + '">' + data.CatName + '</option>');
                });


                $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="EditProduct()">Save changes</button>');
                $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
            }
        });
    });
});
//Edit product
function EditProduct() {
    var Data = new FormData();
    Data.append("id", $('#productid').val());
    Data.append("catid", $('#catg').val());
    Data.append("ProductName", $("#productname").val());
    Data.append("description", $("#description").val());
    Data.append("productcode", $("#productcode").val());
    Data.append("manufaturer", $("#manufacturer").val())
    Data.append("price", $("#price").val());
    $.ajax({
        url: "/Admin/EditProduct/",
        type: "POST",
        processData: false,
        contentType: false,
        data: Data,
        beforeSend() {
            $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#tbody').html(data);
            $("#exampleModalProduct").modal('toggle');
        }

    });
}
//Show discount modal
$(function () {
    $('#example').on('click', '#discount', function () {
        var btn = $(this);
        var productId = btn.data('id');
        $.ajax({
            url: "/Admin/ShowDiscount/",
            data: { id: productId },
            success: function (data) {
                $('#exampleModalLabel').empty();
                $('#body').empty();
                $('.modal-footer').empty();
                $('#exampleModalLabel').append('Endirim');
                $('#body').append('<input hidden value="' + data.productid + '" id="productid" />');
                $('#body').append('<label style="font-size:14px;">Qiymət:&nbsp;<span style="font-weight:bold;">' + data.price + '</span>' +
                    '&nbsp; AZN</label><input id="price" hidden value="' + data.price + '"/>');
                $('#body').append('<br /><span style="font-weight:bold;">Endirim:</span>&nbsp;' +
                    '<span><input type="number" id="NewDiscount" style="width:75px;" value="0" min="0" max="100"/></span>&nbsp;<span>%</span>&nbsp;');
                $('#body').append('<a class="btn btn-success" onclick="calculate()">Hesabla</a>&nbsp;&nbsp;&nbsp;');
                $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="NewDiscountPrice()">Təsdiqlə</button>');
                $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
            }
        });
    });
});
//calculate discount price
function calculate() {
    var percent = $('#NewDiscount').val();
    var price = $('#price').val();
    var newprice = price - (price * percent) / 100;
    $('#discountedprice').remove();
    $('#val').remove();
    $('#body').append('<input  id="discountedprice" value="' + newprice + '" style="width:50px;" /><span id="val">AZN</span>');
}
//new discount price
function NewDiscountPrice() {
    var formdata = new FormData();
    var newPrice = $('#discountedprice').val();
    var ProductId = $('#productid').val();
    var discount = $('#NewDiscount').val();
    formdata.append("newprice", newPrice);
    formdata.append("ProductId", ProductId);
    formdata.append("discount", discount);
    $.ajax({
        url: "/Admin/NewDiscountPrice/",
        type: "POST",
        contentType: false,
        processData: false,
        data: formdata,
        beforeSend() {
            $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#tbody').html(data);
            $("#exampleModalProduct").modal('toggle');
        }
    });
}
//Show description
$(function () {
    $('#example').on('click', '.description', function () {
        var btn = $(this);
        var Id = btn.data('id');
        $.ajax({
            url: "/Admin/Showdescription/",
            data: { id: Id },
            success: function (data) {
                $('#exampleModalLabel').empty();
                $('#exampleModalLabel').append('Açıqlama &nbsp;(' + data.Value + ')');
                $('#body').empty();
                $('#body').append('<span>'+data.Text+'</span>');
            }
        });
    });
});

                                                                        //End Product//