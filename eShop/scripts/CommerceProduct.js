//Show modal order for Index and allproduct 
$('#products').on('click', '.order', function () {
    var btn=$(this);
    var productId = btn.data('id');
    $.ajax({
        url: "/Home/ForOrder/",
        contentType: "application/json",
        data: { id: productId },
        success: function (datas) {
            $('#exampleModalLabel').empty();
            $('#bodyProduct').empty();
            $('.modal-footer').empty();
            $.each(datas, function (i, data) {
                $('#exampleModalLabel').append('' + data.Text + '');
                $('#bodyProduct').append('<input  hidden id="productId" value="' + data.ValueProduct + '"/>');
                $('#bodyProduct').append('<div class="form-group"><input class="form-control" placeholder="Soyad (*)" id="LastName"/></div>');
                $('#bodyProduct').append('<div class="form-group"><input class="form-control" placeholder="Ad (*)" id="FirstName"/></div>');
                $('#bodyProduct').append('<div class="form-group"><input class="form-control" placeholder="Telefon (*)" id="Phone" type="tel"/></div>');
                $('#bodyProduct').append('<div class="form-group"><input class="form-control" placeholder="E-mail (*)" id="Email" type="email"/></div>');
                return false;
            });
            $('#bodyProduct').append('<div class="form-group"><label class="col-form-label ">Mövcud olan ölçünü seçin (*)</label>' +
                '<select id="sizes" class="form-control"></select></div>');
            $.each(datas, function (i, data) {
                if (data.ValueProduct == null) {
                    $('#sizes').append('<option value="' + data.ValueImage + '">' + data.ValueImage + '</option>');
                }                
            });
            ///
            $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="order()">Sifariş ver</button>');
            $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
            ///
        }
    });
});
//Show modal order for SingleProduct
function OrderShow() {
    var id=$('.order').data('id');
    var size = $('.radios:checked').val();
    var data = new FormData();
    data.append("id", id);
    data.append("size",size);
    $.ajax({
        url: "/Home/OrderSingle",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        beforeSend: function () {
            $("#bodyProduct").empty();
            $("#bodyProduct").append('<div class="loader"></div>');
        },
        success: function (datas) {
            $('#exampleModalLabel').empty();
            $('#bodyProduct').empty();
            $('.modal-footer').empty();            
            $.each(datas, function (i, data) {
                $('#exampleModalLabel').append('Məlumatları daxil edin');
                $('#bodyProduct').append('<input  hidden id="productId" value="' + data.Value + '"/>');
                $('#bodyProduct').append('<div class="form-group"><input class="form-control" placeholder="Soyad (*)" id="LastName"/></div>');
                $('#bodyProduct').append('<div class="form-group"><input class="form-control" placeholder="Ad (*)" id="FirstName"/></div>');
                $('#bodyProduct').append('<div class="form-group"><input class="form-control" placeholder="Telefon (*)" id="Phone" type="tel"/></div>');
                $('#bodyProduct').append('<div class="form-group"><input class="form-control" placeholder="E-mail (*)" id="Email" type="email"/></div>');
                $('#bodyProduct').append('<div class="form-group"><label class="col-form-label ">Mövcud olan ölçünü seçin (*)</label>' +
                '<select id="sizes" class="form-control"></select></div>');
                $('#sizes').append('<option value="'+data.Text+'">'+data.Text+'</option>');
                return false;
            });
            
            $.each(datas, function (i, data) {
                if (data.Value == null) {
                    $('#sizes').append('<option value="' + data.Text + '">' + data.Text + '</option>');
                }
            });
            $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="order()">Sifariş ver</button>');
            $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
        }
    });
}

//Order
function order() {
    var data = new FormData();
    var id = $('#productId').val();
    data.append('ProductId', id);
    data.append('LastName',$('#LastName').val());
    data.append('FirstName', $('#FirstName').val());
    data.append('Phone', $('#Phone').val());
    data.append('Email', $('#Email').val());
    data.append('size', $('#sizes').val());
    $.ajax({
        url: "/Home/order/",
        type: "POST",
        contentType: false,
        processData: false,
        data: data,
        beforeSend(){
            $("#bodyProduct").append('<div class="loader"></div>');
        },
        success: function (data) {
            bootbox.alert(data.Text);
            $("#exampleModalProduct").modal("toggle");
        }
    });
}