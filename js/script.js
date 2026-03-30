document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. MENÚ RESPONSIVE (BONUS)
       ============================================================ */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });

        // Cierra el menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    /* ============================================================
       2. FILTRADO Y CONTADOR DINÁMICO
       ============================================================ */
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const tarjetas = document.querySelectorAll('.tarjeta');
    const contadorTexto = document.getElementById('contador-servicios');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Activar botón seleccionado
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');
            let visibles = 0;

            // Filtrar tarjetas
            tarjetas.forEach(tarjeta => {
                if (filtro === 'todos' || tarjeta.getAttribute('data-category') === filtro) {
                    tarjeta.style.display = 'block';
                    visibles++;
                } else {
                    tarjeta.style.display = 'none';
                }
            });

            // Actualizar contador
            contadorTexto.textContent = `Mostrando ${visibles} servicio${visibles !== 1 ? 's' : ''}`;
        });
    });

    /* ============================================================
       3. VALIDACIÓN DEL FORMULARIO
       ============================================================ */
    const formulario = document.getElementById('formulario-contacto');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const servicio = document.getElementById('servicio');
            const mensaje = document.getElementById('mensaje');

            const errNombre = document.getElementById('error-nombre');
            const errEmail = document.getElementById('error-email');
            const errServicio = document.getElementById('error-servicio');
            const errMensaje = document.getElementById('error-mensaje');
            const msgExito = document.getElementById('mensaje-exito');

            let esValido = true;

            // Limpiar errores previos
            document.querySelectorAll('.error').forEach(el => el.classList.remove('active'));
            msgExito.classList.remove('active');

            // Validar Nombre
            if (nombre.value.trim() === '') {
                errNombre.textContent = 'Por favor, ingresa tu nombre completo.';
                errNombre.classList.add('active');
                esValido = false;
            }

            // Validar Email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                errEmail.textContent = 'El correo electrónico es obligatorio.';
                errEmail.classList.add('active');
                esValido = false;
            } else if (!regexEmail.test(email.value.trim())) {
                errEmail.textContent = 'El formato del correo no es válido.';
                errEmail.classList.add('active');
                esValido = false;
            }

            // Validar Servicio
            if (servicio.value === '') {
                errServicio.textContent = 'Debes seleccionar un servicio de interés.';
                errServicio.classList.add('active');
                esValido = false;
            }

            // Validar Mensaje
            if (mensaje.value.trim() === '') {
                errMensaje.textContent = 'El mensaje no puede estar vacío.';
                errMensaje.classList.add('active');
                esValido = false;
            }

            // Éxito
            if (esValido) {
                msgExito.classList.add('active');
                formulario.reset();
                
                setTimeout(() => {
                    msgExito.classList.remove('active');
                }, 4000);
            }
        });
    }
});