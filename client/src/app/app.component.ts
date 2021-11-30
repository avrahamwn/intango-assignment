import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorsService } from 'src/app/services/colors.service';
import { Color } from './interfaces/color';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  colors$!: Observable<Color[] | undefined>;

  constructor(private colorsService: ColorsService) { }

  ngOnInit() {
    this.initColors();
  }

  initColors() {
    this.colors$ = this.colorsService.colors$;
  }


}
