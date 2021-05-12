import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello.';

  onSubheadingMouseEnter(): void {
    this.toggleMenuVisibility();
  }

  private toggleMenuVisibility() {
    console.log("menu visible");
  }
}
