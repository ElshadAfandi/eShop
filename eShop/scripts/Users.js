
//Open modal for new role
function NewUser() {
   
    $('#exampleModalLabel').empty();
    $('#exampleModalLabel').append('Yeni istifadəçi');

    $('#body').empty();
    $('.modal-footer').empty();

    $('#body').append('<input placeholder="Soyad" id="LastName" class="form-control"/><br />');
    $('#body').append('<input placeholder="Ad" id="FirstName" class="form-control"/><br />');
    $('#body').append('<input id="userName" class="form-control" placeholder="İstifadəçi adı"/><br />');
    $('#body').append('<input id="password" type="password" class="form-control" placeholder="Parol"/><br />');
    $('#body').append('<select id="roles" class="form-control">');
    $.ajax({
        url: "/Users/ViewRoles",
        contentType: "application/json",
        success: function (datas) {
            $('#roles').empty();
            $('#roles').append('<option value="" selected disabled>Rolu seçin</option>');
            $.each(datas, function (i, data) {
                $('#roles').append('<option value="' + data.Text + '">' + data.Text + '</option>');
            });
        }
    });
    $('#body').append('<label style="font-weight:bold;">Doğum tarixi</label>');
    $('#body').append('<input id="Brithday" type="date" class="form-control"/> <br />');    
    $('#body').append('<input id="Phone" type="tel" class="form-control" placeholder="Telefon nömrəsi"/><br />');
    $('#body').append('<input id="email" type="email" class="form-control" placeholder="E-mail"/><br />');
    $('#body').append('<input id="Question"  class="form-control" placeholder="Gizli sual"/><br />');
    $('#body').append('<input id="Answer" class="form-control" placeholder="Gizli cavab"/><br />');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewUser()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Yeni rol
function NewRol() {
    $('#exampleModalLabel').empty();
    $('#exampleModalLabel').append('Yeni rol əlavə etmək');
    $('#body').empty();
    $('#body').append('<input placeholder="Yeni rol adın daxil edin" id="newRolName" class="form-control"/>');
    $('.modal-footer').empty();
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="SaveNewRol()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
}
//Save new rol name
function SaveNewRol() {
    var name = $('#newRolName').val();
    $.ajax({
        url: "/Users/NewRolName/",
        data: { name: name },
        beforeSend() {
            $("#body").append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            bootbox.alert(data.Value);
            $('#exampleModalProduct').modal('toggle');
        },
        error: function () {
            $('#exampleModalProduct').modal('toggle');
            bootbox.alert('Error');
        }
    });
}

//View Roles
function ViewRol() {
    $('#exampleModalLabel').empty();
    $('#exampleModalLabel').append('Rol siyahısı');
    $('#body').empty();
    $('.modal-footer').empty();
    $.ajax({
        url: "/Users/ViewRoles/",
        contentType: "application/json",
        beforeSend() {
            $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (datas) {
            $('#body').empty();
            $('#body').append('<div class="table table-responsive"><table class="table table-hover" id="exampleRole"></table></div>');
            $('#exampleRole').append('<thead><tr><th>Role name</th><th>Delete</th></tr></thead>');
            //$('#exampleRole').append('<tbody id="tbody"></tbody>');
            $.each(datas, function (i, data) {
                $('#exampleRole').append('<tr><td>'+data.Text+'</td>'+
                    '<td><a class="btn btn-danger btnDelRole" data-id="'+data.Value+'">Sil</a></td>' +
                    '</tr>');
            });
            $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
        },
        error: function () {
            $('#exampleModalProduct').modal('toggle');
            bootbox.alert('Error');
        }
    });
}

//Delete role
$('#body').on("click", ".btnDelRole", function () {
        var btn = $(this);
        var id = btn.data('id');
        bootbox.confirm("Silməyə əminimisiz?", function (result) {
            if (result) {
                $.ajax({
                    url: "/Users/DeleteRol/",
                    data: { id: id },
                    beforeSend() {
                        $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
                    },
                    success: function (data) {
                        if (data.Text == null) {
                            btn.parent().parent().remove();
                        }
                        else if (data.Text != null) {
                            bootbox.alert(data.Text);
                        }                        
                        $('#spinner').remove();
                    },
                    error: function () {
                        bootbox.alert('Error')
                        $('#spinner').remove();
                    }
                });
            }
        });
    });

//Save new user
function SaveNewUser() {
    var data = new FormData();
    data.append("LastName", $('#LastName').val());
    data.append("FirstName", $('#FirstName').val());
    data.append("UserName", $('#userName').val());
    data.append("Password", $('#password').val());
    data.append("RoleName", $('#roles').val());
    data.append("Brithday", $('#Brithday').val());
    data.append("Phone", $('#Phone').val());
    data.append("Email", $('#email').val());
    data.append("SecurityQuestion", $('#Question').val());
    data.append("SecurityAnswer", $('#Answer').val());
    $.ajax({
        url: "/Users/SaveNewUser/",
        contentType: false,
        processData: false,
        type: "Post",
        data: data,
        beforeSend() {
            $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            if (data.Text != null) {
                bootbox.alert(data.Text);
                $('#exampleModalProduct').modal('toggle');
            }
            else {
                $('#tbody').html(data);
                $('#exampleModalProduct').modal('toggle');
            }
            
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}

//////User operation

//Delete user and all datas of user
 $('#example').on('click', '.btnUserDel', function () {
        var btn = $(this);
        var id = btn.data('id');
        bootbox.confirm("Silməyə əminisizmi?", function (result) {
            if (result) {
                $.ajax({
                    url: "/Users/DeleteUser/",
                    data: { id: id },
                    beforeSend() {
                        $('#example').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
                    },
                    success: function (data) {
                        $('#spinner').remove();
                        if (data.Text != null) {
                            bootbox.alert(data.Text);
                        }
                        else if (data.Text == null) {
                            btn.parent().parent().remove();
                        }
                    },
                    error: function () {
                        bootbox.alert('Error');
                        $('#spinner').remove();
                    }
                });
            }
        });
    });

///View roles of user
$('#example').on('click', '.UserRoleView', function () {
        var id = $(this).data('id');
        $.ajax({
            url: "/Users/ViewUserRoles/",
            contentType: "application/json",
            data: { id: id },
            beforeSend() {
                $('#exampleModalLabel').empty();
                $('#body').empty();
                $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
            },
            success: function (datas) {
                $('#body').empty();
                $('#exampleModalLabel').append('Roles of user');
                $('#body').append('<table class="table table-responsive"><thead><tr><th>Role</th><th>Delete</th></tr></thead><tbody id="roles"></tbody></table>');
                $.each(datas, function (i, data) {
                    if (data.Value != null) {
                        return false;
                    }
                    $('#roles').append('<tr><td>' + data.Text + '</td><td><a class="btn btn-danger btnRoleOfUser" data-id="' + data.Text + '">Sil</a></td></tr>');                    
                });
                $.each(datas, function (i, data) {
                    if (data.Value != null) {
                        $('#body').append('<input hidden id="rn" value="' + data.Value + '"/>');
                        return false;
                    }
                });
                $('#body').append('<hr /><label>İstifadəçiyə rol əlavə etmək</label><br />');
                $('#body').append('<select id="rolesList" class="form-control"></select> <br />');
                $.ajax({
                    url: "/Users/ViewRoles/",
                    contentType: "application/json",
                    success: function (datas) {
                        $('#rolesList').empty();
                        $('#rolesList').append('<option value="" selected disabled>Rolu seçin</option>');
                        $.each(datas, function (i, data) {                            
                            $('#rolesList').append('<option value="' + data.Text + '">' + data.Text + '</option>');
                        });
                    }
                });
                $('#body').append('<a class="btn btn-success" onclick="AddRole()">Seçilmiş rolu user-ə əlavə et</a>');
            }
        });
    });

//Delete role of user
 $('#body').on('click', '.btnRoleOfUser', function () {
        var btn = $(this);
        var id = btn.data('id');
        var username = $('#rn').val();
        bootbox.confirm("Silməyə əmininsiz?", function (result) {
            if (result) {
                $.ajax({
                    url: "/Users/DeleteRoleUser/",
                    data: { id: id, username: username },
                    type: "Post",
                    beforeSend() {
                        $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
                    },
                    success: function () {
                        $('#spinner').remove();
                        btn.parent().parent().remove();
                    },
                    error: function () {
                        $('#spinner').remove();
                        bootbox.alert('Error');
                    }
                });
            }
        });
 });

//Add role to user
function AddRole() {
    var roleName = $('#rolesList').val();
    var userName = $('#rn').val();
    $.ajax({
        url: "/Users/AddUserToRole/",
        data: { roleName: roleName, userName: userName },
        type:"Post",
        beforeSend() {
            $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function () {
            $('#exampleModalProduct').modal('toggle');
            bootbox.alert('Tamamlandı');
        },
        error() {
            $('#spinner').remove();
        }
    });
}

//open modal for edit user elements
$('#example').on('click', '.btnedituser', function () {
    var btn = $(this);
    var id = btn.data('id');
    $.ajax({
        url: "/Users/ViewEditModalUser/",
        contentType: "application/json",
        data: { id: id },
        beforeSend() {
            $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#exampleModalLabel').empty();
            $('#exampleModalLabel').append('Edited user');
            $('.modal-footer').empty();
            $('#body').empty();
            $('#body').append('<input id="username" hidden value="'+data.UserName+'"/>');
            $('#body').append('<label>Soyad</label><input class="form-control" id="LastName" value="' + data.LastName + '" />');
            $('#body').append('<label>Ad</label><input class="form-control" id="FirstName" value="' + data.FirstName + '" />');
            $('#body').append('<label>Telefon</label><input type="tel" class="form-control" id="Phone" value="' + data.Phone + '" />');
            $('.modal-footer').append('<button type="button" onclick="SaveEditedUser()" class="btn btn-primary">Təsdiqlə</button>');
            $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
});

//Save edited elements user
function SaveEditedUser() {
    var data = new FormData();
    data.append("UserName", $('#username').val());
    data.append("LastName", $('#LastName').val());
    data.append("FirstName", $('#FirstName').val());
    data.append("Phone", $('#Phone').val());
    $.ajax({
        url: "/Users/SaveEditUser/",
        type: "Post",
        contentType: false,
        processData: false,
        data:data,
        beforeSend() {
            $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            $('#tbody').html(data);
            bootbox.alert('Tamamlandı');
            $('#exampleModalProduct').modal('toggle');            
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}

//Open modal for change user password
$('#example').on("click", ".btnchangepassw", function () {
    var btn=$(this);
    var userId = btn.data('id');
    $('#exampleModalLabel').empty();
    $('#exampleModalLabel').append('Reset password');
    $('.modal-footer').empty();
    $('#body').empty();
    $('#body').append('<input id="userid" value="'+userId+'" hidden/>');
    //$('#body').append('<input class="form-control" id="oldpassword" type="password" placeholder="Old password" /><br />');
    $('#body').append('<input class="form-control" id="newpassword" type="password" placeholder="New password" />');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" onclick="ChangePassword()">Təsdiqlə</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>');
});

//Save chengedPassword
function ChangePassword() {
    var userId = $('#userid').val();
    //var oldPassword = $('#oldpassword').val();
    var newPassword = $('#newpassword').val();
    $.ajax({
        url: "/Users/ChangePassword/",
        data: { id: userId,  newPassword: newPassword },
        beforeSend() {
            $('#body').append('<span id="spinner" class="dashboard-spinner spinner-secondary spinner-xs"></span>');
        },
        success: function (data) {
            bootbox.alert(data.Text);
            $('#exampleModalProduct').modal('toggle');
        },
        error: function () {
            bootbox.alert('Error');
        }
    });
}

/////End User operation

