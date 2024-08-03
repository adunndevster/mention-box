import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { SetPositionDirective } from './directives/set-position.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatBoxComponent, SetPositionDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'chat-box';
}
