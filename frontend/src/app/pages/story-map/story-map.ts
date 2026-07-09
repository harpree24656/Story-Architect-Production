import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router'
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';
import { MapConnector, MapNode, NodeCharacter, ConnectedEvent } from '../../core/models/storyMap'; 

@Component({
  selector: 'app-story-map',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TitleCasePipe],
  templateUrl: './story-map.html',
  styleUrl: './story-map.css',
})
export class StoryMap implements OnInit{
  
  private topbarService = inject(TopbarService)
  private router = inject(Router)
  private fb = inject(FormBuilder)
  private destroyRef = inject(DestroyRef)

  // variable declaration
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  activeFilter: string = 'All';
  currentSort: string = '';
  selectedStory: string = '';
  editingNodeId: string | null = null;
  nodeForm !: FormGroup;
 nodes = signal<MapNode[]>([]);
  connectors = signal<MapConnector[]>([]);
  selectedNode = signal<MapNode | null>(null);

  activeView: string = 'map';
  zoomLevel: number = 100;

  //  basic declaration
  readonly viewModes = [
    { label: 'Map', value: 'map' },
    { label: 'List', value: 'list' },
    { label: 'Tree', value: 'tree' }
  ];

  readonly nodeTypes = [
    { label: 'Chapter', value: 'chapter' },
    { label: 'Event', value: 'event' },
    { label: 'Character', value: 'character' },
    { label: 'Location', value: 'location' },
    { label: 'Plot Twist', value: 'twist' }
  ];

  readonly statusOptions = ['done', 'writing', 'empty'];

  readonly actOptions = [
    { label: 'Act I — The Beginning', value: 'act1' },
    { label: 'Act II — The Journey', value: 'act2' },
    { label: 'Act III — The Reckoning', value: 'act3' }
  ];

  readonly storyOptions = ['The Lost Kingdom'];
 
  // mock-data
  mockNodes: MapNode[] = [
    // Act I
    {
      id: 'node-1',
      title: 'Prologue',
      subtitle: '1,240 words',
      type: 'chapter',
      status: 'done',
      act: 'act1',
      story: 'The Lost Kingdom',
      chapter: 1,
      wordCount: 1240,
      description: '',
      characters: [
        { name: 'Arin Blackwood', initials: 'AB', color: '' }
      ],
      connectedEvents: [],
      connectedNodes: [],
      x: 80,
      y: 100,
      createdAt: new Date()
    },
    {
      id: 'node-2',
      title: 'The Fall of Blackwood Keep',
      subtitle: 'Major Event',
      type: 'event',
      status: 'done',
      act: 'act1',
      story: 'The Lost Kingdom',
      chapter: null,
      wordCount: 0,
      description: '',
      characters: [
        { name: 'Arin Blackwood', initials: 'AB', color: '' },
        { name: 'Lord Vespera', initials: 'LV', color: 'purple' }
      ],
      connectedEvents: [],
      connectedNodes: [],
      x: 320,
      y: 90,
      createdAt: new Date()
    },
    {
      id: 'node-3',
      title: 'The Exile',
      subtitle: '2,180 words',
      type: 'chapter',
      status: 'done',
      act: 'act1',
      story: 'The Lost Kingdom',
      chapter: 2,
      wordCount: 2180,
      description: '',
      characters: [],
      connectedEvents: [],
      connectedNodes: [],
      x: 630,
      y: 100,
      createdAt: new Date()
    },
    {
      id: 'node-4',
      title: 'Ashwood Forest',
      subtitle: 'Eastern Border',
      type: 'location',
      status: 'empty',
      act: 'act1',
      story: 'The Lost Kingdom',
      chapter: null,
      wordCount: 0,
      description: '',
      characters: [],
      connectedEvents: [],
      connectedNodes: [],
      x: 640,
      y: 230,
      createdAt: new Date()
    },

    // Act II
    {
      id: 'node-5',
      title: 'Into the Wild',
      subtitle: '860 words · Writing',
      type: 'chapter',
      status: 'writing',
      act: 'act2',
      story: 'The Lost Kingdom',
      chapter: 3,
      wordCount: 860,
      description: '',
      characters: [
        { name: 'Arin Blackwood', initials: 'AB', color: '' },
        { name: 'Sera Ravencroft', initials: 'SR', color: 'pink' }
      ],
      connectedEvents: [
        { name: 'The Fall of Blackwood Keep', impact: 'major' },
        { name: 'Arin Meets Sera', impact: 'minor' }
      ],
      connectedNodes: ['← The Exile', '→ Broken Brotherhood', '↓ Kael\'s Betrayal'],
      x: 80,
      y: 390,
      createdAt: new Date()
    },
    {
      id: 'node-6',
      title: 'Arin Meets Sera',
      subtitle: 'Minor Event',
      type: 'event',
      status: 'done',
      act: 'act2',
      story: 'The Lost Kingdom',
      chapter: null,
      wordCount: 0,
      description: '',
      characters: [
        { name: 'Arin Blackwood', initials: 'AB', color: '' },
        { name: 'Sera Ravencroft', initials: 'SR', color: 'pink' }
      ],
      connectedEvents: [],
      connectedNodes: [],
      x: 320,
      y: 380,
      createdAt: new Date()
    },
    {
      id: 'node-7',
      title: 'Sera Ravencroft',
      subtitle: 'Introduced · Supporting',
      type: 'character',
      status: 'empty',
      act: 'act2',
      story: 'The Lost Kingdom',
      chapter: null,
      wordCount: 0,
      description: '',
      characters: [
        { name: 'Sera Ravencroft', initials: 'SR', color: 'pink' }
      ],
      connectedEvents: [],
      connectedNodes: [],
      x: 600,
      y: 380,
      createdAt: new Date()
    },
    {
      id: 'node-8',
      title: 'Kael\'s Betrayal',
      subtitle: 'Plot Twist · High Impact',
      type: 'twist',
      status: 'done',
      act: 'act2',
      story: 'The Lost Kingdom',
      chapter: null,
      wordCount: 0,
      description: '',
      characters: [
        { name: 'Arin Blackwood', initials: 'AB', color: '' },
        { name: 'Kael Riven', initials: 'KR', color: 'teal' },
        { name: 'Lord Vespera', initials: 'LV', color: 'purple' }
      ],
      connectedEvents: [],
      connectedNodes: [],
      x: 320,
      y: 510,
      createdAt: new Date()
    },
    {
      id: 'node-9',
      title: 'Broken Brotherhood',
      subtitle: '0 words · Planned',
      type: 'chapter',
      status: 'empty',
      act: 'act2',
      story: 'The Lost Kingdom',
      chapter: 4,
      wordCount: 0,
      description: '',
      characters: [],
      connectedEvents: [],
      connectedNodes: [],
      x: 610,
      y: 520,
      createdAt: new Date()
    },

    // Act III
    {
      id: 'node-10',
      title: 'Siege of Eldarion',
      subtitle: 'Major Event · Climax',
      type: 'event',
      status: 'empty',
      act: 'act3',
      story: 'The Lost Kingdom',
      chapter: null,
      wordCount: 0,
      description: '',
      characters: [
        { name: 'Arin Blackwood', initials: 'AB', color: '' },
        { name: 'Lord Vespera', initials: 'LV', color: 'purple' },
        { name: 'Kael Riven', initials: 'KR', color: 'teal' },
        { name: 'Sera Ravencroft', initials: 'SR', color: 'pink' },
        { name: 'Elder Nyx', initials: 'EN', color: 'orange' }
      ],
      connectedEvents: [],
      connectedNodes: [],
      x: 80,
      y: 690,
      createdAt: new Date()
    },
    {
      id: 'node-11',
      title: 'Resolution',
      subtitle: '0 words · Planned',
      type: 'chapter',
      status: 'empty',
      act: 'act3',
      story: 'The Lost Kingdom',
      chapter: 5,
      wordCount: 0,
      description: '',
      characters: [],
      connectedEvents: [],
      connectedNodes: [],
      x: 380,
      y: 700,
      createdAt: new Date()
    },
    {
      id: 'node-12',
      title: 'Epilogue',
      subtitle: '0 words · Planned',
      type: 'chapter',
      status: 'empty',
      act: 'act3',
      story: 'The Lost Kingdom',
      chapter: 6,
      wordCount: 0,
      description: '',
      characters: [],
      connectedEvents: [],
      connectedNodes: [],
      x: 610,
      y: 700,
      createdAt: new Date()
    }
  ];

  mockConnectors: MapConnector[] = [
    { id: 'conn-1', direction: 'horizontal', x: 250, y: 124, length: 60 },
    { id: 'conn-2', direction: 'horizontal', x: 560, y: 114, length: 60 },
    { id: 'conn-3', direction: 'vertical', x: 700, y: 170, length: 50 },
    { id: 'conn-4', direction: 'horizontal', x: 250, y: 414, length: 60 },
    { id: 'conn-5', direction: 'horizontal', x: 530, y: 404, length: 60 },
    { id: 'conn-6', direction: 'vertical', x: 400, y: 450, length: 50 },
    { id: 'conn-7', direction: 'horizontal', x: 540, y: 534, length: 60 },
    { id: 'conn-8', direction: 'horizontal', x: 310, y: 714, length: 60 },
    { id: 'conn-9', direction: 'horizontal', x: 540, y: 724, length: 60 }
  ]; 

  // constructor
  constructor() {
    this.nodeForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      type: ['chapter', Validators.required],
      status: ['empty', Validators.required],
      act: ['act1', Validators.required],
      story: ['The Lost Kingdom', Validators.required],
      chapter: [null],
      wordCount: [0],
      description: ['']
    })
  }

  ngOnInit(): void{
    this.topbarService.setConfig(PAGE_CONFIG.storyMap)
    this.topbarService.action$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((action) => {
      this.handleAction(action)
    })
    this.nodes.set(this.mockNodes);
    this.connectors.set(this.mockConnectors);
    this.selectedNode.set(this.mockNodes.find(node => node.id === 'node-5') || null)
  }

  // handle action
  handleAction(action: string): void{
    if(action === 'export'){
      // todo logic
    }
    if(action === 'add-node'){
      this.isModalOpen = true; 
    }
  }

  // Switches between map, list, tree view
  setView(view: string): void {
    this.activeView = view;
  }

  // Increases zoom level by 10, max 200
  zoomIn(): void {
    if (this.zoomLevel < 200) {
      this.zoomLevel += 10;
    }
  }

  // Decreases zoom level by 10, min 50
  zoomOut(): void {
    if (this.zoomLevel > 50) {
      this.zoomLevel -= 10;
    }
  }

  // Sets zoom to fit view
  fitCanvas(): void {
    this.zoomLevel = 75;
  }

  // Resets zoom to default
  resetCanvas(): void {
    this.zoomLevel = 100;
  }

  // Selects a node and shows its details
  selectNode(node: MapNode): void {
    this.selectedNode.set(node);
  }

  // Opens modal in add mode
  openAddModal(): void {
    this.isModalOpen = true;
    this.isEditing = false;
    this.editingNodeId = null;
    this.nodeForm.reset({
      title: '',
      subtitle: '',
      type: 'chapter',
      status: 'empty',
      act: 'act1',
      story: 'The Lost Kingdom',
      chapter: null,
      wordCount: 0,
      description: ''
    });
  }

  // Opens modal in edit mode with selected node data
  openEditModal(node: MapNode): void {
    this.isModalOpen = true;
    this.isEditing = true;
    this.editingNodeId = node.id;
    this.nodeForm.patchValue({
      title: node.title,
      subtitle: node.subtitle,
      type: node.type,
      status: node.status,
      act: node.act,
      story: node.story,
      chapter: node.chapter,
      wordCount: node.wordCount,
      description: node.description
    });
  }

  // Closes modal and resets state
  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.editingNodeId = null;
    this.nodeForm.reset();
  }

  // Deletes a node by id
  deleteNode(id: string): void {
    this.nodes.update(nodes => nodes.filter(node => node.id !== id));
    if (this.selectedNode()?.id === id) {
      this.selectedNode.set(null);
    }
  }

  // Handles form submit for add or edit
  onSubmitNode(): void {
    if (this.nodeForm.invalid) {
      return;
    }

    const formValue = this.nodeForm.value;

    if (this.isEditing) {
      this.nodes.update(nodes =>
        nodes.map(node => {
          if (node.id === this.editingNodeId) {
            return {
              ...node,
              ...formValue,
              id: node.id,
              characters: node.characters,
              connectedEvents: node.connectedEvents,
              connectedNodes: node.connectedNodes,
              x: node.x,
              y: node.y,
              createdAt: node.createdAt
            };
          }
          return node;
        })
      );
    } else {
      const nodeCount = this.nodes().length;
      const newNode: MapNode = {
        ...formValue,
        id: 'node-' + Date.now(),
        characters: [],
        connectedEvents: [],
        connectedNodes: [],
        x: 80 + (nodeCount % 4) * 260,
        y: 900 + Math.floor(nodeCount / 4) * 130,
        createdAt: new Date()
      };
      this.nodes.update(nodes => [...nodes, newNode]);
    }

    this.closeModal();
  }

  // Returns count of nodes by type
  getTypeCount(type: string): number {
    return this.nodes().filter(node => node.type === type).length;
  }

  // Returns count of nodes by status
  getStatusCount(status: string): number {
    return this.nodes().filter(node => node.status === status).length;
  }

  // Returns total connector count
  getConnectionCount(): number {
    return this.connectors().length;
  }

  // Returns story progress as percentage
  getProgressPercent(): number {
    const totalChapters = this.nodes().filter(node => node.type === 'chapter').length;
    const doneChapters = this.nodes().filter(node => node.type === 'chapter' && node.status === 'done').length;
    if (totalChapters === 0) {
      return 0;
    }
    return Math.round((doneChapters / totalChapters) * 100);
  }

  // Returns full act label from act value
  getActLabel(actValue: string): string {
    const act = this.actOptions.find(a => a.value === actValue);
    return act ? act.label : actValue;
  }

  // Returns readable status label
  getStatusLabel(status: string): string {
    if (status === 'done') return 'Done';
    if (status === 'writing') return 'In Progress';
    if (status === 'empty') return 'Planned';
    return status;
  }
}
