export const PAGE_CONFIG = {
    dashboard: {
        title: 'Dashboard', 
        subtitle: 'Welcome back, John!' ,
        showSearch: {
            show: true,
            placeholder: 'Search story, characters...'
        },
        showIcons: [
            { icon : '🔔', action: 'notification'}
        ],
        buttons: [
            {label: 'New Story', style: 'primary', action: 'new-story'}
        ]
    },
    create: { 
        title: 'Create New Story', 
        subtitle: 'Set up your story project', 
        showSearch: { 
            show: false, 
            placeholder: '' 
        },
        showIcons: [],
        buttons: [
            {label: 'Save default', style: 'secondary', action: 'save-default'},
            {label: 'Create Story', style: 'primary', action: 'create-story'}
        ]
    },
    characters: { 
        title: 'Characters', 
        subtitle: 'Manage all characters across your stories',
        showSearch: {
            show: true,
            placeholder: 'Search characters...'
        },
        showIcons: [],
        buttons: [
            {label: '+New Character', style: 'primary', action: 'new-character'}
        ]
    },
    events: { 
        title: 'Events', 
        subtitle: 'Track and organize story events across timelines',
        showSearch: {
            show: true,
            placeholder: 'Search events...'
        },
        showIcons: [],
        buttons: [
            {label: '+New Event', style: 'primary', action: 'new-event'}
        ]
    },
    relations: { 
        title: 'Relations', 
        subtitle: 'Map and manage character relationships',
        showSearch: {
            show: true,
            placeholder: 'Search relations...'
        },
        showIcons: [],
        buttons: [
            {label: '+New Realtion', style: 'primary', action: 'new-realtion'}
        ]
    },
    storyMap: { 
        title: 'Story Map', 
        subtitle: 'Visual overview of your entire narrative structure',
        showSearch: { 
            show: false, 
            placeholder: '' 
        },
        showIcons: [],
        buttons: [
            {label: 'Export', style: 'secondary', action: 'export'},
            {label: '+Add Node', style: 'primary', action: 'add-node'}
        ]
    },
    worldLibrary: { 
        title: 'World Library', 
        subtitle: 'Build and organize your story world lore',
        showSearch: {
            show: true,
            placeholder: 'Search world elements...'
        },
        showIcons: [],
        buttons: [
            {label: 'Add Entry', style: 'secondary', action: 'add-entry'}
        ]
    },
    manualStory: { 
        title: 'Manual Story Writer', 
        subtitle: 'Write your story chapter by chapter',
        showSearch: { 
            show: false, 
            placeholder: '' 
        },
        showIcons: [],
        buttons: [
            {label: 'Preview', style: 'secondary', action: 'export'},
            {label: 'Publish', style: 'primary', action: 'publish'}
        ]
    },
    settings: { 
        title: 'Settings', 
        subtitle: 'Manage your account',
        showSearch: { 
            show: false, 
            placeholder: '' 
        },
        showIcons: [],
        buttons: []
    }
}

