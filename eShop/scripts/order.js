//Datatable for order
$(function () {
    //DataTable
    $("#exampleOrder").dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Azerbaijan.json"
        },
        "order": [[ 6, "desc" ]],
        responsive: true
    });   
});
//Show modal for edit elements of order
$('#exampleOrder').on('click', ".edtorder", function () {
    var btn = $(this);
    var id = btn.data('id');
    $.ajax({
        url: "/Admin/ShowOrderEditM/",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $('#exampleModalLabel').empty();
            $('#body').empty();
            $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#body').empty();
            $('.modal-footer').empty();
            $('#exampleModalLabel').append('Sifariş detalları');
            $('#body').append('<label>Telefon nömrəsi</label><input class="form-control" value="' + data.Phone + '" id="Phone"/>');
            $('#body').append('<label>Məhsul kodu</label><input class="form-control" value="' + data.ProductCode + '" id="ProductCode"/>');
            $('#body').append('<label>Məhsulun ölçüsü</label><input class="form-control" value="' + data.Size + '" id="Size"/>');
            $('#body').append('<input hidden value="' + data.id + '"id="id"/>');
            $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveEditedOrder()">Təsdiqlə</button>');
            $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
            $("#exampleModalProduct").modal('toggle');
        }
    });
});
//Save edited elements of order
function SaveEditedOrder() {
    var data = new FormData();
    data.append("id", $('#id').val());
    data.append("Phone", $('#Phone').val());
    data.append("ProductCode", $('#ProductCode').val());
    data.append("Size", $('#Size').val());
    $.ajax({
        url: "/Admin/SaveEditedOrder/",
        contentType: false,
        processData: false,
        type: "Post",
        data: data,
        beforeSend() {
            $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            bootbox.alert('Tamamlandi');
            $('#tbody').html(data);
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
            $("#exampleModalProduct").modal('toggle');
        }
    });
}
//Delete order
$('#exampleOrder').on('click', '.btnDelOr', function () {
    var btn = $(this);
    var id = btn.data('id');
    bootbox.confirm("Sifarişi silməyə əminsiniz?", function (result) {
        if (result) {
            $.ajax({
                url: "/Admin/DeleteOrder/",
                data: { id: id },
                beforeSend() {
                    $('#exampleOrder').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
                },
                success: function () {
                    btn.parent().parent().remove();
                    $('#spinner').remove();
                },
                error: function () {
                    bootbox.alert('Error');
                }
            });
        }
    });
   
});
 
//Confirmation order
$('#exampleOrder').on('click', '.btnorderconf', function () {
    var btn = $(this);
    var id = btn.data('id');
    bootbox.confirm("Sifariş yerinə yetirilib?", function (result) {
        if (result) {
            $.ajax({
                url: "/Admin/ConfirmationOrder/",
                data: { id: id },
                beforeSend() {
                    $('#exampleOrder').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
                },
                success: function (data) {
                    bootbox.alert('Təsdiqləndi');
                    $('#tbody').html(data);
                    $('#spinner').remove();
                },
                error: function () {
                    bootbox.alert('Error');
                    $('#spinner').remove();
                }
            });
        }
    });
   
});