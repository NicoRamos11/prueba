document.addEventListener('DOMContentLoaded', () => {
    const rol = localStorage.getItem('rolSeleccionado') || 'usuario';
    document.getElementById('rol').textContent = rol;
  });
  body: JSON.stringify({ email, password, rol })

  
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const mensajeError = document.getElementById('mensaje-error');

  try {
    const response = await fetch('/api/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem('token', result.token);
      window.location.href = '/panel.html'; // Redirige al panel principal
    } else {
      mensajeError.textContent = result.error || 'Credenciales incorrectas';
    }
  } catch (error) {
    mensajeError.textContent = 'Error de conexión con el servidor';
  }
  document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const checkbox = document.getElementById('recordar-usuario');
  
    // Cargar usuario guardado
    const recordado = localStorage.getItem('usuarioRecordado');
    if (recordado) {
      emailInput.value = recordado;
      checkbox.checked = true;
    }
  
    // Guardar o eliminar usuario al enviar
    document.getElementById('login-form').addEventListener('submit', () => {
      if (checkbox.checked) {
        localStorage.setItem('usuarioRecordado', emailInput.value);
      } else {
        localStorage.removeItem('usuarioRecordado');
      }
    });
  });
  
});
