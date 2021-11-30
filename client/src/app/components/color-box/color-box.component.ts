import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'src/app/interfaces/color';
import { ColorsService } from 'src/app/services/colors.service';

@Component({
  selector: 'app-color-box',
  templateUrl: './color-box.component.html',
  styleUrls: ['./color-box.component.scss']
})
export class ColorBoxComponent implements OnInit {
  @Input() color!: Color;
  constructor(private colorsService: ColorsService) { }

  ngOnInit(): void {
  }

  onColorClick() {
    this.colorsService.updateColorVotes(this.color.name)
  }

}
