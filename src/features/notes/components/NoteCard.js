// src/features/notes/components/NoteCard.js
export function NoteCard({ id, title, content, created_at }) {
    const preview = content.substring(0, 100) + (content.length > 100 ? '...' : '');
    const date = new Date(created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    return `
        <div class="note-card" data-note-id="${id}">
            <h3 class="note-title">${title || 'Sin título'}</h3>
            <p class="note-preview">${preview}</p>
            <div class="note-footer">
                <span class="note-date">${date}</span>
                <div class="note-actions">
                    <button class="btn-icon btn-edit" data-action="edit" data-note-id="${id}">✏️</button>
                    <button class="btn-icon btn-delete" data-action="delete" data-note-id="${id}">🗑️</button>
                </div>
            </div>
        </div>
    `;
}