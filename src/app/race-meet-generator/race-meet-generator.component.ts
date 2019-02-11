import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { RaceMeetParameters } from '../models/racemeetparameters';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
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
    lanecount: ['', [ Validators.min(4), Validators.max(8) ]],
    racecount: ['', [ Validators.min(1), Validators.max(10) ]],
    racers: this.fb.array([this.fb.control('')])
  });

  @Output() newMeetRequested = new EventEmitter<RaceMeetParameters>();

  constructor(private fb: FormBuilder) {
    this.parametersToSend = new RaceMeetParameters();
    this.parametersToSend.name = 'test';
    this.parametersToSend.racesPerMeetCount = 3;
    this.parametersToSend.laneCount = 6;
   }

  ngOnInit() {  }

  get racename() { return this.raceForm.get('racename'); }

  get racecount() { return this.raceForm.get('racecount'); }

  get lanecount() { return this.raceForm.get('lanecount'); }

  get racers() { return this.raceForm.get('racers') as FormArray; }

  addRacer() {
    this.racers.push(this.fb.control(''));
  }

  generateRaceMeet(): void {
    this.parametersToSend.racesPerMeetCount = this.raceForm.get('racecount').value;
    this.parametersToSend.laneCount = this.raceForm.get('lanecount').value;
    this.parametersToSend.name = this.raceForm.get('racename').value;

    // TODO add racers

    // Return the paramaters object up to parent
    this.newMeetRequested.emit(this.parametersToSend);
  }
}
