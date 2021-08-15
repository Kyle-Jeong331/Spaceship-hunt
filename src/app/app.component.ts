import { Component, HostListener, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { AiService } from './services/ai.service.js';
import { CameraService } from './services/camera.service.js';
import { CollisionService } from './services/collision.service.js';
import { MapService } from './services/map.service.js';
import { SpriteService } from './services/sprite.service.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  x: number = 200;
  y: number = 200;

  max_x: number= 3500;
  max_y: number= 2500;
 
  constructor(private _spriteService: SpriteService, private _cameraService: CameraService, private _aiService: AiService, private _mapService: MapService, private _collisionService: CollisionService) {}

  @HostListener('document:keydown',['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key == 'ArrowLeft') {
      this.x=this.x-10;
    }
    if (event.key == 'ArrowUp') {
      this.y=this.y-10;
    }
    else if (event.key =='ArrowRight') {
      this.x=this.x+10;
    }
    else if (event.key == 'ArrowDown') {
      this.y=this.y+10
    }
    console.log(this.x)
    console.log(this.y)
  }

  ngOnInit(): void {
    let elem = document.getElementById('map');
    let params = {
      width: this._mapService.MAX_X,
      height: this._mapService.MAX_Y,
      autostart: true
    };
    let two = new Two(params).appendTo(elem);
    
    this._cameraService.init(this.max_x, this.max_y);
    this._spriteService.populateSpacemonster(20);
    this._spriteService.populateSpacerock(10);
    this._spriteService.populateDeadtree(10);
    this._spriteService.populateRockterrain(10);
    this._mapService.init(two);

    for (let i=0; i<this._spriteService.sprites.length; i++) {
      let sprite=this._spriteService.sprites[i];
      this._spriteService.sprites[i].spriteReference=two.makeSprite(sprite.url, sprite.x, sprite.y, sprite.columns, sprite.rows, sprite.fps);
      this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1]);
      this._spriteService.sprites[i].spriteReference.scale=this._spriteService.sprites[i].scale;
    }

    //let texture = new Two.Texture('../assets/images/meteor.jpg', function () {
      //console.log('location 1: '+ texture.image.width)
      //let rectangle = two. makeCircle(200, 400, texture.image.width)
      //rectangle.fill = texture
      //rectangle.scale=.3
    //})
    //console.log('location 2: '+ texture.image.width)
  
    let x = 1000;
    let y = 300;
    let x1 = 500;
    let y1 = 200;

    let startTime = Date.now();
    //let rectangle = two.makeRectangle(100, 100, 500, 300);
    //rectangle.fill = 'red';
    //let circle = two.makeCircle(500, 300, 100);
   // circle.fill = 'green';
    //let star = two.makeStar(800, 150, 50, 250, 50);
    //star.fill = 'yellow';
    //let star1 = two.makeStar(400, 150, 50, 250, 8);
    //star1.fill = 'gold';
   // star.rotation = 3.14;

    let scaleDelta=.05;

    //let sprite = two.makeSprite('../assets/sprites/UFO.png', 800, 250, 1, 6, 10);
    //sprite.scale=5;
    //sprite.play();

    this._spriteService.sprites[0].spriteReference = two.makeSprite(this._spriteService.sprites[0].url,
      this._spriteService.sprites[0].x,
      this._spriteService.sprites[0].y,
      this._spriteService.sprites[0].columns,
      this._spriteService.sprites[0].rows,
      this._spriteService.sprites[0].fps);
      this._spriteService.sprites[0].spriteReference.scale = this._spriteService.sprites[0].scale;
      this._spriteService.sprites[0].spriteReference.play()

    two.bind('update', (framesPerSecond)=>{
      //star.translation.set(x--,y--);
      //star1.translation.set(x1--,y1);
      //star.rotation = (Date.now()-startTime)%Math.PI;
      //star1.rotation = (Date.now()-startTime)%Math.PI;

      //if (circle.scale>3){
       // scaleDelta=-.1;
      //}
     // else if (circle.scale<.5) {
       // scaleDelta=.1;
     // }
     // circle.scale=circle.scale+scaleDelta;
     if (!this._collisionService.detectBorder(this._spriteService.sprites[0],this._spriteService.sprites[0].x,
      this._spriteService.sprites[0].y, this.x, this.y)) {
      this._spriteService.sprites[0].spriteReference.translation.x = this.x; 
      this._spriteService.sprites[0].x=this.x;
      this._spriteService.sprites[0].spriteReference.translation.y = this.y;
      this._spriteService.sprites[0].y=this.y;
      this._cameraService.zoomCamera(this.x, this.y);
    }
    else {
      this.x = this._spriteService.sprites[0].x
      this.y = this._spriteService.sprites[0].y
    }

     this._cameraService.zoomCamera(this.x, this.y);

     for (let i=0; i<this._spriteService.sprites.length-1; i++) {
       if (i>0) {
         if (!this._spriteService.sprites[i]) continue
         let oldX = this._spriteService.sprites[i].x
         let oldY = this._spriteService.sprites[i].y
         this._spriteService.sprites[i]=this._aiService.basicAI(this._spriteService.sprites[i]);
         if (!this._collisionService.detectBorder(this._spriteService.sprites[i], oldX, oldY, this._spriteService.sprites[i].x, this._spriteService.sprites[i].y)) {
           this._spriteService.sprites[i].spriteReference.translation.x = this._spriteService.sprites[i].x;
           this._spriteService.sprites[i].spriteReference.translation.y = this._spriteService.sprites[i].y;
           this._spriteService.sprites[i].spriteReference.scale = this._spriteService.sprites[i].scale;
         }
         else {
           this._spriteService.sprites[i].x=oldX
           this._spriteService.sprites[i].y=oldY
         }
         this._collisionService.detectCollision(this._spriteService.sprites[0], this._spriteService.sprites[i]);
       }
       if (this._spriteService.sprites[i].direction != this._spriteService.sprites[i].lastDirection) {
         this._spriteService.sprites[i].lastDirection= this._spriteService.sprites[i].direction;
         if (this._spriteService.sprites[i].direction=='right') {
           this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0],
            this._spriteService.sprites[i].rightFrames[1])
         }
         else {
           this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].leftFrames[0],
            this._spriteService.sprites[i].leftFrames[1])
         }
       }
     }
    });//.play();
  }

  title = 'spacecraft';

}
