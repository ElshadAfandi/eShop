//Open modal for image edit
function EditBgIm() {
    var id = $('#ImageName').data('id');
    $.ajax({
        url: "/Admin/ImageOpenModal/",
        data: { id: id },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('.modal-footer').empty();
            $('#exampleModalLabel').append('Arxa fon rəsmi');
            $('#bodyProduct').empty();
            $('#bodyProduct').append('<input id="ImageId" hidden value="' + data.Value + '" />');
            $('#bodyProduct').append('<input type="file" id="image" />');
            $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveBgImage()">Təsdiqlə</button>');
            $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Save new background image
function SaveBgImage() {
    var data = new FormData();
    var id = $('#ImageId').val();
    data.append('id', id);
    data.append('bgImage', $("#image").get(0).files[0]);
    $.ajax({
        url: "/Admin/EditBgImage/",
        type: "Post",
        contentType: false,
        processData: false,
        data: data,
        beforeSend() {
            $("#bodyProduct").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#ForRefresh').empty();
            $('#ForRefresh').append('<a href="' + data.Text + '" data-fancybox="gallary">' +
               ' <img src="' + data.Text + '" class="card-img"/></a>');
            $('#BgLink').append('href="' + data.Text + '"');
            $('#BgImage').append('src="' + data.Text + '"');
            $("#exampleModalProduct").modal('toggle');
        }
    });
}
//View Instagram Link
function viewIns() {
    var insLink = $('#insView').val();
    bootbox.alert(insLink);
}

////////////////////////////////////////////////// Facabook ////////////////////////////////////////////////////////
//View facebook Link
function ViewFb() {
    //var fbLink = $('#fblink').val();
    var id = $('#LookFb').data('id');
    $.ajax({
        url: "/Admin/LookFb/",
        contentType: "application/json",
        data: { id: id },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('.modal-footer').empty();
            $('#bodyProduct').empty();
            $('#bodyProduct').append(data.Text);
        }
    });
}
//Edit fb link
function EditFb() {
    var id = $('#fb').data('id');

    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni Facebook linkini daxil edin');
    $('#bodyProduct').append('<input id="fblinkEdited" class="form-control"/>');
    $('#bodyProduct').append('<input id="ValueFbLink" hidden value="' + id + '"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveFbLink()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save edited fb link
function SaveFbLink() {
    var id = $('#ValueFbLink').val();
    var NewLink = $('#fblinkEdited').val();
    $.ajax({
        url: "/Admin/EditFbLink/",
        type: "Post",
        data: { id: id, newlink: NewLink },
        beforeSend() {
            $("#bodyProduct").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Delete link
function DeleteFb() {
    var id = $('#DeleteFb').data('id');
    $.ajax({
        url: "/Admin/DeleteFb",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $("#facebookDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#facebookDiv').empty();
            $('#facebookDiv').append('<a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalProduct" onclick="NewFb()">'+
                                       'Yeni'+
                                    '</a>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//New modal facebook link
function NewFb() {
    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni facebook linki');
    $('#bodyProduct').append('<input placeholder="linki daxil edin" id="NewFbLink" class="form-control"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewFbLink()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//New facebook link save
function SaveNewFbLink() {
    var link = $('#NewFbLink').val();
    $.ajax({
        url: "/Admin/NewFbLink",
        contentType: "application/json",
        data: { link: link },
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#facebookDiv').empty();
            $('#facebookDiv').append('<a class="btn btn-primary" id="LookFb" data-id="'+data.Value+'" data-toggle="modal" data-target="#exampleModalProduct" onclick="ViewFb()">'+
                                        'Bax'+
                                    '</a>');
            $('#facebookDiv').append('<a class="btn btn-success" data-id="'+data.Value+'" id="fb" onclick="EditFb()" data-target="#exampleModalProduct"'+
                                       'data-toggle="modal">'+
                                        'Dəyiş'+
                                    '</a>');
            $('#facebookDiv').append('<a class="btn btn-danger" data-id="' + data.Value + '" id="DeleteFb" onclick="DeleteFb()">Sil</a>');
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//////////////////////////////////////////////////./Facabook ////////////////////////////////////////////////////////


////////////////////////////////////////////////// WhatsApp ////////////////////////////////////////////////////////
//View whatsapp Link
function ViewWp() {
    var id = $('#LookWp').data('id');
    $.ajax({
        url: "/Admin/LookWp/",
        contentType: "application/json",
        data: { id: id },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('.modal-footer').empty();
            $('#bodyProduct').empty();
            $('#bodyProduct').append(data.Text);
        }
    });
}
//Edit whatsapp link
function EditWp() {
    var id = $('#wp').data('id');

    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni WhatsApp linkini daxil edin');
    $('#bodyProduct').append('<input id="wplinkEdited" class="form-control"/>');
    $('#bodyProduct').append('<input id="ValueWpLink" hidden value="' + id + '"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveWpLink()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save edited whatsapp link
function SaveWpLink() {
    var id = $('#ValueWpLink').val();
    var NewLink = $('#wplinkEdited').val();
    $.ajax({
        url: "/Admin/EditWpLink/",
        type: "Post",
        data: { id: id, newlink: NewLink },
        beforeSend() {
            $("#bodyProduct").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Delete whatsapp link
function DeleteWp() {
    var id = $('#DeleteWp').data('id');
    $.ajax({
        url: "/Admin/DeleteWp",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $("#WhatsAppDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#WhatsAppDiv').empty();
            $('#WhatsAppDiv').append('<a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalProduct" onclick="NewWp()">' +
                                       'Yeni' +
                                    '</a>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//New modal whatsapp link
function NewWp() {
    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni whatsapp linki');
    $('#bodyProduct').append('<input placeholder="linki daxil edin" id="NewWpLink" class="form-control"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewWpLink()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//New whatsapp link save
function SaveNewWpLink() {
    var link = $('#NewWpLink').val();
    $.ajax({
        url: "/Admin/NewWpLink",
        contentType: "application/json",
        data: { link: link },
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#WhatsAppDiv').empty();
            $('#WhatsAppDiv').append('<a class="btn btn-primary" id="LookWp" data-id="' + data.Value + '" data-toggle="modal" data-target="#exampleModalProduct" onclick="ViewWp()">' +
                                        'Bax' +
                                    '</a>');
            $('#WhatsAppDiv').append('<a class="btn btn-success" data-id="' + data.Value + '" id="wp" onclick="EditWp()" data-target="#exampleModalProduct"' +
                                       'data-toggle="modal">' +
                                        'Dəyiş' +
                                    '</a>');
            $('#WhatsAppDiv').append('<a class="btn btn-danger" data-id="' + data.Value + '" id="DeleteWp" onclick="DeleteWp()">Sil</a>');
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
////////////////////////////////////////////////// ./WhatsApp ////////////////////////////////////////////////////////

////////////////////////////////////////////////// Address ////////////////////////////////////////////////////////
//View address
function ViewAd() {
    var id = $('#LookAd').data('id');
    $.ajax({
        url: "/Admin/LookAd/",
        contentType: "application/json",
        data: { id: id },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('.modal-footer').empty();
            $('#bodyProduct').empty();
            $('#bodyProduct').append(data.Text);
        }
    });
}
//Edit address
function EditAd() {
    var id = $('#ad').data('id');

    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni ünvanı daxil edin');
    $('#bodyProduct').append('<input id="adEdited" class="form-control"/>');
    $('#bodyProduct').append('<input id="ValueAd" hidden value="' + id + '"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveAd()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save edited address
function SaveAd() {
    var id = $('#ValueAd').val();
    var NewLink = $('#adEdited').val();
    $.ajax({
        url: "/Admin/EditAd/",
        type: "Post",
        data: { id: id, newlink: NewLink },
        beforeSend() {
            $("#bodyProduct").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Delete address
function DeleteAd() {
    var id = $('#DeleteAd').data('id');
    $.ajax({
        url: "/Admin/DeleteAd",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $("#AddressDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#AddressDiv').empty();
            $('#AddressDiv').append('<a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalProduct" onclick="NewAd()">' +
                                       'Yeni' +
                                    '</a>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//New modal address
function NewAd() {
    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni address');
    $('#bodyProduct').append('<input placeholder="ünvanı daxil edin" id="NewAd" class="form-control"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewAd()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//New address save
function SaveNewAd() {
    var link = $('#NewAd').val();
    $.ajax({
        url: "/Admin/NewAd",
        contentType: "application/json",
        data: { link: link },
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#AddressDiv').empty();
            $('#AddressDiv').append('<a class="btn btn-primary" id="LookAd" data-id="' + data.Value + '" data-toggle="modal" data-target="#exampleModalProduct" onclick="ViewAd()">' +
                                        'Bax' +
                                    '</a>');
            $('#AddressDiv').append('<a class="btn btn-success" data-id="' + data.Value + '" id="ad" onclick="EditAd()" data-target="#exampleModalProduct"' +
                                       'data-toggle="modal">' +
                                        'Dəyiş' +
                                    '</a>');
            $('#AddressDiv').append('<a class="btn btn-danger" data-id="' + data.Value + '" id="DeleteAd" onclick="DeleteAd()">Sil</a>');
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
////////////////////////////////////////////////// ./Address ////////////////////////////////////////////////////////

////////////////////////////////////////////////// Phone ////////////////////////////////////////////////////////////
//View phone
function ViewPh() {
    var id = $('#LookPh').data('id');
    $.ajax({
        url: "/Admin/LookPh/",
        contentType: "application/json",
        data: { id: id },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('.modal-footer').empty();
            $('#bodyProduct').empty();
            $('#bodyProduct').append(data.Text);
        }
    });
}
//Edit address
function EditPh() {
    var id = $('#ph').data('id');

    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni telefon nömrəsini daxil edin');
    $('#bodyProduct').append('<input id="phEdited" class="form-control"/>');
    $('#bodyProduct').append('<input id="ValuePh" hidden value="' + id + '"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SavePh()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save edited address
function SavePh() {
    var id = $('#ValuePh').val();
    var NewLink = $('#phEdited').val();
    $.ajax({
        url: "/Admin/EditPh/",
        type: "Post",
        data: { id: id, newlink: NewLink },
        beforeSend() {
            $("#bodyProduct").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Delete address
function DeletePh() {
    var id = $('#DeletePh').data('id');
    $.ajax({
        url: "/Admin/DeletePh",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $("#PhoneDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#PhoneDiv').empty();
            $('#PhoneDiv').append('<a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalProduct" onclick="NewPh()">' +
                                       'Yeni' +
                                    '</a>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//New modal phone
function NewPh() {
    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni telefon nömrəsi');
    $('#bodyProduct').append('<input placeholder="nömrəni daxil edin" id="NewPh" class="form-control"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewPh()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//New phone save
function SaveNewPh() {
    var link = $('#NewPh').val();
    $.ajax({
        url: "/Admin/NewPh",
        contentType: "application/json",
        data: { link: link },
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#PhoneDiv').empty();
            $('#PhoneDiv').append('<a class="btn btn-primary" id="LookPh" data-id="' + data.Value + '" data-toggle="modal" data-target="#exampleModalProduct" onclick="ViewPh()">' +
                                        'Bax' +
                                    '</a>');
            $('#PhoneDiv').append('<a class="btn btn-success" data-id="' + data.Value + '" id="ph" onclick="EditPh()" data-target="#exampleModalProduct"' +
                                       'data-toggle="modal">' +
                                        'Dəyiş' +
                                    '</a>');
            $('#PhoneDiv').append('<a class="btn btn-danger" data-id="' + data.Value + '" id="DeletePh" onclick="DeletePh()">Sil</a>');
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
////////////////////////////////////////////////// ./Phone //////////////////////////////////////////////////////////
///////////////////////////////////////////////// Footer-text ///////////////////////////////////////////////////////
//View footer-text
function ViewFt() {
    var id = $('#LookFt').data('id');
    $.ajax({
        url: "/Admin/LookFt/",
        contentType: "application/json",
        data: { id: id },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('.modal-footer').empty();
            $('#bodyProduct').empty();
            $('#bodyProduct').append(data.Text);
        }
    });
}
//Edit footer-text
function EditFt() {
    var id = $('#ft').data('id');

    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni footer-text daxil edin');
    $('#bodyProduct').append('<textarea id="ftEdited" class="form-control"></textarea>');
    $('#bodyProduct').append('<input id="ValueFt" hidden value="' + id + '"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveFt()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save edited address
function SaveFt() {
    var id = $('#ValueFt').val();
    var NewLink = $('#ftEdited').val();
    $.ajax({
        url: "/Admin/EditFt/",
        type: "Post",
        data: { id: id, newlink: NewLink },
        beforeSend() {
            $("#bodyProduct").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Delete footer-text
function DeleteFt() {
    var id = $('#DeleteFt').data('id');
    $.ajax({
        url: "/Admin/DeleteFt",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $("#FooterDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#FooterDiv').empty();
            $('#FooterDiv').append('<a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalProduct" onclick="NewFt()">' +
                                       'Yeni' +
                                    '</a>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//New modal footer-text
function NewFt() {
    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni footer-text');
   // $('#bodyProduct').append('<input placeholder="text-i daxil edin" id="NewFt" class="form-control"/>');
    $('#bodyProduct').append('<textarea placeholder="text-i daxil edin" id="NewFt" class="form-control"></textarea>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewFt()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//New footer-text save
function SaveNewFt() {
    var link = $('#NewFt').val();
    $.ajax({
        url: "/Admin/NewFt",
        contentType: "application/json",
        data: { link: link },
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#FooterDiv').empty();
            $('#FooterDiv').append('<a class="btn btn-primary" id="LookFt" data-id="' + data.Value + '" data-toggle="modal" data-target="#exampleModalProduct" onclick="ViewFt()">' +
                                        'Bax' +
                                    '</a>');
            $('#FooterDiv').append('<a class="btn btn-success" data-id="' + data.Value + '" id="ft" onclick="EditFt()" data-target="#exampleModalProduct"' +
                                       'data-toggle="modal">' +
                                        'Dəyiş' +
                                    '</a>');
            $('#FooterDiv').append('<a class="btn btn-danger" data-id="' + data.Value + '" id="DeleteFt" onclick="DeleteFt()">Sil</a>');
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
///////////////////////////////////////////////// ./Footer-text ///////////////////////////////////////////////////////
//////////////////////////////////////////////// Google map //////////////////////////////////////////////////////////
//Edit google map
function EditGm() {
    var id = $('#gm').data('id');

    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni google map "src" daxil edin');
    $('#bodyProduct').append('<textarea id="gmEdited" class="form-control" placeholder="Yalnız src hissənin iç daxilin edin"></textarea>');
    $('#bodyProduct').append('<input id="ValueGm" hidden value="' + id + '"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveGm()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save edited google map
function SaveGm() {
    var id = $('#ValueGm').val();
    var NewLink = $('#gmEdited').val();
    $.ajax({
        url: "/Admin/EditGm/",
        type: "Post",
        data: { id: id, newlink: NewLink },
        beforeSend() {
            $("#bodyProduct").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Delete Google map
function DeleteGm() {
    var id = $('#DeleteGm').data('id');
    $.ajax({
        url: "/Admin/DeleteGm",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $("#GoogleDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#GoogleDiv').empty();
            $('#GoogleDiv').append('<a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalProduct" onclick="NewGm()">' +
                                       'Yeni' +
                                    '</a>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//New modal google map
function NewGm() {
    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni google map ucun src');
    $('#bodyProduct').append('<textarea placeholder="src-nin içərisin daxil edin" id="NewGm" class="form-control"></textarea>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewGm()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//New google map save
function SaveNewGm() {
    var link = $('#NewGm').val();
    $.ajax({
        url: "/Admin/NewGm",
        contentType: "application/json",
        data: { link: link },
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#GoogleDiv').empty();

            $('#GoogleDiv').append('<a class="btn btn-success" data-id="' + data.Value + '" id="gm" onclick="EditGm()" data-target="#exampleModalProduct"' +
                                       'data-toggle="modal">' +
                                        'Dəyiş' +
                                    '</a>');
            $('#GoogleDiv').append('<a class="btn btn-danger" data-id="' + data.Value + '" id="DeleteGm" onclick="DeleteGm()">Sil</a>');
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//////////////////////////////////////////////// ./Google map ////////////////////////////////////////////////////////
//////////////////////////////////////////////// Instagram ///////////////////////////////////////////////////////////
//View instagram name and link
function ViewIns() {
    var id = $('#LookIns').data('id');
    $.ajax({
        url: "/Admin/LookIns/",
        contentType: "application/json",
        data: { id: id },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('.modal-footer').empty();
            $('#bodyProduct').empty();
            $('#bodyProduct').append('Görünən: <span style="font-weight:bold;">'+data.Value+'</span><br />');
            $('#bodyProduct').append('Link:<span style="font-weight:bold;">' + data.Text + '</span>');
        }
    });
}
//Open modal for instagram edit
function EditIns() {
    var id = $('#ins').data('id');

    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni Instagram link və görüntü yazısın daxil edin');
    $('#bodyProduct').append('<input id="insname" class="form-control" placeholder="Instagram ad" /> <br />');
    $('#bodyProduct').append('<input id="inslink" class="form-control" placeholder="Instagram link" />');
    $('#bodyProduct').append('<input id="ValueIns" hidden value="' + id + '"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveIns()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save edited Instagram
function SaveIns() {
    var id = $('#ValueIns').val();
    var NewLink = $('#inslink').val();
    var newName = $('#insname').val();
    $.ajax({
        url: "/Admin/EditIns/",
        type: "Post",
        data: { id: id, newlink: NewLink,newname:newName },
        beforeSend() {
            $("#bodyProduct").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Delete instagram
function DeleteIns() {
    var id = $('#DeleteIns').data('id');
    $.ajax({
        url: "/Admin/DeleteIns",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $("#InstagramDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#InstagramDiv').empty();
            $('#InstagramDiv').append('<a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalProduct" onclick="NewIns()">' +
                                       'Yeni' +
                                    '</a>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//New instagram
function NewIns() {
    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni Instagram link və görüntü yazısın daxil edin');
    $('#bodyProduct').append('<input id="newinsname" class="form-control" placeholder="Instagram ad" /> <br />');
    $('#bodyProduct').append('<input id="newinslink" class="form-control" placeholder="Instagram link" />');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewIns()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
function SaveNewIns() {
    var link = $('#newinslink').val();
    var name = $('#newinsname').val();
    $.ajax({
        url: "/Admin/NewIns",
        contentType: "application/json",
        data: { link: link,name:name},
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#InstagramDiv').empty();
            $('#InstagramDiv').append('<a class="btn btn-primary" id="LookIns" data-id="' + data.Value + '" data-toggle="modal" data-target="#exampleModalProduct" onclick="ViewIns()">' +
                                       'Bax' +
                                   '</a>');
            $('#InstagramDiv').append('<a class="btn btn-success" data-id="' + data.Value + '" id="ins" onclick="EditIns()" data-target="#exampleModalProduct"' +
                                       'data-toggle="modal">' +
                                        'Dəyiş' +
                                    '</a>');
            $('#InstagramDiv').append('<a class="btn btn-danger" data-id="' + data.Value + '" id="DeleteIns" onclick="DeleteIns()">Sil</a>');
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//////////////////////////////////////////////// ./Instagram /////////////////////////////////////////////////////////

//////////////////////////////////////////////// Email settings //////////////////////////////////////////////////////
//View email settings
function ViewM() {
    var id = $('#LookM').data('id');
    $.ajax({
        url: "/Admin/LookM/",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $('#bodyProduct').empty();
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('.modal-footer').empty();
            $('#bodyProduct').empty();
            $('#exampleModalLabel').append('Email settings');
            $('#bodyProduct').append('<table><tr><th>Email name</th><td>' + data.EmailMailName + '</td></tr>'+
'<tr><th>Email</th><td>'+data.eMail+'</td></tr><tr><th>Password</th><td>'+data.Password+'</td></tr>'+
'<tr><th>Host</th><td>'+data.Host+'</td></tr>'+
'<tr><th>Port</th><td>' + data.Port + '</td></tr><tr><th>EnableSsl</th><td>' + data.EnableSsl + '</td></tr>'+
'<tr><th>UseDefaultCredentials</th><td>' + data.UseDefaultCredentials + '</td></tr></table>');
        }
    });
}
//open modal for edit email settings
function EditM() {
    var id = $('#m').data('id');
    $.ajax({
        url: "/Admin/LookM/",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $('#bodyProduct').empty();
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#bodyProduct').empty();
            $('.modal-footer').empty();
            $('#bodyProduct').append('<label style="font-weight:bold;">Email name</label>' +
                '<input class="form-control" id="eMailName" value="' + data.EmailMailName + '"/>' +
                '<label style="font-weight:bold;">Email</label><input class="form-control" value="' + data.eMail + '"  id="eMail" />' +
                '<label style="font-weight:bold;">Password</label><input class="form-control" value="' + data.Password + '" id="Password" />' +
                '<label style="font-weight:bold;">Host</label><input class="form-control" value="'+data.Host+'" id="Host" />'+
                '<label style="font-weight:bold;">Port</label><input class="form-control" value="'+data.Port+'" id="Port" type="number" />'+
                '<label style="font-weight:bold;">EnableSsl</label><select id="Ssl" class="form-control"></select>');
            $('#Ssl').append('<option value="' + data.EnableSsl + '">'+data.EnableSsl+'</option>'+
                '<option value="true">true</option><option value="false">'+
                'false</option>');
            $('#bodyProduct').append('<label style="font-weight:bold;">UseDefaultCredentials</label><select id="dc" class="form-control"></select>');
            $('#dc').append('<option value="' + data.UseDefaultCredentials + '">' + data.UseDefaultCredentials + '</option>'+
                '<option value="true">true</option><option value="false">' +
                'false</option>');
            $('#bodyProduct').append('<input hidden value="'+data.id+'" id="id" />');
            $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveEdMail()">Təsdiqlə</button>');
            $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Save edited mail
function SaveEdMail() {
    var data = new FormData();
    data.append("id", $('#id').val());
    data.append("eMail", $('#eMail').val());
    data.append("Password", $('#Password').val());
    data.append("Host", $('#Host').val());
    data.append("EnableSsl", $('#Ssl').val());
    data.append("UseDefaultCredentials", $('#dc').val());
    data.append("EmailMailName", $('#eMailName').val());
    data.append("Port",$('#Port').val());
    $.ajax({
        url: "/Admin/EditedMail/",
        type: "Post",
        contentType: false,
        processData: false,
        data: data,
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            bootbox.alert('Tamamlandı');
            $("#exampleModalProduct").modal("toggle");
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Delete mail
function DeleteM() {
    var id = $('#DeleteM').data('id');
    $.ajax({
        url: "/Admin/DeleteM/",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $("#EmailDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#EmailDiv').empty();
            $('#EmailDiv').append('<a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalProduct" onclick="NewM()">' +
                                       'Yeni' +
                                    '</a>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//New Email setting open modal
function NewM() {
    $('#bodyProduct').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').append('<label style="font-weight:bold;">Email name</label>' +
        '<input class="form-control" id="eMailName" />' +
        '<label style="font-weight:bold;">Email</label><input class="form-control"   id="eMail" />' +
        '<label style="font-weight:bold;">Password</label><input class="form-control"  id="Password" />' +
        '<label style="font-weight:bold;">Host</label><input class="form-control" id="Host" />' +
        '<label style="font-weight:bold;">Port</label><input class="form-control"  id="Port" type="number" />' +
        '<label style="font-weight:bold;">EnableSsl</label><select id="Ssl" class="form-control"></select>');
    $('#Ssl').append('<option value="true">true</option><option value="false">' +
        'false</option>');
    $('#bodyProduct').append('<label style="font-weight:bold;">UseDefaultCredentials</label><select id="dc" class="form-control"></select>');
    $('#dc').append('<option value="true">true</option><option value="false">' +
        'false</option>');    
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewMail()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save new mail
function SaveNewMail() {
    var data = new FormData();
    data.append("eMail", $('#eMail').val());
    data.append("Password", $('#Password').val());
    data.append("Host", $('#Host').val());
    data.append("EnableSsl", $('#Ssl').val());
    data.append("UseDefaultCredentials", $('#dc').val());
    data.append("EmailMailName", $('#eMailName').val());
    data.append("Port", $('#Port').val());
    $.ajax({
        url: "/Admin/NewMail/",
        type: "Post",
        contentType: false,
        processData: false,
        data: data,
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            bootbox.alert('Tamamlandı');
            $('#EmailDiv').empty();
            $('#EmailDiv').append('<a class="btn btn-primary" id="LookM" data-id="' + data.Value + '" data-toggle="modal" data-target="#exampleModalProduct" onclick="ViewM()">' +
                                       'Bax' +
                                   '</a>');
            $('#EmailDiv').append('<a class="btn btn-success" data-id="' + data.Value + '" id="m" onclick="EditM()" data-target="#exampleModalProduct"' +
                                       'data-toggle="modal">' +
                                        'Dəyiş' +
                                    '</a>');
            $('#EmailDiv').append('<a class="btn btn-danger" data-id="' + data.Value + '" id="DeleteM" onclick="DeleteM()">Sil</a>');
            $("#exampleModalProduct").modal("toggle");
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
/////////////////////////////////////////////// ./Email settings /////////////////////////////////////////////////////
/////////////////////////////////////////////// Site name ///////////////////////////////////////////////////////////
//View site name
function ViewSn() {
    var id = $('#LookSn').data('id');
    $.ajax({
        url: "/Admin/LookSn/",
        contentType: "application/json",
        data: { id: id },
        beforeSend(){
            $('#bodyProduct').empty();
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('.modal-footer').empty();
            $('#bodyProduct').empty();
            $('#bodyProduct').append(data.Text);
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Edit site name
function EditSn() {
    var id = $('#sn').data('id');

    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni sayt adını daxil edin');
    $('#bodyProduct').append('<input id="snlinkEdited" placeholder="..." class="form-control"/>');
    $('#bodyProduct').append('<input id="ValueSnLink" hidden value="' + id + '"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveSnLink()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save edited site name
function SaveSnLink() {
    var id = $('#ValueSnLink').val();
    var NewLink = $('#snlinkEdited').val();
    $.ajax({
        url: "/Admin/EditSiteName/",
        type: "Post",
        data: { id: id, newlink: NewLink },
        beforeSend() {
            $("#bodyProduct").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//Delete site bae
function DeleteSn() {
    var id = $('#DeleteSn').data('id');
    $.ajax({
        url: "/Admin/DeleteSn",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $("#NameDiv").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#NameDiv').empty();
            $('#NameDiv').append('<a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalProduct" onclick="NewSn()">' +
                                       'Yeni' +
                                    '</a>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
//New modal facebook link
function NewSn() {
    $('#exampleModalLabel').empty();
    $('.modal-footer').empty();
    $('#bodyProduct').empty();
    $('#exampleModalLabel').append('Yeni sayt adı');
    $('#bodyProduct').append('<input placeholder="adı daxil edin" id="NewSnLink" class="form-control"/>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewSnLink()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//New facebook link save
function SaveNewSnLink() {
    var link = $('#NewSnLink').val();
    $.ajax({
        url: "/Admin/NewSiteName/",
        contentType: "application/json",
        data: { link: link },
        beforeSend() {
            $('#bodyProduct').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#NameDiv').empty();
            $('#NameDiv').append('<a class="btn btn-primary" id="LookSn" data-id="' + data.Value + '" data-toggle="modal" data-target="#exampleModalProduct" onclick="ViewSn()">' +
                                        'Bax' +
                                    '</a>');
            $('#NameDiv').append('<a class="btn btn-success" data-id="' + data.Value + '" id="sn" onclick="EditSn()" data-target="#exampleModalProduct"' +
                                       'data-toggle="modal">' +
                                        'Dəyiş' +
                                    '</a>');
            $('#NameDiv').append('<a class="btn btn-danger" data-id="' + data.Value + '" id="DeleteSn" onclick="DeleteSn()">Sil</a>');
            $("#exampleModalProduct").modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}
////////////////////////////////////////////// ./Site name /////////////////////////////////////////////////////////