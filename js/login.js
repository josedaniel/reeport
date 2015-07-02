/**
 * Login File
 */
$(function() {
    
    /* FACEBOOK LOGIN */
    $('body').on('click', "#f-login", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $.facebook.initialize('fLogin');// Callback fLogin
    });
        
    //Login
    $('body').on('submit', '#form-login', function(e) {
        e.preventDefault();
      
        var eqty = 0;
        $('#form-login .required').each(function(){
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
            $.post('http://reeport.desarrollo22.com/account/sessions/login', $.toJSON(data), function(r){
                if(parseInt(r) > 0) {
                    localStorage.setItem('id', parseInt(r));
                    location.hash = '#reeport';
                } else {
                    alert('El email y/o contraseña son incorrectos.');
                }
            }, 'json').fail(function() {
                alert('fail');
            }).always(function() {

            });
            return false;

        }

    });

    //Signup
    $('body').on('submit', '#form-signup', function(e) {
        e.preventDefault();
        
        var eqty = 0;
        $('#form-signup .required').each(function(){
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
            $.post('http://reeport.desarrollo22.com/account/sessions/signup', $.toJSON(data), function(r){
                if(parseInt(r) > 0) { //Devuelve el id del usuario
                    localStorage.setItem('id', parseInt(r));
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
        }else{
            console.log('validation errors');
        }
    });
});

/* CALLBACK LOGIN */
//Facebook
function fLogin(authResult) {
    $.facebook.profile(function(data) {
        data.network_id = data.id;
        data.full_name  = data.first_name+' '+data.last_name;
        $.post('http://reeport.desarrollo22.com/account/sessions/loginNetwork/facebook/', $.toJSON(data), function(r) {
            if(parseInt(r) > 0) {
                localStorage.setItem('id', parseInt(r));
                location.hash   = '#reeport';
            } else {
                fSignup(authResult);
            }
        }, 'json').fail(function() {
            aler('Lo sentimos, pero no se pudo establecer conexión con el servidor. Por favor intenta más tarde');
        });
    });
}
//Facebook Signup - Method
function fSignup(authResult) {
    var modal   = $('#modal-signup');
    $.facebook.profile(function(data) {
        data.network_id = data.id;
        data.network    = 'facebook';
        data.full_name  = data.first_name+' '+data.last_name;
        $.facebook.picture(200, 200, function(avatar) {
            data.avatar = avatar;
            $.post('http://reeport.desarrollo22.com/account/sessions/signup/facebook/', $.toJSON(data), function(r) {
                if(parseInt(r) > 0) { 
                    localStorage.setItem('id', parseInt(r));
                    location.hash   = '#reeport';
                } else {
                    alert('Oops! Hemos encontrado un error interno al verificar tu cuenta. Por favor intenta más tarde.');
                }
            }, 'json').fail(function() {
                alert('Lo sentimos, pero no se pudo establecer conexión con el servidor. Por favor intenta más tarde');
            });
        });
    });
}