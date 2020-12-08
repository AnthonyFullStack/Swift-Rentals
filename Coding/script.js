var iDays = 1
var iPeople = 1

var sChoice = ''
var iPrice = 0

var fFuelRate = 0

var iTotal = 0

$('.button4').on('click',function(){
    $('.section4').removeClass('open')
    $('.section5').addClass('open')
})

$('.button5').on('click',function(){
    $('.section5').removeClass('open')
    $('.section1').addClass('open')
})

$('.signup-form').validate({
    rules:{
        email:{
            required:true,
            email:true
        },
        check1:{
            required:true,
       
        },
    },
    messages:{
        email:{
            required:'',
            email:''
        },
        check1:{
            required:'',
       
        },
    },
    highlight:function(el){

        el.style.outline = '0.15em red solid'
    },
    unhighlight:function(el){
      
        el.style.outline = ''
    },
    submitHandler: function(form) {
        // do other things for a valid form
        $('.section1').removeClass('open')
        $('.section2').addClass('open')
    }
})
$('.form2').validate({
    rules:{
        'my-days':{
            required:true,
      
        },

    },
    messages:{
        'my-days':{
            required:'',
        },

    },
    highlight:function(el){

        el.style.outline = 'thin red solid'
    },
    unhighlight:function(el){
      
        el.style.outline = ''
    },
    submitHandler: function(form) {
        // do other things for a valid form
        $('.section2').removeClass('open')
        $('.section3').addClass('open')
        iPeople = parseInt($('#slct2').val())
        // console.log(iPeople)
        // console.log(iDays)

        if(iPeople==1 && 1<=iDays && iDays<=5){
            $('.choice-motorbike').addClass('available')
        }

        if(iPeople<=2 && 1<=iDays && iDays<=10){
            $('.choice-smallcar').addClass('available')
        }

        if(iPeople<=5 && iDays>=3 && iDays<=10){
            $('.choice-largecar').addClass('available')
        }

        if(iPeople>=2 && iPeople<=6 && iDays>=2 && iDays<=15){
            $('.choice-motorhome').addClass('available')
        }
    }
})

$('.choice').on('click',function(){

    iPrice = parseInt($(this).data('price'))
    sChoice = $(this).data('choice')
    fFuelRate = parseFloat($(this).data('fuel'))
    iTotal = iDays * iPrice
    // console.log(iPrice)
    // console.log(fFuelRate)
    // console.log(iTotal)

    $('#inputSeconds').val(fFuelRate)

    $('.section3').removeClass('open')
    $('.section4').addClass('open')

    document.querySelector("#vehicleprice").innerHTML = iTotal
    $(document).scrollTop(0)

})

var lightpick = new Lightpick({
    field:document.querySelector('.my-days'),
    singleDate:false,
    numberOfMonths:1,
    minDate:moment(),
    maxDate:moment().add(14,'day'),
    onSelect: function(start,end){

        if(end != null){
            iDays = end.diff(start,'days') + 1
            document.querySelector('.days').innerHTML = iDays 
        }
    }
})

function initMap(){
        //distanceService = new google.maps.DistanceMatrixService()
        distanceService = new google.maps.
        DistanceMatrixService()
}

$(function(){
    
    $('button').on('click',function(e){
        e.preventDefault()
        var sFrom = $('#from').val()
        var sTo = $('#to').val()

        var request = {
            origins: [sFrom + ' New Zealand'],
            destinations: [sTo  + ' New Zealand'],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            durationInTraffic: true,
            avoidHighways: false,
            avoidTolls: false
        }
        distanceService.getDistanceMatrix(request,function (response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                console.log('Error:', status)
            } else {
                // console.log(response);
                $('h1>span').html(response.rows[0].elements[0].distance.value)
                $('.distance').html(response.rows[0].elements[0].distance.text)
                $('.time').html(response.rows[0].elements[0].duration_in_traffic.text)
            }
        })
    })
})


  //Fuel cost calculator
  function calculateFuelCost() {
    var feet = document.getElementById("inputFeet").value;
    var time = document.getElementById("inputSeconds").value;
    var minutes = document.getElementById("inputMinutes").value;
    var mph = ((feet * time) / 100) * minutes;
  
    document.getElementById("result").innerHTML = mph.toFixed(2);
  }


