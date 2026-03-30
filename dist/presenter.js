document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       INTERACCIÓN DINÁMICA DEL DOM 1 & 2: FILTRADO Y CONTADOR
       ============================================================ */
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const tarjetas = document.querySelectorAll('.tarjeta');
    const contadorTexto = document.getElementById('contador-servicios');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Remover clase active de todos y agregar al clickeado
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');
            let visibles = 0;

            // Lógica de filtrado en el DOM
            tarjetas.forEach(tarjeta => {
                if (filtro === 'todos' || tarjeta.getAttribute('data-category') === filtro) {
                    tarjeta.style.display = 'block';
                    visibles++;
                } else {
                    tarjeta.style.display = 'none';
                }
            });

            // Actualizar el contador dinámicamente en el DOM
            contadorTexto.textContent = `Mostrando ${visibles} servicio${visibles !== 1 ? 's' : ''}`;
        });
    });

    /* ============================================================
       VALIDACIÓN DEL FORMULARIO
       ============================================================ */
    const formulario = document.getElementById('formulario-contacto');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el envío por defecto

            // Capturar campos
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const servicio = document.getElementById('servicio');
            const mensaje = document.getElementById('mensaje');

            // Capturar span de errores y mensaje de éxito
            const errNombre = document.getElementById('error-nombre');
            const errEmail = document.getElementById('error-email');
            const errServicio = document.getElementById('error-servicio');
            const errMensaje = document.getElementById('error-mensaje');
            const msgExito = document.getElementById('mensaje-exito');

            let esValido = true;

            // Limpiar errores previos
            document.querySelectorAll('.error').forEach(el => el.classList.remove('active'));
            msgExito.classList.remove('active');

            // 1. Validar Nombre
            if (nombre.value.trim() === '') {
                errNombre.textContent = 'Por favor, ingresa tu nombre completo.';
                errNombre.classList.add('active');
                esValido = false;
            }

            // 2. Validar Email
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

            // 3. Validar Servicio (Select)
            if (servicio.value === '') {
                errServicio.textContent = 'Debes seleccionar un servicio de interés.';
                errServicio.classList.add('active');
                esValido = false;
            }

            // 4. Validar Mensaje
            if (mensaje.value.trim() === '') {
                errMensaje.textContent = 'El mensaje no puede estar vacío.';
                errMensaje.classList.add('active');
                esValido = false;
            }

            // Si es válido, mostrar éxito y resetear formulario
            if (esValido) {
                msgExito.classList.add('active');
                formulario.reset();
                
                // Ocultar el mensaje de éxito luego de 4 segundos
                setTimeout(() => {
                    msgExito.classList.remove('active');
                }, 4000);
            }
        });
    }
});

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

// Abrir/Cerrar menú
navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Cerrar menú al hacer click en un enlace (importante para SPAs)
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
    });
});