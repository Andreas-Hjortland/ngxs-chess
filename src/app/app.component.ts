import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [FormsModule, RouterOutlet],
})
export class AppComponent {
  title = 'ngxs-chess';
  name: string = 'Anonymous beaver';
}
