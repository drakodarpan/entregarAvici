$().ready(function(){

    $.getJSON('ciudadesEspana.json', function(contenido) {
        console.log('Ciudades')

        $.each(contenido.ciudades, function(indice, nombre){
            console.log('>', indice + ' - ' + nombre)
        })
    });

});