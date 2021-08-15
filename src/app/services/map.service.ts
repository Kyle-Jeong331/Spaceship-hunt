import { Injectable } from '@angular/core';
import Two from '../../assets/two.min.js';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  MAX_X: number = 3500;
  MAX_Y: number = 1000;

  constructor() { }

  init(two: any) {
    //let texture = new Two.Texture()
    let sea= two.makeRectangle(0, 0, 7000, 1500);
    sea.fill = 'black';
    sea.opacity=.50;
    let sand = two.makeRectangle(0, 1100, 7000, 750);
    sand.fill = 'brown';

    //let planet = two.makeCircle(500, 700, 150);
    //planet.fill = texture;
  }
}
