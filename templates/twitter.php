<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, height=device-height" />
        <title>Reeport - Cargando</title>
    </head>
    <body>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>              
        <script src="js/plugins.js"></script>              
        <script type="text/javascript">            
            <?php if(!empty($data)) { ?>
                $(function(){
                    var data    = <?php echo json_encode($data, JSON_PRETTY_PRINT) ?>;
                    $.post('http://reeport.desarrollo22.com/account/sessions/signup/twitter/', $.toJSON(data), function(r) {
                        if(parseInt(r) > 0) {
                            localStorage.setItem('id', parseInt(r));
                            location.href   = '/#reeport';
                        } else {
                            alert('Lo sentimos, pero no se pudo validar tu cuenta. Por favor intenta nuevamente.')
                            $.get('http://reeport.desarrollo22.com/account/sessions/logout', function(r) {
                                location.href   = '/';
                            });
                        }
                    }, 'json').fail(function() {
                        alert('Lo sentimos, pero no se pudo establecer conexión con el servidor. Por favor intenta más tarde');
                        $.get('http://reeport.desarrollo22.com/account/sessions/logout', function(r) {
                            location.href   = '/';
                        });
                    });
                })
            <?php } else { ?>
                alert('Lo sentimos, pero el proceso de verificación ha fallado. Por favor intenta nuevamente');
                $.get('http://reeport.desarrollo22.com/account/sessions/logout', function(r) {
                    location.href   = '/';
                });
            <?php } ?>
        </script>
    </body>
</html>