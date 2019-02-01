import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { RaceMeetParameters } from '../models/racemeetparameters';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-race-meet-generator',
  templateUrl: './race-meet-generator.component.html',
  styleUrls: ['./race-meet-generator.component.css']
})
export class RaceMeetGeneratorComponent implements OnInit {
  parametersToSend: RaceMeetParameters;

  raceForm = this.fb.group({
    racename: ['', Validators.required],
    lanecount: [''],
    racecount: ['']
  });

  @Output() newMeetRequested = new EventEmitter<RaceMeetParameters>();

  constructor(private fb: FormBuilder) {
    this.parametersToSend = new RaceMeetParameters();
    this.parametersToSend.name = 'test';
    this.parametersToSend.racesPerMeetCount = 3;
    this.parametersToSend.laneCount = 4;
   }

  ngOnInit() {  }

  get racename() { return this.raceForm.get('racename'); }

  get racecount() { return this.raceForm.get('racecount'); }

  get lanecount() { return this.raceForm.get('lanecount'); }

  generateRaceMeet(): void {
    this.parametersToSend.racesPerMeetCount = this.raceForm.get('racecount').value;
    this.parametersToSend.laneCount = this.raceForm.get('lanecount').value;
    this.parametersToSend.name = this.raceForm.get('racename').value;

    // TODO return the paramaters object up to parent
    this.newMeetRequested.emit(this.parametersToSend);
  }
}
