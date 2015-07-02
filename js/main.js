$(function(){
    
    //define the start page
    if(!location.hash) {        
        location.hash = '#start';        
    }

    //application init
    var app = new reeport;
        app.init().route(location.hash);

    //listen for hash changes
    $(window).on('hashchange', function() {
        app.route(location.hash);
    });

    //back buttons accross all the app
    $('body').on('click','.back_button',function(e){
    	e.preventDefault();
    	app.back();
    });

    //signup button
    $('body').on('click','.social_login_btn.correo',function(e){
    	e.preventDefault();
    	location.hash = '#signup';
    });


    //toggle share buttons
    $('body').on('click', '.this_button',function(e){
        e.preventDefault();
        $(this).toggleClass('active');
    });


    //open the cam and upload the picture
    $('body').on('click', '.reeport_action .reportar',function(e){
        e.preventDefault();
        $('#picture').click();       
    });

    //thank you page action
    $('body').on('click', '#page_thanks button[type="submit"]',function(e){
        e.preventDefault();
        location.hash = '#reeport';
    });


    /**********
     * LOGOUT
     **********/
    $('body').on('click', '.logout', function(e) {
        e.preventDefault();
        localStorage.setItem('id', 0);;
        $.get('http://reeport.desarrollo22.com/account/sessions/logout/', function(r) {
            //TODO
        }, 'json').fail(function() {
            
        });
        location.hash = '#start';
    });




    /***********
     * PROFILE
     **********/
    $('body').on('submit', '#form-profile', function(e) {
        e.preventDefault();
        var eqty = 0;
        $('#form-profile .required').each(function(){
            if($(this).val() == ''){
                eqty += 1;
                $(this).next().show();
            }else{
              $(this).next().hide();  
            }
        });

        if(eqty == 0){
        
            var id  = parseInt(localStorage.getItem('id'));
            if(!id > 0) {
                location.hash = '#start';
                return false;
            }
            
            var este    = $(this);
            var data    = este.serializeObject();        
            $.post('http://reeport.desarrollo22.com/account/profile/save/'+id, $.toJSON(data), function(r) {
                if(parseInt(r) > 0) {
                    location.hash = '#reeport';
                } else if(parseInt(r) == -2) {
                    alert('Las contraseñas no coinciden');
                } else if(parseInt(r) == -3) {
                    alert('El email ingresado ya está registrado o no se encuentra disponible.');
                } else {
                    alert('Error al actualizar');
                }
            }, 'json').fail(function() {
                alert('Por favor vuelve a iniciar sesión');
                location.hash = '#start';
            });
            return false;
        }

    });
    
    
    /*************
     * SEND REPORT
     *************/
    $('body').on('submit', '#form-report', function(e) {
        e.preventDefault();

        var eqty = 0;
        $('#form-report .required').each(function(){
            if($(this).val() == ''){
                eqty += 1;
                $(this).next().show();
            }else{
              $(this).next().hide();  
            }
        });

        if(eqty == 0){
            var este        = $(this);
            var data        = este.serializeObject();
            
            if(localStorage.getItem('latitude') !== undefined) {
                data.latitude   = localStorage.getItem('latitude');
            }
            if(localStorage.getItem('longitude') !== undefined) {
                data.longitude  = localStorage.getItem('longitude');
            }

            var template_data = {
                'source'    : data.picture,
                'ubicacion' : data.location,
                'placa'     : data.plate,
                'latitude'  : data.latitude,
                'longitude' : data.longitude,
                'user_id'   : data.user_id
            }

            template_data = JSON.stringify(template_data);
            localStorage.setItem('tag', template_data);


            $.post('http://reeport.desarrollo22.com/account/reports/create/', $.toJSON(data), function(r) {            
                localStorage.setItem('report_id', r.id);
                location.hash = '#thanks';
                setTimeout(function() {
                    $('#thanks-image').attr('style', 'background-image:url("'+r.picture+'");');            
                }, 500);
            }, 'json').fail(function() {
                alert('Lo sentimos, pero no pudimos guardar tu reporte. Por favor inténtalo nuevamente.');
            });        
            return false;
        }
    });


});

function showTagForm(res, input) {
    var res         = res;
    var id  = parseInt(localStorage.getItem('id'));
    if(!id > 0) {
        location.hash = '#start';
        return false;
    }
    if(localStorage.getItem('report_id')) {
        location.hash = '#reeport';
    }
    res.placa       = '';
    res.ubicacion   = '';
    res.latitude    = '';
    res.longitude   = '';
    res.user_id     = '';
    res.facebook    = 0;
    res.twitter     = 0;
    
    var lat         = localStorage.getItem('latitude');
    var log         = localStorage.getItem('longitude');
    
    if(lat !== undefined && log !== undefined) {
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+log+'&key=AIzaSyAuz12IXLEDVI43wsCrdTWEuAgMDfQjnRI', function(r) {                        
            res.ubicacion = r.results[0].formatted_address;                         
            var data = JSON.stringify(res);           
            localStorage.setItem('tag', data);
            location.hash = '#tag';            
        }, 'json').fail(function() {            
            var data = JSON.stringify(res);           
            localStorage.setItem('tag', data);
            location.hash = '#tag';
        });        
    } else {
        var data = JSON.stringify(res);           
        localStorage.setItem('tag', data);
        location.hash = '#tag';        
    }
    
    
}




/*******************
 * Social Links
 ******************/
$('body').on('click', '.social-link', function(e){
    e.preventDefault();    
    var este    = $(this);
    var destiny = este.attr('href');
    if(este.hasClass('social-facebook') && (typeof(FB) !== undefined)) {
        var url = window.location;
        var obj = {
            method: 'feed',
            name: este.attr('data-title'),
            picture: (este.attr('data-picture') !== undefined) ? este.attr('data-picture') : url.protocol+'//'+url.hostname+'/theme/img/fb_share.jpg',
            link: (este.attr('data-link') !== undefined) ? este.attr('data-link') : url.protocol+'//'+url.hostname,
            description: este.attr('data-description')
        };
        $.facebook.share(obj);
    } else if(este.hasClass('social-twitter')) {
        var txt = ($(this).attr('data-description') !== undefined) ? $(this).attr('data-description') : false;
        if(txt) {
            var url     = (este.attr('data-link') !== undefined) ? este.attr('data-link') : url.protocol+'//'+url.hostname;
            var destiny = 'https://twitter.com/intent/tweet?text='+txt+'&url='+url;
        }
        window.open(destiny, 'share', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    } else if(este.hasClass('social-google')) {
        var url         = (este.attr('data-link') !== undefined) ? este.attr('data-link') : este.attr('href');
        var destiny     = 'https://plus.google.com/share?url='+url;
        window.open(destiny, 'share', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    } else {
        window.open(destiny, 'share', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    }
    
    $('body').on('click', '.js-scroll', function(e) {
        e.preventDefault();
        var page         = parseInt($(this).attr('data-page'));
        $(this).remove();
        if(page <= 1) {
            return;
        }
        loadMyWall(page);
    });
});


function loadMyWall(page) {           
    var id  = parseInt(localStorage.getItem('id'));
    if(!id > 0) {
        location.hash = '#start';
        return false;
    }
    //Wall Feed
    $("#my_feed").endlessScroll({
        //bottomPixels: 20,
        fireOnce: true,
        fireDelay: false,        
        intervalFrequency: 2000,
        callback: function() {
            $(this).find('a.js-scroll:last').click();
        }
    });
    
    page    = parseInt(page) > 0 ? parseInt(page) : 1;
    $.get('http://reeport.desarrollo22.com/account/reports/getAll/'+id+'/?page='+page, function(r) {
        if(r.items !== undefined) {                                
            var source      = $('#wall').html();
            var template    = Handlebars.compile(source);
            var page        = template(r);            
            $('#gallery-wall').append(page);
            if(r.next) {
                $("#gallery-wall").append('<div class="this_report scroll-link"><a href="/" data-page="'+r.next+'" class="js-scroll hide"></a></div>');
            }
        }
    }).fail(function() {});    
}