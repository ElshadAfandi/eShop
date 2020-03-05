//Send message from form
function Send() {
    var data = new FormData();
    data.append("Name", $('#Name').val());
    data.append('Email', $('#Email').val());
    data.append('Phone', $('#Phone').val());
    data.append('Subject', $('#Subject').val());
    data.append('Message1', $('#Message').val());
    $.ajax({
        url: "/Home/SendMessage/",
        contentType: false,
        processData: false,
        type: "Post",
        data: data,
        beforeSend(){
            $('#form').append('<div class="loader"></div>');
        },
        success: function () {
            $('#form')[0].reset();
            bootbox.alert('Mesajınız göndərildi');
            $('.loader').remove();
        },
        error: function () {
            bootbox.alert('Error');
            $('.loader').remove();
        }
    });
}
//Send message from modal
function SendModal() {
    var data = new FormData();
    data.append("Name", $('#NameM').val());
    data.append('Email', $('#EmailM').val());
    data.append('Phone', $('#PhoneM').val());
    data.append('Subject', $('#SubjectM').val());
    data.append('Message1', $('#MessageM').val());
    $.ajax({
        url: "/Home/SendMessage/",
        contentType: false,
        processData: false,
        type: "Post",
        data: data,
        beforeSend() {
            $('#body').append('<div class="loader"></div>');
        },
        success: function () {
            $('#formModal')[0].reset();
            $('.loader').remove();
            $('#exampleModal').modal('toggle');
            bootbox.alert('Mesajınız göndərildi');
        },
        error: function () {
            $('#formModal')[0].reset();
            $('.loader').remove();
            $('#exampleModal').modal('toggle');
            bootbox.alert('Error');
        }
    });
}