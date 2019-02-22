import { RacerFrequency } from './racerfrequency';

export class Race {
    private _laneCount: number;
    private _isFull = false;
    private _raceOrderIndex: number;
    private _lanes = Array<RacerFrequency>();

    get lanes() { return this._lanes; }
    get isFull() { return this._isFull; }
    get raceOrderIndex() { return this.raceOrderIndex; }

    public constructor(raceOrder: number, laneCount: number) {
        this._raceOrderIndex = raceOrder;
        this._laneCount = laneCount;
    }

    public isRacerFrequencyAlreadyInThisRace(racerToCheck: RacerFrequency): boolean {
        let frequencyInUse = false;

        for (const lane of this._lanes) {
            if (lane.frequency.categoryName === racerToCheck.frequency.categoryName) {
                frequencyInUse = true;
                break;
            }
        }

        return frequencyInUse;
    }

    public addRacerToRace(racerToAdd: RacerFrequency) {
        this._lanes.push(racerToAdd);

        if (this._lanes.length === this._laneCount) {
            this._isFull = true;
        }
    }

    public getRaceRunningOrder(): string[] {
        const namesToReturn = new Array<string>();

        for (const lane of this._lanes) {
            namesToReturn.push(lane.racer.name);
        }

        return namesToReturn;
    }
}
