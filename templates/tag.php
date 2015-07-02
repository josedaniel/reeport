<div class="this_page" id="page_tag">
    <section class="header">
        <a href="#back" class="back_button"><img src="img/back_chevron.png" /></a>
        <img src="img/reeport_logo.png" class="topbar_logo" />
        <a href="#profile" class="profile_button"><img src="img/profile_icon.png" alt=""></a>
    </section>
    <form id="form-report" method="post">        
        
        <section class="picture">
            <div class="image" id="image-loaded" style="background-image: url('http://reeport.desarrollo22.com/th.php?src={{source}}&w=400');"></div>
            <div class="blind"></div>
            <a href="#reeport"><img src="img/trash.png" alt=""></a>
            <img src="img/triangle.png" class="triangle" />
        </section>
        
        <section class="form">
            <h2>Etiquetar la foto</h2>
            <label>Ubicación:</label>
            <input type="text" name="location" class="required" value="{{ubicacion}}" />
            <i class="error">Este campo no puede estar vacio.</i>

            <label>Placa:</label>
            <input type="text" name="plate" class="required" value="{{placa}}" />
            <i class="error">Este campo no puede estar vacio.</i>
            
            <input type="hidden" name="picture" value="{{source}}" />
            <input type="hidden" name="user_id" value="{{user_id}}" />
            
        </section>
        
        <!--
        <section class="social_share">
            <label for="">Compartir</label>
            <div class="share_buttons">
                <div class="this_button {{#if facebook}}{{else}}f-connect{{/if}}">
                    <img src="img/facebook_badge.png" alt="">
                    <span>Facebook</span>
                </div>
                <div class="this_button {{#if facebook}}{{else}}t-connect{{/if}}">
                    <img src="img/twitter_badge.png" alt="">
                    <span>Twitter</span>
                </div>
            </div>
        </section>
        -->
        
        <section class="action_footer">
            <button type="submit">
                Reportar
                <img src="img/next_chevron.png" alt="">
            </button>
        </section>
        
    </form>
</div>
