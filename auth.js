// auth.js - Guardián de Sesión de Supabase

// ===================================================================
// CONFIGURACIÓN DE SUPABASE
// Estas credenciales deben estar en todas las páginas que lo necesiten.
// ===================================================================
const SUPABASE_URL = 'https://gedcmaypjelwwibzlxte.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZGNtYXlwamVsd3dpYnpseHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMjk3MzcsImV4cCI6MjA2NjgwNTczN30.4rwnAo4um8Q1NK25TakCOOJew1VuoQWtvGE27brslbY';

// Se crea una instancia global del cliente de Supabase para que
// otros scripts en la página (como el de index.html) puedan usarla.
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Función de Verificación de Sesión ---
async function checkAuth() {
    // Obtiene la sesión actual del usuario desde Supabase
    const { data: { session } } = await supabase.auth.getSession();

    // Si NO hay sesión (el usuario no ha iniciado sesión)...
    if (!session) {
        // Determina a qué página de login redirigir.
        // Si estamos en repartidor_app.html, vamos al login de repartidor.
        // En cualquier otro caso, vamos al login de admin.
        if (window.location.pathname.includes('repartidor_app.html')) {
            window.location.href = 'login_entregador_.html';
        } else {
            window.location.href = 'login.html';
        }
        return; 
    }
    
    // Si hay una sesión, podemos continuar.
    console.log('Usuario autenticado:', session.user.email);
}

// Ejecuta la verificación en cuanto se carga el script.
checkAuth();