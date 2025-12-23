import { AppLayout } from '@shared/layouts/AppLayout.js';

export async function TodoPage() {
    const content = `
        <div class="todo-page">
            <h1>Hello World</h1>
        </div>
    `;
    
    AppLayout({ activeSection: 'todo', content });
}