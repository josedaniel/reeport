$(function(){
    
    //define the start page
    if(!location.hash) {
        var userLogged  = $.cookie('id');
        if(parseInt(userLogged) > 0) {
            location.hash = '#reeport';
        } else {
            location.hash = '#start';
        }
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
    	location.hash = '#login';
    });


    //toggle share buttons
    $('body').on('click', '.this_button',function(e){
        e.preventDefault();
        $(this).toggleClass('active');
    });


    //open the cam and upload the picture
    $('body').on('click', '.reeport_action .reportar',function(e){
        e.preventDefault();
        $(this).removeClass('active');
        $('.reeport_action span').addClass('active');

        setTimeout(function(){
            location.hash = '#tag';     
        },4000);
        
    });


    //tag and reeport
    $('body').on('click', '#page_tag button[type="submit"]',function(e){
        e.preventDefault();
        location.hash = '#thanks';
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
        $.removeCookie('id');
        $.get('http://reeport.desarrollo22.com/account/profile/save/', function(r) {
            //TODO
        }, 'json').fail(function() {
            
        });
        location.hash = '#start';
    });




    /***********
     * PROFILE
     **********/
    $('body').on('submit', '#form-profile', function(e) {
        var este    = $(this);
        var data    = este.serializeObject();
        $.post('http://reeport.desarrollo22.com/account/profile/save/', $.toJSON(data), function(r) {
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

        });
        return false;
    })


});