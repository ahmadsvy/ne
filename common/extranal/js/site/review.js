"use strict";
$(document).ready(function () {
    "use strict";
    $(".table").on("click", ".editbutton", function () {
        "use strict";
        $("#loader").show();
        var iid = $(this).attr('data-id');
        $('#editSlideForm').trigger("reset");
        $("#img").attr("src", "uploads/cardiology-patient-icon-vector-6244713.jpg");
        $.ajax({
            url: 'site/review/editReviewByJason?id=' + iid,
            method: 'GET',
            data: '',
            dataType: 'json',
            success: function (response) {
                "use strict";
                $('#editSlideForm').find('[name="id"]').val(response.review.id).end();
                $('#editSlideForm').find('[name="name"]').val(response.review.name).end();
                $('#editSlideForm').find('[name="designation"]').val(response.review.designation).end();
                $('#editSlideForm').find('[name="review"]').val(response.review.review).end();
                $('#editSlideForm').find('[name="status"]').val(response.review.status).end();

                if (typeof response.review.img !== 'undefined' && response.review.img != '') {
                    $("#img").attr("src", response.review.img);
                }

                $('#myModal2').modal('show');
            },
            complete: function () {
                $("#loader").hide();
            }
        })
    });
});
$(document).ready(function () {
    "use strict";
    var table = $('#editable-sample').DataTable({
        responsive: true,
        dom: "<'row'<'col-sm-3'l><'col-sm-5 text-center'B><'col-sm-4 text-right'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [
            { extend: 'copyHtml5', exportOptions: { columns: [1, 2, 3, 4], } },
            { extend: 'excelHtml5', exportOptions: { columns: [1, 2, 3, 4], } },
            { extend: 'csvHtml5', exportOptions: { columns: [1, 2, 3, 4], } },
            { extend: 'pdfHtml5', exportOptions: { columns: [1, 2, 3, 4], } },
            { extend: 'print', exportOptions: { columns: [1, 2, 3, 4], } },
        ],
        aLengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        iDisplayLength: -1,
        "order": [[0, "desc"]],
        "language": {
            "lengthMenu": "_MENU_",
            search: "_INPUT_",
            "url": "common/assets/DataTables/languages/" + language + ".json"
        },
    });
    table.buttons().container()
        .appendTo('.custom_buttons');
});
$(document).ready(function () {
    "use strict";
    $(".flashmessage").delay(3000).fadeOut(100);
});

