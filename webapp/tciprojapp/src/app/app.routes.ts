import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        //importar mi componente students como principal o default
        path: '',
        loadComponent: () => import('./components/students/students.component')
    },
    {
        //especificar la ruta
        path: 'new',
        loadComponent: () => import('./components/student-form/student-form.component')
    },
    {
        //especificar la ruta
        path: ':id/edit',
        loadComponent: () => import('./components/student-form/student-form.component')
    }

];
