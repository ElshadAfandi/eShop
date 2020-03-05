//Datatable for message
$(function () {
    //DataTable
    $("#exampleMessage").dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Azerbaijan.json"
        },
        "order": [[0, "desc"]],
        responsive: true
    });
});

//View message
$('#exampleMessage').on('click', '.viewMs', function () {

    var btn = $(this);
    var id = btn.data('id');
    $.ajax({
        url: "/Admin/ViewMessage/",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#body').empty();
            if (data.Value != null) {
                $('#exampleModalLabel').empty();
                $('#exampleModalLabel').append('' + data.Value + '');
            }
            else {
                $('#exampleModalLabel').empty();
                $('#exampleModalLabel').append('Məktub');
            }
            $('#body').append(''+data.Text+'');
        },
        error: function () {
            $('#exampleModalMessage').modal('toggle');
            bootbox.alert('Error');
        }
    });
});
//Delete Message
$('#exampleMessage').on('click', '.deleteMs', function () {
    var btn = $(this);
    var id = btn.data('id');
    bootbox.confirm("Silinsin?", function (result) {
        if (result) {
            $.ajax({
                url: "/Admin/DeleteMessage/",
                data: { id: id },
                beforeSend() {
                    $('#exampleMessage').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
                },
                success: function () {
                    btn.parent().parent().remove();
                    $('#spinner').remove();
                    bootbox.alert('Mesaj silindi');
                },
                error: function () {
                    bootbox.alert('Error');
                    $('#spinner').remove();
                }
            });
        }
    });
});