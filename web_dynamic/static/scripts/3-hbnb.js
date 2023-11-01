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

    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5001/api/v1/status/",
        dataType: "json"
    })
    .done(function(response) {
        // Código a ejecutar en caso de éxito
        if (response.status === 'OK') {
            $("#api_status").addClass('available');
        } else {
            $("#api_status").removeClass('available');
        }
    })
    .fail(function(textStatus, errorThrown) {
        // Código a ejecutar en caso de error
        console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
    });

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5001/api/v1/places_search",
        dataType: "json",
        contentType: "application/json"
    })

    .done(function(response){
        let template = ``
        response.forEach(place =>{
            template += 
            `<article>
              <div class="title_box">
                <h2>${ place.name }</h2>
                <div class="price_by_night">$${ place.price_by_night }</div>
              </div>
              <div class="information">
                <div class="max_guest">${ place.max_guest } Guest</div>
                  <div class="number_rooms">${ place.number_rooms } Bedroom</div>
                  <div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>
              </div>
              <div class="description">${ place.description }</div>
            </article>`
          });
          $('.places').append(template);
        })
            
        });
    })    
});
