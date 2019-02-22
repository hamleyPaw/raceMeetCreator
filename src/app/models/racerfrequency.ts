import { Racer } from './racer';
import { FrequencyCategory } from './frequencycategory';

export class RacerFrequency {
    racer: Racer;
    frequency: FrequencyCategory;

    constructor(racer: Racer) {
        this.racer = racer;
    }
}
