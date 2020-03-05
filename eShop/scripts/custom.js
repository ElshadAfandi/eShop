//$(document).ready(function () {
//    $('#table').DataTable();
//});


$(function () {
    //DataTable
    $("#example").dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Azerbaijan.json"
        },
        responsive: true
    });
   
    //Kateqoriya silinmesi
    $("#example").on("click", ".btnCatDelete", function () {
        var id = $(this).data("id");
        var btn = $(this);
        bootbox.confirm("Bu kateqoriyaya aid bütün aidiyyatı məlumatlarda silinicək!", function (result) {
            if (result) {
                $.ajax({
                    type: "GET",
                    url: "/Admin/CategoryDelete/" + id,
                    beforeSend() {
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

     
    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();


 
});





