/**
 * Login File
 */
$(function() {
    //Login
    $('body').on('submit', '#form-login', function(e) {
        e.preventDefault();
        
        location.hash = '#gallery';

        /*
        var este        = $(this);
        var data        = este.serializeObject();
        $.post('http://reeport.desarrollo22.com/account/sessions/login', $.toJSON(data), function(r){
            if(parseInt(r) > 0) {
                $.cookie('id', parseInt(r), { path: '/' });
                location.hash = '#reeport';
            } else {
                alert('El email y/o contraseña son incorrectos.');
            }
        }, 'json').fail(function() {
            alert('fail');
        }).always(function() {

        });
        return false;
        */
    });

    //Signup
    $('body').on('submit', '#form-signup', function(e) {
        e.preventDefault();
        var este        = $(this);
        var data        = este.serializeObject();
        $.post('http://reeport.desarrollo22.com/account/sessions/signup', $.toJSON(data), function(r){
            if(parseInt(r) > 0) { //Devuelve el id del usuario
                $.cookie('id', parseInt(r), { path: '/' });
                location.hash = '#reeport';
            } else if(parseInt(r) === -2) {
                alert('El email ingresado ya se encuentra registrado.');
            } else if(parseInt(r) === -3) {
                alert("Las contraseñas no coincien");
            } else {
                alert('Oops! We have encountered an error while trying to create your account. Please try again.');
            }
        }, 'json').fail(function() {
            alert('fail');
        }).always(function() {
            
        });
        return false;
    });
})