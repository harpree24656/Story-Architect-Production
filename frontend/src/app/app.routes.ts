import { Routes } from '@angular/router';
import { Landing} from './pages/landing/landing';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)},
    {path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)},
    {path: 'create', loadComponent: () => import('./pages/create/create').then(m => m.Create)},
    {path: 'characters', loadComponent: () => import('./pages/characters/characters').then(m => m.Characters)},
    {path: 'events', loadComponent: () => import('./pages/events/events').then(m => m.Events)},
    {path: 'relations', loadComponent: () => import('./pages/relations/relations').then(m => m.Relations)},
    {path: 'story-map', loadComponent: () => import('./pages/story-map/story-map').then(m => m.StoryMap)},
    {path: 'world-library', loadComponent: () => import('./pages/world-library/world-library').then(m => m.WorldLibrary)},
    {path: "manual-story", loadComponent: () => import('./pages/manual-story/manual-story').then(m => m.ManualStory)},
    {path: 'settings', loadComponent: () => import('./pages/settings/settings').then(m => m.Settings)},
    {path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About)},
    {path: 'pricing', loadComponent: () => import('./pages/pricing/pricing').then(m => m.Pricing)},
    {path: '**', redirectTo: ''}
];
