<div class="this_page" id="page_signup">
    <form id="form-signup">
        <section class="header">
            <a href="#back" class="back_button"><img src="img/back_chevron.png" /></a>
            <img src="img/reeport_logo.png" class="topbar_logo" />
        </section>
        <section class="form">

            <h2>Registro de Usuario</h2>

            <label>Nombre:</label>
            <input type="text" name="full_name" class="required" />
            <i class="error">Este campo no puede estar vacio.</i>

            <label>Número de teléfono:</label>
            <input type="number" name="phone" class="required" />
            <i class="error">Este campo no puede estar vacio.</i>

            <label>Correo Electrónico:</label>
            <input type="email" name="email" class="required" />
            <i class="error">Este campo no puede estar vacio.</i>

            <label>Contraseña:</label>
            <input type="password" name="password" class="required" />
            <i class="error">Este campo no puede estar vacio.</i>

            <label>Repetir contraseña:</label>
            <input type="password" name="repassword" class="required" />
            <i class="error">Este campo no puede estar vacio.</i>

        </section>
        <section class="action_footer">
            <button  type="submit">
                Comenzar
                <img src="img/next_chevron.png" alt="">
            </button>
        </section>
    </form>
</div>