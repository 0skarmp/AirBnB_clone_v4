// $(document).ready(function() {
//     let lista = {};

//     $('input[type="checkbox"]').change(function() {
//         let amenityId = $(this).data('id');
//         let amenityName = $(this).data('name');

//         if ($(this).prop('checked')) {
//             lista[amenityId] = amenityName;
//         } else {
//             delete lista[amenityId];
//         }

//         $('.amenities h4').text(Object.values(lista).join(', '));
//     });

//     // Petición GET para obtener el estado de la API
//     $.ajax({
//         type: "GET",
//         url: "http://127.0.0.1:5001/api/v1/status/",
//         dataType: "json"
//     })
//     .done(function(response) {
//         if (response.status === 'OK') {
//             $("#api_status").addClass('available');
//         } else {
//             $("#api_status").removeClass('available');
//         }
//     })
//     .fail(function(jqXHR, textStatus, errorThrown) {
//         console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
//     });

//     // Petición POST para obtener la lista de lugares
//     $.ajax({
//         type: "POST",
//         url: "http://127.0.0.1:5001/api/v1/places_search",
//         dataType: "json",
//         contentType: "application/json",
//         data: JSON.stringify({})  // Cuerpo de la solicitud JSON vacío
//     })
//     .done(function(response) {
//         let template = '';
//         response.forEach(place => {
//             template += `
//             <article>
//               <div class="title_box">
//                 <h2>${place.name}</h2>
//                 <div class="price_by_night">$${place.price_by_night}</div>
//               </div>
//               <div class="information">
//                 <div class="max_guest">${place.max_guest} Guest</div>
//                 <div class="number_rooms">${place.number_rooms} Bedroom</div>
//                 <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
//               </div>
//               <div class="description">${place.description}</div>
//             </article>`;
//         });
//         $('.places').append(template);

    
//     });
    
//     $'input[type="button"]').click(function)(){

//         $.ajax({
//             method: "POST",
//             url: "http://127.0.0.1:5001/api/v1/places_search/",
//             data: JSON.stringify({'amenities': Object.keys(amenities)}),
//             contentType: 'application/json',
//             dataType: 'json',
//           }).done( (response) => {
//             response.forEach(function (place) {
//               let html = ``;
//               $.ajax({
//                 method: 'GET',
//                 url: http://127.0.0.1:5001/api/v1/places/${place.id}/amenities
//               }).done((data) => {
//                 let amenitiesId = [];
//                 data.forEach(function (amen) {
//                   amenitiesId.push(amen.name);
//                 });
//                 const amenity = amenitiesId.join(', ');
//                 html += `
//                 <article>
//                   <div class="title_box">
//                     <h2>${ place.name }</h2>
//                     <div class="price_by_night">$${ place.price_by_night }</div>
//                   </div>
//                   <div class="information">
//                     <div class="max_guest">${ place.max_guest } Guest</div>
//                       <div class="number_rooms">${ place.number_rooms } Bedroom</div>
//                       <div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>
//                   </div>
//                   <div class="user">
//                     <b>Amenities:</b> ${ amenity }
//                   </div>
//                   <div class="description">${ place.description }</div>
//                 </article>
//                 `
//                 $('.places').append(html);
//               });
//             });
//           }).fail((error) => {
//             console.log("Error " + error);
//           });

//         })
    
//     }
    
// });

$(document).ready(function() {
    let amenities = {};

    $('input[type="checkbox"]').change(function() {
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            amenities[amenityId] = amenityName;
        } else {
            delete amenities[amenityId];
        }

        $('.amenities h4').text(Object.values(amenities).join(', '));
    });

    // Petición GET para obtener el estado de la API
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5001/api/v1/status/",
        dataType: "json"
    })
    .done(function(response) {
        if (response.status === 'OK') {
            $("#api_status").addClass('available');
        } else {
            $("#api_status").removeClass('available');
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
    });

    // Petición POST para obtener la lista de lugares
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5001/api/v1/places_search",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({})  // Cuerpo de la solicitud JSON vacío
    })
    .done(function(response) {
        let template = '';
        response.forEach(place => {
            template += `
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest</div>
                <div class="number_rooms">${place.number_rooms} Bedroom</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
              </div>
              <div class="description">${place.description}</div>
            </article>`;
        });
        $('.places').append(template);
    });

    $('input[type="button"]').click(function() {
        // Hacer una nueva solicitud POST a places_search con las comodidades seleccionadas
        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:5001/api/v1/places_search/",
            data: JSON.stringify({ 'amenities': Object.keys(amenities) }),
            contentType: 'application/json',
            dataType: 'json'
        }).done(function(response) {
            response.forEach(function(place) {
                let html = ``;
                $.ajax({
                    method: 'GET',
                    url: `http://127.0.0.1:5001/api/v1/places/${place.id}/amenities`
                }).done(function(data) {
                    let amenitiesId = [];
                    data.forEach(function(amen) {
                        amenitiesId.push(amen.name);
                    });
                    const amenity = amenitiesId.join(', ');
                    html += `
                    <article>
                      <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                      </div>
                      <div class="information">
                        <div class="max_guest">${place.max_guest} Guest</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
                      </div>
                      <div class="user">
                        <b>Amenities:</b> ${amenity}
                      </div>
                      <div class="description">${place.description}</div>
                    </article>
                    `
                    $('.places').append(html);
                });
            });
        }).fail(function(error) {
            console.log("Error " + error);
        });
    });
});
