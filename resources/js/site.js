import $ from 'jquery';
import remodal from 'remodal';
import { Loader } from "@googlemaps/js-api-loader";

window.$ = window.jQuery = $;

const loader = new Loader({
    apiKey: "AIzaSyAXqiPpYvU5Ow9nOiYcl3D-3BKoURdDpY4",
    version: "weekly"
});

$(function () {
    $('nav a').hover(function () {
        var a = Math.random() * 10 - 5;
        $(this).css('transform', 'rotate(' + a + 'deg) scale(1.25)');
    }, function () {
        $(this).css('transform', 'none');
    });
});

$(function () {
    $('.map').each(function () {
        let mapEl = $(this);

        // get the address from the data attribute
        var address = $(this).data('address');
        var city = $(this).data('city');
        var state = $(this).data('state');
        var zip = $(this).data('zip');
        var fullAddress = address + ', ' + city + ', ' + state + ' ' + zip;
        console.log(fullAddress);

        // create a new geocoder to get the lat/long of the address
        loader.load().then(() => {
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode({ address: fullAddress }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    // Extract the latitude and longitude from the first result
                    const location = results[0].geometry.location;
                    const latitude = location.lat();
                    const longitude = location.lng();

                    console.log("Latitude:", latitude);
                    console.log("Longitude:", longitude);

                    // Create a new Map instance
                    const map = new google.maps.Map(mapEl[0], {
                        center: { lat: latitude, lng: longitude },
                        zoom: 15,
                        disableDefaultUI: true
                    });

                    // Add a marker for the result
                    const marker = new google.maps.Marker({
                            map: map,
                            position: { lat: latitude, lng: longitude }
                        });

                    // Add an info window with the address information
                    const infowindow = new google.maps.InfoWindow({
                        content: fullAddress
                    });

                    infowindow.open(map, marker);
                } else {
                    console.error("Geocoding request failed. Status:", status);
                }
            });
        });
    });
});

$(function () {
    // smooth scroll to locations
    $('a[href*="#pantries"]').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 500, 'linear');
    });
});
