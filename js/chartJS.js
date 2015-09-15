var ExecuteChart = function(){
  var opciones = []
  opciones = {
    "chkPrecioRenta" : function(opcion){
      chkPrecioRenta(opcion)
    },
    "chkCantidadEstaciones" : function(opcion){
      chkCantidadEstaciones(opcion)
    },
    "default" : function(){
      alert("Favor de seleccionar un [ INDICADOR ]...")
    }
  }

  if($('#chkPrecioRenta').is(':checked')){
    opciones['chkPrecioRenta'](1)
  } else {
    opciones['chkPrecioRenta'](0)
  }

  if($("#chkCantidadEstaciones").is(':checked')){
    opciones['chkCantidadEstaciones'](1)
  } else {
    opciones['chkCantidadEstaciones'](0)
  }
}

// Opciones de renta
function chkPrecioRenta(nOpcion){
  if( nOpcion === 1){
    var selectedArray = new Array(),
        ciudades = document.getElementById("ciudad"),
        ciudad = "", count = 0, odd_even = false,
        tbl_row1 = "", tbl_body1 = "", odd_even1 = false, tbl_body = new Array()

    for( var i = 0; i < ciudades.options.length; i++){
      if( ciudades.options[i].selected){
        selectedArray[count] = ciudades.options[i].value
        ciudad = selectedArray[count]

        tbl_body[i] += showTable(ciudad)
      }
    }

    if( ciudad !== ''){
      tbl_row1 += "<th>CIUDAD</th>"
      tbl_row1 += "<th>TIPO DE TARIFA</th>"
      tbl_row1 += "<th>TARIFA</th>"
      tbl_body1 += "<tr>" + tbl_row1 + "</tr>"

      tbl_body = tbl_body1 += tbl_body
      $('th').eq(2).css('background-color', 'lightblue')
      $("#myTable").html(tbl_body)
      $("#myTable").show()
    }
  } else {
    $("#myTable").hide()
  }
}

var showTable = function(ciudad){
  var tbl_row = "", tbl_body = "", odd_even = false

  $.ajax({
    url: 'db/ciudades.json',
    dataType: 'json',
    //data: data,
    async: false,
    success: function(json){
      tbl_body = "", odd_even = false

      $.each(json, function(key, val){
        if( val.ciudad === ciudad ){
          tbl_row = ""
          $.each(this, function(k,v){
            tbl_row += "<td>" + v + "</td>"
          })

          tbl_body += "<tr>" + tbl_row + "</tr>"
          odd_even = !odd_even
        }
      })
    }
  })

  return tbl_body
}
// Fin opciones de renta

// Inicio grafica cantidad de estaciones
function chkCantidadEstaciones(nOpciones){
  if( nOpciones === 1 ){
    var selectedArray = new Array(),
        ciudades = document.getElementById("ciudad"),
        ciudad = new Array()

    var options = {
      // data: [
      //   theme: "theme2",
      //   title:{
      //     text: "Total de estaciones"
      //   },
      //   animationEnable: true,
        data:[{
          type: "column",
          dataPoints: [ ]
        }]
      //]
    }

    $("#chartEstaciones").CanvasJSChart(options)
    var chart = $("#chartEstaciones").CanvasJSChart()

    for( var i = 0; i < ciudades.options.length; i++){
      if( ciudades.options[i].selected){
        var length = chart.options.data[0].dataPoints.length
        chart.options.data[0].dataPoints.push({ label: ciudad, y: consultaEstacionesJSON(ciudad) })

      }
    }

    chart.render()
    $("#chartEstaciones").show()
  }else {
    $("#chartEstaciones").hide()
  }
}

function showEstacionalesBar(chart, ciudad){


  var chart = new CanvasJS.Chart("chartEstaciones", {
    theme: "theme2",
    title:{
      text: "Total de estaciones"
    },
    animationEnable: true,
    data:[{
      type: "column",
      dataPoints: [ { label: ciudad, y: consultaEstacionesJSON(ciudad) } ]
    }]
  })

  chart.render()
}

function consultaEstacionesJSON(ciudad){
  var valor = 0, i = 0, j = 0
  $.ajax({
    url: 'db/estaciones.json',
    dataType: 'json',
    //data: data,
    async: false,
    success: function(json){
      $.each(json, function(key, val){
        if( val.ciudad === ciudad ){
          $.each(this, function(k,v){
            if( v >= 0){
              valor = v
            }
          })
        }
      })
    }
  })

  return parseInt(valor)
}
// Fin grafica cantidad de estaciones
