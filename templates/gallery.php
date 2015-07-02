<div class="this_page" id="my_feed">    
    <section class="header">
        <a href="#reeport" class="back_button"><img src="img/back_chevron.png" /></a>
        <img src="img/reeport_logo.png" class="topbar_logo" />
        <a href="#profile" class="profile_button"><img src="img/profile_icon.png" alt=""></a>
    </section>
    <section class="gallery" id="gallery-wall-container">
        <ul id="gallery-wall">            
            {{#if items}}
            {{#each items}}
            <li>
                <div class="this_report">
                    <div class="top">
                        <span class="reportado_por">{{full_name}}</span>
                        <span class="date" data-livestamp="{{formatDate timestamp 'timestamp'}}">{{timestamp}}</span>    
                    </div>
                    <img src="http://reeport.desarrollo22.com/th.php?src={{picture}}&h=400" alt="">
                    <span class="address">{{location}}</span>
                </div>                
            </li>
            {{/each}}
            {{/if}}
        </ul>
    </section>
</div>