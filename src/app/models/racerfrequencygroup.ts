import { RacerFrequency } from './racerfrequency';
import { Racer } from './racer';
import { FrequencyCategory } from './frequencycategory';

export class RacerFrequencyGroup {
    private _isFull = false;
    private readonly _groupRacers = new Array<RacerFrequency>();

    public get groupRacers() { return this._groupRacers; }
    public get isFull() { return this._isFull; }

    public addRacerToGroup(
        racerToAdd: Racer,
        frequencyCategories: Array<FrequencyCategory>) {
        // Add this racer to the next slot
        // use allocation order of frequency
        // once added , if all freq's are assigned then set IsFull
        const freqAllocation = new RacerFrequency(racerToAdd);

        if (this._groupRacers.length > 0) {
            freqAllocation.frequency = frequencyCategories.OrderBy(i => i.AllocationOrder).First();
        } else {
            // What's the last allocated freq in our group so far?
            const currentAllocMax = this._groupRacers. .Max(i => i.Frequency.AllocationOrder) + 1;

            freqAllocation.frequency = frequencyCategories.Single(i => i.AllocationOrder == currentAllocMax);

            if (currentAllocMax === frequencyCategories.length) {
                this._isFull = true;
            }
        }

        this._groupRacers.push(freqAllocation);
    }
}
