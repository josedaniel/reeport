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
    