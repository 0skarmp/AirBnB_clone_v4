$(document).ready(function(){
    let lista = {};

    $('input[type="checkbox"]').change(function() {
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            lista[amenityId] = amenityName;
        } else {
            delete lista[amenityId];
        }

        $('.amenities h4').text(Object.values(lista).join(', '));
    });
});