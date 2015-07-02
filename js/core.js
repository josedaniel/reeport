/* 
    reeport 1.0 
    Humans in charge: Ivan Melendez, Sergio Martinez, Jose Paternina
    Copyrigth 2015 
*/
var reeport = function(){

    this.init = function(slider){
        
        var userLogged  = localStorage.getItem('id');
        if(parseInt(userLogged) > 0) {
            location.hash = '#reeport';
        } else {
            location.hash = '#start';
        }
        return this;
    }
    
    this.route = function(route){
        console.log(route);
        var data = {};

        if(route == '#tag' || route == '#thanks'){
            var data            = localStorage.getItem('tag');
                data = JSON.parse(data);
                data.user_id    = localStorage.getItem('id');                
        }

        

        var source   = $(route).html();
        var template = Handlebars.compile(source);
        var page = template(data);

        $('.wrapper').html(page).scrollTop(0);

        if(route == '#reeport') {
            this.loadReport();
        } else if(route == '#profile') {
            this.loadProfile();
        } else if(route == '#thanks') {
            this.loadThanks();
        } else if(route == '#tag') {
            this.loadTag();
        } else if(route == '#my-feed') {
            this.loadMyFeed();
        }

        return this;
    }

    this.back = function(){
        history.back();
    }

    this.notify = function(title, message, action, dissmiss){
        alert(message);
        return this;
    }

    this.loadReport = function() {
        var id  = parseInt(localStorage.getItem('id'));
        if(!id > 0) {            
            location.hash = '#start';
            return;
        }

        $.get('http://reeport.desarrollo22.com/account/reports/status/'+id, function(r) {
            if(r.error === undefined) {
                $('.stats').find('.total-reportes').html(r.reportes);
                $('.stats').find('.total-puntaje').html(r.puntaje);
            } else {
                alert('error');
            }
        }).fail(function() {

        });

    }

    this.loadProfile = function() {
        var id  = parseInt(localStorage.getItem('id'));
        if(!id > 0) {
            location.hash = '#start';
        }

        $.get('http://reeport.desarrollo22.com/account/reports/status/'+id, function(r) {
            if(r.error === undefined) {
                $('.stats').find('.total-reportes').html(r.reportes);
                $('.stats').find('.total-puntaje').html(r.puntaje);
                $.get('http://reeport.desarrollo22.com/account/profile/get/'+id, function(r) {
                    if(r.error === undefined) {
                        $('input[name="full_name"]').val(r.full_name);
                        $('input[name="phone"]').val(r.phone);
                        $('input[name="login"]').val(r.login);
                        $('input[name="id"]').val(r.id);
                    }
                }, 'json');
            } else {
                alert('error');
            }
        }).fail(function() {

        }, 'json');
        
    }
    
    this.loadThanks = function() {
        var report  = parseInt(localStorage.getItem('report_id'));
        if(!report > 0) {
            location.hash = '#reeport';
        }        
        $('.social-link').attr('data-link', 'http://reeport.desarrollo22.com/report/'+report+'/');        
    }
    
    this.loadTag    = function() {
        if(localStorage.getItem('report_id') > 0) {
            localStorage.setItem('report_id', 0);
            location.hash = '#reeport';
        }
    }
    
    this.loadMyFeed = function() {
        loadMyWall(1);
    }
}