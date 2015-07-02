/* 
    reeport 1.0 
    Humans in charge: Ivan Melendez, Sergio Martinez, Jose Paternina
    Copyrigth 2015 
*/
var reeport = function(){

    this.init = function(slider){
        var slider = new PageSlider($('body'));
        this.slider = slider;
        this.slider.disableTransitions();
        return this;
    }
    
    this.route = function(route){
        console.log(route);


        var data = {};

        var source   = $(route).html();
        var template = Handlebars.compile(source);
        var page = template(data);


        this.slider.slidePage($(page),{
            beforeTransition: function () {
                $('[data-fixed]').attr('data-fixed', 'absolute');
            },
            afterTransition: function () {
                $('[data-fixed]').attr('data-fixed', 'fixed');
            },    
        });

        if(route == '#reeport') {
            this.loadReport();
        } else if(route == '#profile') {
            this.loadProfile();
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
        var id  = parseInt($.cookie('id'));
        if(!id > 0) {
            console.log(id);
            location.hash = '#start';
            return;
        }

        $.get('http://reeport.desarrollo22.com/account/reports/status/', function(r) {
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
        var id  = parseInt($.cookie('id'));
        if(!id > 0) {
            location.hash = '#start';
        }

        $.get('http://reeport.desarrollo22.com/account/reports/status/', function(r) {
            if(r.error === undefined) {
                $('.stats').find('.total-reportes').html(r.reportes);
                $('.stats').find('.total-puntaje').html(r.puntaje);
                $.get('http://reeport.desarrollo22.com/account/profile/get/', function(r) {
                    if(r.error === undefined) {
                        $('input[name="full_name"]').val(r.full_name);
                        $('input[name="phone"]').val(r.phone);
                        $('input[name="login"]').val(r.login);
                    }
                }, 'json');
            } else {
                alert('error');
            }
        }).fail(function() {

        }, 'json');
        
    }
}