//new category
function NewCategory() {
    //Icerikleri bosaldmaq
    $("#exampleModalLabel").empty();
    $("#body").empty();
    $(".modal-footer").remove();
    //

    ///$("#exampleModalLabel").append("");
    $("#body").append("<form id='form' enctype = 'multipart/form-data'></form>");
    $("#form").append("<label style='font-weight:bold;'><span style='color:red;'>*</span>Yeni kateqoriya</label>" +
        "<input class='form-control' name='NewCategory' id='NewCategory'>");
    $("#form").append("<label style='font-weight:bold;'>Açıqlama</label>" +
        "<textarea class='form-control' id='description'></textarea>");
    $("#form").append("<label style='font-weight:bold;'>Rəsm</label>");
    $("#form").append('<br /><span style="font-weight:bold;">800x1200</span> <input type=file id="image" data-toggle="tooltip" data-placement="bottom" data-original-title="800x1200"/>');
    $("#form").append('<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>' +
        '<button type="button" onclick="AddCategory()" class="btn btn-primary">Təsdiqlə</button>' +
        '</div>');

}
//add new category
function AddCategory() {
    var CatName = $("#NewCategory").val();
    var des = $("#description").val();
    var formdata = new FormData();
    formdata.append('image', $("#image").get(0).files[0]);
    formdata.append("catg", CatName);
    formdata.append("desc", des);
    $.ajax({
        url: "/Admin/AddCategory/",
        type: "POST",
        processData: false,
        contentType: false,
        //dataType: "json",
        data: formdata,
        beforeSend() {
            $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#tbody").html(data);
            bootbox.alert('Kateqoriya elave edildi...');
            $("#exampleModalProduct").modal('toggle');
        },
        complate: function () {
            $("#spinner").remove();
        },
        error: function () {
            bootbox.alert('ERROR!!!')
        }
    });
}
//show edit category
$(function () {
    $("#example").on('click', '.btnEdit', function () {
        var btn = $(this);
        var Id = btn.data("id");
        $.ajax({
            url: "/Admin/CategoryEdit",
            contentType: "application/json",
            data: { id: Id },
            success: function (data) {
                //Icerikleri bosaldmaq
                $("#exampleModalLabel").empty();
                $("#body").empty();
                $(".modal-footer").remove();
                //
                $("#body").append("<form id='form'></form>");
                $("#form").append("<input id='id' value='"+data.id+"' hidden/>");
                $("#form").append("<label style='font-weight:bold;'>Kateqoriya</label>" +
                    "<input class='form-control' name='NewCategory' id='CategoryName' value='"+data.Name+"'>");
                $("#form").append("<label style='font-weight:bold;'>Açıqlama</label>" +
                    "<textarea class='form-control' value='"+data.des+"' id='description'>"+data.des+"</textarea>");
                $("#form").append('<div class="modal-footer">' +
                    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>' +
                    '<button type="button" onclick="EditCategory()" class="btn btn-primary">Təsdiqlə</button>' +
                    '</div>');
            }
        });
    });
});
// edit category
function EditCategory() {
    var Id = $("#id").val();
    var name = $("#CategoryName").val();
    var desc = $("#description").val();
    $.ajax({
        url: "/Admin/CategoryEditResult/",
        //contentType: "application/json",
        data: { id: Id, Name: name, description: desc },
        beforeSend() {
            $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#tbody").html(data);
            //bootbox.alert(data);
            $("#exampleModalProduct").modal("toggle");
        },
        complate: function () {
            $("#spinner").remove();
        }
    });
}
//show image of category
$(function () {
    $("#example").on("click", "#imgUpdate", function () {
        var btn = $(this);
        var Id = btn.data("id");
        $.ajax({
            url: "/Admin/ImageShow/",
            data: { id: Id },
            success: function (data) {
                //Icerikleri bosaldmaq
                $("#exampleModalLabel").empty();
                $("#body").empty();
                $(".modal-footer").remove();
                //
                $("#body").append("<form id='form'></form>");
                $("#form").append("<input id='id' value='" + data.Value + "' hidden/>");
                $("#form").append("<div class='card card-figure'>"+
                    "<figure class='figure'>"+
                    "<div class='figure-attachment'>"+
                    "<img src='/Content/Admin/Resm/card/card.png' class='img-fluid'></div>" +
                    "<figcaption class='figure-caption'><ul class='list-inline d-flex text-muted mb-0'>"+
                    "<li class='list-inline-item text-truncate mr-auto'><span><i class='fas fa-download '></i></span> Image upload </li>" +
                    "<li class='list-inline-item'><input type='file' id='image'/>"+
                    "</li></ul></figcaption></figure></div>");
                
                $("#form").append('<div class="modal-footer">' +
                    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>' +
                    '<button type="button" onclick="EditImage()" class="btn btn-primary">Təsdiqlə</button>' +
                    '</div>');
            }
        });
    });
});
//Edit image of category
function EditImage() {
    var formdata = new FormData();
    var Id = $("#id").val();
    //alert(Id);
    formdata.append('image', $("#image").get(0).files[0]);
    formdata.append('id', Id);
    $.ajax({
        url: "/Admin/EditImage",
        data: formdata,
        contentType: false,
        processData: false,
        type: "POST",
        beforeSend() {
            $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            
            $("#tbody").html(data);
            $("#exampleModalProduct").modal('toggle');
        },
        complate: function () {
            $("#spinner").remove();
        }
    });
}
//

$('[data-toggle="tooltip"]').tooltip();

