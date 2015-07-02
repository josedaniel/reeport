<div class="this_page" id="page_reeport">
    <section class="header">
        <img src="img/reeport_logo.png" class="topbar_logo" />
        <a href="#profile" class="profile_button"><img src="img/profile_icon.png" alt=""></a>
    </section>
    <section class="stats">
        <div class="counter">
            <a href="#my-feed" class="btn-my-feed">
                <span class="number total-reportes">0</span>
                <span class="label">Reportes</span>                
            </a>
        </div>
        <div class="counter">
            <span class="number total-puntaje">0</span>
            <span class="label">Puntos</span>
        </div>
    </section>
    <section class="reeport_action">
        <form action="post" id="form-picture">
            <div class="file-upload">
                <div class="file-upload-input">
                    <img src="img/reportar_action.png" class="reportar active">  
                    <input id="picture" type="file" class="js-upload" data-to="http://reeport.desarrollo22.com/account/reports/upload/picture/" style="opacity: 0 !important;" data-callback="showTagForm" accept="image/*" capture="camera" />                                
                    <a href="#my-feed" class="mis_reportes">Ver mis reportes</a>
                </div>
                <div class="file-upload-progress">
                    <span class="active">                    
                        <img src="img/loading.gif" alt="">
                    </span>                                    
                    <div class="progress-info">
                        <span class="meter">Espera...</span>
                    </div>
                </div>
            </div>
        </form>
    </section>
</div>