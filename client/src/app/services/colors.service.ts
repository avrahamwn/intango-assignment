import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Color } from '../interfaces/color';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private _socket: Socket;
  private _colors$ = new Subject<Color[] | undefined>()

  get colors$() {
    return this._colors$.asObservable()
  }
  constructor() {
    this._socket = io(environment.baseAPI);
    this.listenToColorsChanges();
  }

  listenToColorsChanges() {
    this._socket.on('colors', (colors: Color[]) => {
      const maxValue = Math.max(...colors.map(color => color.votes));
      colors.forEach(color => {
        color.width = (20 * (color.votes / maxValue)) || 0;
      })
      this._colors$.next(colors)
    })
  }

  updateColorVotes(colorName: string) {
    this._socket.emit('vote', colorName)
  }
}
