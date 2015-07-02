<div class="this_page" id="page_profile">
    <form id="form-profile" >
        <section class="header">
            <a href="#back" class="back_button"><img src="img/back_chevron.png" /></a>
            <img src="img/reeport_logo.png" class="topbar_logo" />
            <a href="#logout" class="logout">Cerrar Sesión</a>
        </section>
        <section class="stats">
            <div class="counter">
                <span class="number total-reportes">0</span>
                <span class="label">Reportes</span>
            </div>
            <div class="counter">
                <span class="number total-puntaje">0</span>
                <span class="label">Puntos</span>
            </div>
        </section>
        <section class="form">
            <label>Nombre:</label>
            <input type="text" name="full_name" class="required" />
            <i class="error">Este campo no puede estar vacio.</i>

            <label>Número de teléfono:</label>
            <input type="number" name="phone" class="required"  />
            <i class="error">Este campo no puede estar vacio.</i>

            <label>Correo Electrónico:</label>
            <input type="email" name="login" class="required"  />
            <i class="error">Este campo no puede estar vacio.</i>

            <label>Contraseña:</label>
            <input type="password" name="password" />

            <label>Repetir contraseña:</label>
            <input type="password" name="repassword" />
            <input type="hidden" name="id" />

        </section>
        <section class="action_footer">
            <button  type="submit">
                Guardar
                <img src="img/next_chevron.png" alt="">
            </button>
        </section>
    </form>
</div>