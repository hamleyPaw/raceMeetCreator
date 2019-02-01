import { Component } from '@angular/core';
import { RaceMeetParameters } from './models/racemeetparameters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'raceMeetCreator';

  onNewMeetRequested(newMeetDetails: RaceMeetParameters){
    this.title = newMeetDetails.name;

    // TODO submit the parameters to the service

    // TODO pass the results to the display component
  }
}
