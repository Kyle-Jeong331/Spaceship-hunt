import { Injectable, ɵisDefaultChangeDetectionStrategy } from '@angular/core';

export interface Sprite {
  name: string;
  visibility: boolean;
  state: number;
  direction: string;
  lastDirection: string;
  maxSpeed: number;
  acceleration: number;
  scale: number;
  playable: boolean;
  type: string;

  url: string;
  fps: number;
  x: number;
  y: number;

  rows: number;
  columns: number;

  spriteReference: any;

  leftFrames: number[];
  rightFrames: number[];
}
@Injectable({
  providedIn: 'root'
})
export class SpriteService {
  rockterrain: Sprite= {
    name: 'Rock Terrain',
    type: 'object',
    visibility: true,
    state: 0,
    direction: 'none',
    lastDirection: 'none',
    maxSpeed: 0,
    acceleration: 0,
    scale: 3.5,
    playable: false, 
    url: '../assets/sprites/rockterrain.png',
    fps: 6,
    x: 250,
    y: 250,
    rows: 6,
    columns: 2,
    spriteReference: null,
    leftFrames: [0, 12],
    rightFrames: [0,12]
  }
  deadtree: Sprite= {
    name: 'Dead Tree',
    type: 'object',
    visibility: true,
    state: 0,
    direction: 'none',
    lastDirection: 'none',
    maxSpeed: 0,
    acceleration: 0,
    scale: 3.5,
    playable: false, 
    url: '../assets/sprites/deadtree.png',
    fps: 7,
    x: 200,
    y: 200,
    rows: 7,
    columns: 1,
    spriteReference: null,
    leftFrames: [0, 18],
    rightFrames: [0,18]
  }
  sprites:Sprite[]=[{
    name: 'Space Ship',
    type: 'prey',
    visibility: true,
    state: 0,
    direction: 'right',
    lastDirection: 'right',
    maxSpeed: 12,
    acceleration: 2,
    scale: 3.5,
    playable: true, 
    url: '../assets/sprites/UFO.png',
    fps: 7,
    x: 200,
    y: 200,
    rows: 1,
    columns: 19,
    spriteReference: null,
    leftFrames: [0, 18],
    rightFrames: [0,18]
  }];

spacerock: Sprite= {
  name: 'Spacerock',
  type: 'object',
  visibility: true,
  state: 0,
  direction: 'right',
  lastDirection: 'right',
  maxSpeed: 12,
  acceleration: 2,
  scale: 3.5,
  playable: true, 
  url: '../assets/sprites/UFO.png',
  fps: 7,
  x: 200,
  y: 200,
  rows: 1,
  columns: 19,
  spriteReference: null,
  leftFrames: [0, 18],
  rightFrames: [0,18]
}

spacemonster: Sprite= {
  name: 'Spacemonster',
  type: 'predator',
  visibility: true,
  state: 0,
  direction: 'right',
  lastDirection: 'right',
  maxSpeed: 12,
  acceleration: 2,
  scale: 3.5,
  playable: true, 
  url: '../assets/sprites/UFO.png',
  fps: 7,
  x: 200,
  y: 200,
  rows: 1,
  columns: 19,
  spriteReference: null,
  leftFrames: [0, 18],
  rightFrames: [0,18]
}
  spaceship: any;


  constructor() { }

  populateSpaceship(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let spaceship = this.spaceship;
      spaceship.x = Math.floor(Math.random() * 800 * i)+300;
      spaceship.y = Math.floor(Math.random() * 100 * i)+100;
      this.sprites.push(JSON.parse(JSON.stringify(spaceship)));
    }
  }

  populateSpacerock(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let spacerock = this.spacerock;
      spacerock.x = Math.floor(Math.random() * 800 * i)+300;
      spacerock.y = Math.floor(Math.random() * 100 * i)+100;
      this.sprites.push(JSON.parse(JSON.stringify(spacerock)));
    }
  }

  populateDeadtree(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let deadtree = this.deadtree;
      deadtree.x = Math.floor(Math.random() * 800 * i)+300;
      deadtree.y = Math.floor(Math.random() * 100 + i)+800;
      this.sprites.push(JSON.parse(JSON.stringify(deadtree)));
    }
  }

  populateRockterrain(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let rockterrain = this.rockterrain;
      rockterrain.x = Math.floor(Math.random() * 800 * i)+300;
      rockterrain.y = Math.floor(Math.random() * 100 + i)+800;
      this.sprites.push(JSON.parse(JSON.stringify(rockterrain)));
    }
  }

  populateSpacemonster(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let spacemonster = this.spacemonster;
      spacemonster.x = Math.floor(Math.random() * 800 * i)+300;
      spacemonster.y = Math.floor(Math.random() * 100 * i)+100;
      this.sprites.push(JSON.parse(JSON.stringify(spacemonster)));
    }
  }
}
