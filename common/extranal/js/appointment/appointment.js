"use strict";
$(document).ready(function () {
  $(".table").on("click", ".editbutton", function () {
    $("#loader").show();
    var iid = $(this).attr("data-id");
    $(".consultant_fee_div").addClass("d-none");
    $(".pay_now").addClass("hidd-noneden");
    $(".payment_status").addClass("d-none");
    $(".deposit_type1").addClass("d-none");
    $("#editAppointmentForm").trigger("reset");
    $.ajax({
      url: "appointment/editAppointmentByJason?id=" + iid,
      method: "GET",
      data: "",
      dataType: "json",
      success: function (response) {
        "use strict";
        var de = response.appointment.date * 1000;
        var d = new Date(de);

        var da = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        // Populate the form fields with the data returned from server
        $("#editAppointmentForm")
          .find('[name="id"]')
          .val(response.appointment.id)
          .end();
        $("#editAppointmentForm")
          .find('[name="patient"]')
          .val(response.appointment.patient)
          .end();
        $("#editAppointmentForm")
          .find('[name="doctor"]')
          .val(response.appointment.doctor)
          .end();
        $("#editAppointmentForm")
          .find('[name="date"]')
          .val(da)
          .trigger("change");
        $("#editAppointmentForm")
          .find('[name="status"]')
          .val(response.appointment.status)
          .end();
        $("#editAppointmentForm")
          .find('[name="remarks"]')
          .val(response.appointment.remarks)
          .end();

        var option = new Option(
          response.patient.name + "-" + response.patient.id,
          response.patient.id,
          true,
          true
        );
        $("#editAppointmentForm")
          .find('[name="patient"]')
          .append(option)
          .trigger("change");
        var option1 = new Option(
          response.doctor.name + "-" + response.doctor.id,
          response.doctor.id,
          true,
          true
        );
        $("#editAppointmentForm")
          .find('[name="doctor"]')
          .append(option1)
          .trigger("change");
        $("#visit_description1").html("");
        $.ajax({
          url:
            "doctor/getDoctorVisitForEdit?id=" +
            response.doctor.id +
            "&description=" +
            response.appointment.visit_description,
          method: "GET",
          data: "",
          dataType: "json",
          success: function (response1) {
            $("#visit_description1").html(response1.response).end();
            // $('#editAppointmentForm').find('[name="visit_description"]').val(response.appointment.visit_description).trigger('change').end();
          },
        });
        if (response.total_due != 0) {
          $(".consultant_fee_div").removeClass("d-none");
          $(".pay_now").removeClass("d-none");
          $(".payment_status").addClass("d-none");
          $('.status_paid_hidden_section').removeClass('d-none');
          $('#visit_description1').css('pointer-events', "auto");
          // $('.deposit_type1').removeClass('hidden');
          $("#editAppointmentForm")
            .find('[name="visit_charges"]')
            .val(response.appointment.visit_charges)
            .end();
          $("#editAppointmentForm")
            .find('[name="discount"]')
            .val(response.appointment.discount)
            .end();
          $("#editAppointmentForm")
            .find('[name="grand_total"]')
            .val(response.appointment.grand_total)
            .end();
        } else {
          $(".payment_status").removeClass("d-none");
          $(".pay_now").addClass("d-none");
          $(".consultant_fee_div").addClass("d-none");
          $('.status_paid_hidden_section').addClass('d-none');
          // $('.deposit_type1').addClass('hidden');
          $('#visit_description1').css('pointer-events', "none");
          $("#editAppointmentForm")
            .find('[id="adoctors1"]')
            .select2([
              {
                id: response.doctor.id,
                text: response.doctor.name + "-" + response.doctor.id,
                locked: true,
              },
            ]);

          $("#editAppointmentForm")
            .find('[id="pos_select1"]')
            .select2([
              {
                id: response.patient.id,
                text: response.patient.name + "-" + response.patient.id,
                locked: true,
              },
            ]);

        }
        var date = $("#date1").val();
        var doctorr = $("#adoctors1").val();
        var appointment_id = $("#appointment_id").val();
        $.ajax({
          url:
            "schedule/getAvailableSlotByDoctorByDateByAppointmentIdByJason?date=" +
            date +
            "&doctor=" +
            doctorr +
            "&appointment_id=" +
            appointment_id,
          method: "GET",
          data: "",
          dataType: "json",
          success: function (response) {
            "use strict";
            $("#aslots1").find("option").remove();
            var slots = response.aslots;
            $.each(slots, function (key, value) {
              "use strict";
              $("#aslots1").append($("<option>").text(value).val(value)).end();
            });

            $("#aslots1").val(response.current_value).trigger("change");

            if ($("#aslots1").has("option").length == 0) {
              //if it is blank.
              $("#aslots1")
                .append(
                  $("<option>")
                    .text(no_available_timeslots)
                    .val("Not Selected")
                )
                .end();
            }
          },
        });
      },
      complete: function () {
        $("#loader").hide();
        $("#myModal2").modal("show");
      },
    });
  });
});

$(document).ready(function () {
  "use strict";
  $(".table").on("click", ".history", function () {
    "use strict";
    $("#loader").show();
    var iid = $(this).attr("data-id");

    $("#editAppointmentForm").trigger("reset");
    $.ajax({
      url: "patient/getMedicalHistoryByjason?id=" + iid,
      method: "GET",
      data: "",
      dataType: "json",
      success: function (response) {
        "use strict";
        $("#medical_history").html("");
        $("#medical_history").append(response.view);
      },
      complete: function () {
        $("#loader").hide();
      },
    });
    $("#cmodal").modal("show");
  });
});

$(document).ready(function () {
  "use strict";
  $(".doctor_div").on("change", "#adoctors", function () {
    "use strict";
    var iid = $("#date").val();
    var doctorr = $("#adoctors").val();
    $("#aslots").find("option").remove();
    if (iid != '') {
      $.ajax({
        url:
          "schedule/getAvailableSlotByDoctorByDateByJason?date=" +
          iid +
          "&doctor=" +
          doctorr,
        method: "GET",
        data: "",
        dataType: "json",
        success: function (response) {
          "use strict";
          var slots = response.aslots;
          $.each(slots, function (key, value) {
            "use strict";
            $("#aslots").append($("<option>").text(value).val(value)).end();
          });

          if ($("#aslots").has("option").length == 0) {
            //if it is blank.
            $("#aslots")
              .append(
                $("<option>").text(no_available_timeslots).val("Not Selected")
              )
              .end();
          }
        },
      });
    }
    $("#visit_description").html(" ");
    $("#visit_charges").val(" ");
    $.ajax({
      url: "doctor/getDoctorVisit?id=" + doctorr,
      method: "GET",
      data: "",
      dataType: "json",
      success: function (response1) {
        $("#visit_description").html(response1.response).end();
      },
    });
  });
});

$(document).ready(function () {
  "use strict";
  var iid = $("#date").val();
  var doctorr = $("#adoctors").val();
  $("#aslots").find("option").remove();

  $.ajax({
    url:
      "schedule/getAvailableSlotByDoctorByDateByJason?date=" +
      iid +
      "&doctor=" +
      doctorr,
    method: "GET",
    data: "",
    dataType: "json",
    success: function (response) {
      "use strict";
      var slots = response.aslots;
      $.each(slots, function (key, value) {
        "use strict";
        $("#aslots").append($("<option>").text(value).val(value)).end();
      });

      if ($("#aslots").has("option").length == 0) {
        //if it is blank.
        $("#aslots")
          .append(
            $("<option>").text(no_available_timeslots).val("Not Selected")
          )
          .end();
      }
    },
  });
});

$(document).ready(function () {
  "use strict";
  $("#date")
    .datepicker({
      format: "dd-mm-yyyy",
      autoclose: true,
    })
    //Listen for the change even on the input
    // .change(dateChanged)
    .on("changeDate", dateChanged);
});

function dateChanged() {
  "use strict";
  var iid = $("#date").val();
  var doctorr = $("#adoctors").val();
  $("#aslots").find("option").remove();
  if (doctorr != '') {
    $.ajax({
      url:
        "schedule/getAvailableSlotByDoctorByDateByJason?date=" +
        iid +
        "&doctor=" +
        doctorr,
      method: "GET",
      data: "",
      dataType: "json",
      success: function (response) {
        "use strict";
        var slots = response.aslots;
        $.each(slots, function (key, value) {
          "use strict";
          $("#aslots").append($("<option>").text(value).val(value)).end();
        });

        if ($("#aslots").has("option").length == 0) {
          $("#aslots")
            .append(
              $("<option>").text(no_available_timeslots).val("Not Selected")
            )
            .end();
        }
      },
    });
  }
}

$(document).ready(function () {
  "use strict";
  $(".doctor_div1").on("change", "#adoctors1", function () {
    "use strict";

    var id = $("#appointment_id").val();
    var date = $("#date1").val();
    var doctorr = $("#adoctors1").val();
    $("#aslots1").find("option").remove();
    if (date != '') {
      $.ajax({
        url:
          "schedule/getAvailableSlotByDoctorByDateByAppointmentIdByJason?date=" +
          date +
          "&doctor=" +
          doctorr +
          "&appointment_id=" +
          id,
        method: "GET",
        data: "",
        dataType: "json",
        success: function (response) {
          "use strict";
          var slots = response.aslots;
          $.each(slots, function (key, value) {
            "use strict";
            $("#aslots1").append($("<option>").text(value).val(value)).end();
          });

          if ($("#aslots1").has("option").length == 0) {
            //if it is blank.
            $("#aslots1")
              .append(
                $("<option>").text(no_available_timeslots).val("Not Selected")
              )
              .end();
          }
        },
      });
    }
    $("#visit_description1").html("");
    $("#visit_charges1").val(" ");
    $.ajax({
      url: "doctor/getDoctorVisit?id=" + doctorr,
      method: "GET",
      data: "",
      dataType: "json",
      success: function (response1) {
        $("#visit_description1").html(response1.response).end();
      },
    });
  });
});

$(document).ready(function () {
  "use strict";
  var id = $("#appointment_id").val();
  var date = $("#date1").val();
  var doctorr = $("#adoctors1").val();
  $("#aslots1").find("option").remove();

  $.ajax({
    url:
      "schedule/getAvailableSlotByDoctorByDateByAppointmentIdByJason?date=" +
      date +
      "&doctor=" +
      doctorr +
      "&appointment_id=" +
      id,
    method: "GET",
    data: "",
    dataType: "json",
    success: function (response) {
      "use strict";
      var slots = response.aslots;
      $.each(slots, function (key, value) {
        "use strict";
        $("#aslots1").append($("<option>").text(value).val(value)).end();
      });

      if ($("#aslots1").has("option").length == 0) {
        //if it is blank.
        $("#aslots1")
          .append(
            $("<option>").text(no_available_timeslots).val("Not Selected")
          )
          .end();
      }
    },
  });
});

$(document).ready(function () {
  "use strict";
  $("#date1")
    .datepicker({
      format: "dd-mm-yyyy",
      autoclose: true,
    })
    //Listen for the change even on the input
    // .change(dateChanged1)
    .on("changeDate", dateChanged1);
});

function dateChanged1() {
  var id = $("#appointment_id").val();
  var iid = $("#date1").val();
  var doctorr = $("#adoctors1").val();
  $("#aslots1").find("option").remove();
  if (doctorr != '') {
    $.ajax({
      url:
        "schedule/getAvailableSlotByDoctorByDateByAppointmentIdByJason?date=" +
        iid +
        "&doctor=" +
        doctorr +
        "&appointment_id=" +
        id,
      method: "GET",
      data: "",
      dataType: "json",
      success: function (response) {

        "use strict";
        var slots = response.aslots;
        $.each(slots, function (key, value) {
          "use strict";
          $("#aslots1").append($("<option>").text(value).val(value)).end();
        });

        if ($("#aslots1").has("option").length == 0) {
          //if it is blank.
          $("#aslots1")
            .append(
              $("<option>").text(no_available_timeslots).val("Not Selected")
            )
            .end();
        }
      },
    });
  }
}

$(document).ready(function () {
  "use strict";
  $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    "use strict";
    $.fn.dataTable
      .tables({ visible: true, api: true })
      .columns.adjust()
      .responsive.recalc();
  });
});

$(document).ready(function () {
  "use strict";
  var table = $("#editable-sample1").DataTable({
    responsive: true,

    processing: true,
    serverSide: true,
    searchable: true,
    ajax: {
      url: "appointment/getPendingAppoinmentList",
      type: "POST",
    },
    scroller: {
      loadingIndicator: true,
    },
    dom:
      "<'row'<'col-sm-3'l><'col-sm-5 text-center'B><'col-sm-4 text-right'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-5'i><'col-sm-7'p>>",

    buttons: [
      {
        extend: "copyHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "excelHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "csvHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "pdfHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      { extend: "print", exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
    ],
    aLengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    iDisplayLength: 100,
    order: [[0, "desc"]],
    language: {
      lengthMenu: "_MENU_",
      search: "_INPUT_",
      searchPlaceholder: "Search...",
      url: "common/assets/DataTables/languages/" + language + ".json",
    },
  });
  table.buttons().container().appendTo(".custom_buttons");
});

$(document).ready(function () {
  "use strict";
  var table = $("#editable-sample5").DataTable({
    responsive: true,

    processing: true,
    serverSide: true,
    searchable: true,
    ajax: {
      url: "appointment/getAppoinmentList",
      type: "POST",
    },
    scroller: {
      loadingIndicator: true,
    },
    dom:
      "<'row'<'col-sm-3'l><'col-sm-5 text-center'B><'col-sm-4 text-right'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-5'i><'col-sm-7'p>>",
    buttons: [
      { extend: "copyHtml5", exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
      { extend: "excelHtml5", exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
      { extend: "csvHtml5", exportOptions: { columns: [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
      { extend: "pdfHtml5", exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
      { extend: "print", exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
    ],
    aLengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    iDisplayLength: 100,
    order: [[0, "desc"]],
    language: {
      lengthMenu: "_MENU_",
      search: "_INPUT_",
      searchPlaceholder: "Search...",
      url: "common/assets/DataTables/languages/" + language + ".json",
    },
  });
  table.buttons().container().appendTo(".custom_buttons");
});

$(document).ready(function () {
  "use strict";
  var table = $("#editable-sample6").DataTable({
    responsive: true,

    processing: true,
    serverSide: true,
    searchable: true,
    ajax: {
      url: "appointment/getRequestedAppointmentList",
      type: "POST",
    },
    scroller: {
      loadingIndicator: true,
    },
    dom:
      "<'row'<'col-sm-3'l><'col-sm-5 text-center'B><'col-sm-4 text-right'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-5'i><'col-sm-7'p>>",

    buttons: [
      {
        extend: "copyHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "excelHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "csvHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "pdfHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      { extend: "print", exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
    ],
    aLengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    iDisplayLength: 100,
    order: [[0, "desc"]],
    language: {
      lengthMenu: "_MENU_",
      search: "_INPUT_",
      searchPlaceholder: "Search...",
      url: "common/assets/DataTables/languages/" + language + ".json",
    },
  });
  table.buttons().container().appendTo(".custom_buttons");
});



$(document).ready(function () {
  "use strict";
  var table = $("#editable-sample2").DataTable({
    responsive: true,

    processing: true,
    serverSide: true,
    searchable: true,
    ajax: {
      url: "appointment/getConfirmedAppoinmentList",
      type: "POST",
    },
    scroller: {
      loadingIndicator: true,
    },
    dom:
      "<'row'<'col-sm-3'l><'col-sm-5 text-center'B><'col-sm-4 text-right'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-5'i><'col-sm-7'p>>",

    buttons: [
      {
        extend: "copyHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "excelHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "csvHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "pdfHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      { extend: "print", exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
    ],
    aLengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    iDisplayLength: 100,
    order: [[0, "desc"]],
    language: {
      lengthMenu: "_MENU_",
      search: "_INPUT_",
      searchPlaceholder: "Search...",
      url: "common/assets/DataTables/languages/" + language + ".json",
    },
  });
  table.buttons().container().appendTo(".custom_buttons");
});

$(document).ready(function () {
  "use strict";
  var table = $("#editable-sample3").DataTable({
    responsive: true,

    processing: true,
    serverSide: true,
    searchable: true,
    ajax: {
      url: "appointment/getTreatedAppoinmentList",
      type: "POST",
    },
    scroller: {
      loadingIndicator: true,
    },
    dom:
      "<'row'<'col-sm-3'l><'col-sm-5 text-center'B><'col-sm-4 text-right'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-5'i><'col-sm-7'p>>",

    buttons: [
      {
        extend: "copyHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "excelHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "csvHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "pdfHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      { extend: "print", exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
    ],
    aLengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    iDisplayLength: 100,
    order: [[0, "desc"]],
    language: {
      lengthMenu: "_MENU_",
      search: "_INPUT_",
      searchPlaceholder: "Search...",
      url: "common/assets/DataTables/languages/" + language + ".json",
    },
  });
  table.buttons().container().appendTo(".custom_buttons");
});

$(document).ready(function () {
  "use strict";
  var table = $("#editable-sample4").DataTable({
    responsive: true,

    processing: true,
    serverSide: true,
    searchable: true,
    ajax: {
      url: "appointment/getCancelledAppoinmentList",
      type: "POST",
    },
    scroller: {
      loadingIndicator: true,
    },
    dom:
      "<'row'<'col-sm-3'l><'col-sm-5 text-center'B><'col-sm-4 text-right'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-5'i><'col-sm-7'p>>",

    buttons: [
      {
        extend: "copyHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "excelHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "csvHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {
        extend: "pdfHtml5",
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      { extend: "print", exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } },
    ],
    aLengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    iDisplayLength: 100,
    order: [[0, "desc"]],
    language: {
      lengthMenu: "_MENU_",
      search: "_INPUT_",
      searchPlaceholder: "Search...",
      url: "common/assets/DataTables/languages/" + language + ".json",
    },
  });
  table.buttons().container().appendTo(".custom_buttons");
});

$(document).ready(function () {
  "use strict";
  $(".flashmessage").delay(3000).fadeOut(100);
});
$(document).ready(function () {
  "use strict";
  $(".cardPayment").hide();
  $(document.body).on("change", "#selecttype", function () {
    "use strict";
    var v = $("select.selecttype option:selected").val();
    if (v == "Card") {
      $(".cardsubmit").removeClass("d-none");
      $(".cashsubmit").addClass("d-none");
      // $("#amount_received").prop('required', true);
      // $('#amount_received').attr("required");;
      $(".cardPayment").show();
    } else {
      $(".cardPayment").hide();
      $(".cashsubmit").removeClass("d-none");
      $(".cardsubmit").addClass("d-none");
      // $("#amount_received").prop('required', false);
      //$('#amount_received').removeAttr('required');
    }
  });
  $(".card1").hide();
  $(document.body).on("change", "#selecttype1", function () {
    "use strict";
    var v = $("select.selecttype1 option:selected").val();
    if (v == "Card") {
      $(".cardsubmit1").removeClass("d-none");
      $(".cashsubmit1").addClass("d-none");
      // $("#amount_received").prop('required', true);
      // $('#amount_received').attr("required");;
      $(".card1").show();
    } else {
      $(".card1").hide();
      $(".cashsubmit1").removeClass("d-none");
      $(".cardsubmit1").addClass("d-none");
      // $("#amount_received").prop('required', false);
      //$('#amount_received').removeAttr('required');
    }
  });
  $("#pay_now_appointment").change(function () {
    "use strict";
    if ($(this).prop("checked") == true) {
      $(".deposit_type").removeClass("d-none");
      $("#addAppointmentForm").find('[name="deposit_type"]').trigger("reset");
      // $('#editAppointmentForm').find('[name="status"]').val("Confirmed").end()
    } else {
      $("#addAppointmentForm").find('[name="deposit_type"]').val("").end();
      $(".deposit_type").addClass("d-none");
      //  $('#editAppointmentForm').find('[name="status"]').val("").end()

      $(".cardPayment").hide();
    }
  });
  $("#pay_now_appointment1").change(function () {
    "use strict";
    if ($(this).prop("checked") == true) {
      $(".deposit_type1").removeClass("d-none");
      $("#editAppointmentForm").find('[name="deposit_type"]').trigger("reset");
      // $('#editAppointmentForm').find('[name="status"]').val("Confirmed").end()
    } else {
      $("#editAppointmentForm").find('[name="deposit_type"]').val("").end();
      $(".deposit_type1").addClass("d-none");
      //  $('#editAppointmentForm').find('[name="status"]').val("").end()

      $(".card1").hide();
    }
  });
});






$(document).ready(function () {
  "use strict";
  $(".aslots").on("change", "#aslots", function () {
    "use strict";
    var iid = $("#date").val();
    var patient = $("#pos_select").val();
    var current_slot = $("#aslots").val();
    $.ajax({
      url:
        "schedule/getIfPatientIsAvailableOrNot?date=" +
        iid +
        "&patient=" +
        patient + "&current_slot=" + current_slot,
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response.response == "no") {
          alert('Patient already has an appointment on this schedule');
        }
      },
    });
  });
});



$(document).ready(function () {
  "use strict";
  $(".patient_div").on("change", "#pos_select", function () {
    "use strict";
    var iid = $("#date").val();
    var patient = $("#pos_select").val();
    var current_slot = $("#aslots").val();
    $.ajax({
      url:
        "schedule/getIfPatientIsAvailableOrNot?date=" +
        iid +
        "&patient=" +
        patient + "&current_slot=" + current_slot,
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response.response == "no") {
          alert('Patient already has an appointment on this schedule');
        }
      },
    });
  });
});




$(document).ready(function () {
  "use strict";
  $("#date")
    .datepicker({
      format: "dd-mm-yyyy",
      autoclose: true,
    })
    //Listen for the change even on the input

    .on("changeDate", dateChanged2);
});

function dateChanged2() {
  "use strict";
  var iid = $("#date").val();
  var patient = $("#pos_select").val();
  var current_slot = $("#aslots").val();
  $.ajax({
    url:
      "schedule/getIfPatientIsAvailableOrNot?date=" +
      iid +
      "&patient=" +
      patient + "&current_slot=" + current_slot,
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response.response == "no") {
        alert('Patient already has an appointment on this schedule');
      }
    },
  });
}










$(document).ready(function () {
  "use strict";
  $(".aslots").on("change", "#aslots1", function () {
    "use strict";
    var iid = $("#date1").val();
    var patient = $("#pos_select1").val();
    var doctor = $("#adoctors1").val();
    var current_slot = $("#aslots1").val();
    var appointment_id = $("#appointment_id").val();
    $.ajax({
      url:
        "schedule/getIfPatientIsAvailableOrNot?date=" +
        iid +
        "&patient=" +
        patient +
        "&current_slot=" +
        current_slot +
        "&appointment_id=" +
        appointment_id +
        "&doctor=" +
        doctor,
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response.response == "no") {
          alert("Patient already has an appointment on this schedule");
        }
      },
    });
  });
});

$(document).ready(function () {
  "use strict";
  $(".patient_div").on("change", "#pos_select1", function () {
    "use strict";
    var iid = $("#date1").val();
    var patient = $("#pos_select1").val();
    var doctor = $("#adoctors1").val();
    var current_slot = $("#aslots1").val();
    var appointment_id = $("#appointment_id").val();
    $.ajax({
      url:
        "schedule/getIfPatientIsAvailableOrNot?date=" +
        iid +
        "&patient=" +
        patient +
        "&current_slot=" +
        current_slot +
        "&appointment_id=" +
        appointment_id +
        "&doctor=" +
        doctor,
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response.response == "no") {
          alert("Patient already has an appointment on this schedule");
        }
      },
    });
  });
});

$(document).ready(function () {
  "use strict";
  $("#date1")
    .datepicker({
      format: "dd-mm-yyyy",
      autoclose: true,
    })
    //Listen for the change even on the input

    .on("changeDate", dateChanged3);
});

function dateChanged3() {
  "use strict";
  var iid = $("#date1").val();
  var patient = $("#pos_select1").val();
  var doctor = $("#adoctors1").val();
  var current_slot = $("#aslots1").val();
  var appointment_id = $("#appointment_id").val();
  $.ajax({
    url:
      "schedule/getIfPatientIsAvailableOrNot?date=" +
      iid +
      "&patient=" +
      patient +
      "&current_slot=" +
      current_slot +
      "&appointment_id=" +
      appointment_id +
      "&doctor=" +
      doctor,
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response.response == "no") {
        alert("Patient already has an appointment on this schedule");
      }
    },
  });
}
