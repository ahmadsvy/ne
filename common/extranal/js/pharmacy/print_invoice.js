"use strict";
$('#download').click(function () {
    "use strict";
    var pdf = new jsPDF('p', 'pt', 'letter');
    pdf.addHTML($('#invoice'), function () {
        pdf.save('invoice_id_' + payment_id + '.pdf');
    });
});
"use strict";


window.print();

$(document).ready(function () {
    "use strict";
    $(".flashmessage").delay(3000).fadeOut(100);
});
