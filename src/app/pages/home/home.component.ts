import { Component } from '@angular/core';
import { BoasvindasComponent} from "../../components/boasvindas/boasvindas.component";
import {  MenuComponent } from "../../components/menu/menu.component";

@Component({
  selector: 'app-home',
  imports: [BoasvindasComponent, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class Home {

}
