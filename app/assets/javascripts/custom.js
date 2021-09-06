//= require jquery3
//= require popper
//= require bootstrap
//= require jquery.inputmask.bundle.min


$(document).on('turbolinks:load', function() {
    $('#card_number').inputmask("9999 9999 9999 9999");
    $("#exp_date").inputmask('99/99');
    $("#cvc").inputmask('9999');
    $('#postal').inputmask('999999');
});