// src/features/notes/pages/NotesPage.js
import { AppLayout } from '../../../shared/layouts/AppLayout.js';
import { NoteCard } from '../components/NoteCard.js';
import { notesService } from '../notes.service.js';
import { router } from '../../../router.js';

export async function NotesPage() {
    // Por ahora, datos mock (después conectarás a la API real)
    const mockNotes = [
        {
            id: 1,
            title: 'Mi primera nota',
            content: 'Este es el contenido de mi primera nota. Aquí puedo escribir lo que quiera.',
            created_at: new Date().toISOString()
        },
        {
            id: 2,
            title: 'Ideas para el proyecto',
            content: 'Necesito implementar: sistema de búsqueda, tags, categorías...',
            created_at: new Date(Date.now() - 86400000).toISOString()
        }
    ];
    
    const notesHTML = mockNotes.length > 0
        ? mockNotes.map(note => NoteCard(note)).join('')
        : '<p class="empty-state">No tienes notas aún. ¡Crea tu primera nota!</p>';
    
    const content = `
        <div class="notes-page">
            <header class="page-header">
                <h1>Mis Notas</h1>
                <button id="new-note-btn" class="btn-primary">+ Nueva Nota</button>
            </header>
            <div class="notes-grid">
                ${notesHTML}
            </div>
        </div>
    `;
    
    AppLayout({ activeSection: 'notes', content });
    
    // Event listeners
    document.getElementById('new-note-btn')?.addEventListener('click', () => {
        alert('Próximamente: Editor de notas');
        // router.navigate('/notes/new');
    });
    
    // Click en las tarjetas
    document.querySelectorAll('.note-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Si no clickeó un botón de acción
            if (!e.target.closest('[data-action]')) {
                const noteId = card.dataset.noteId;
                alert(`Abrir nota ${noteId} (próximamente)`);
                // router.navigate(`/notes/${noteId}`);
            }
        });
    });
    
    // Botones de editar/eliminar
    document.querySelectorAll('[data-action="delete"]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const noteId = btn.dataset.noteId;
            if (confirm('¿Eliminar esta nota?')) {
                alert(`Eliminar nota ${noteId} (próximamente)`);
                // await notesService.delete(noteId);
                // NotesPage(); // Recargar
            }
        });
    });
}