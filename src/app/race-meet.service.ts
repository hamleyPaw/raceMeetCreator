import { Injectable } from '@angular/core';
import { Racer } from './models/racer';
import { RaceMeetParameters } from './models/racemeetparameters';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class RaceMeetService {
  private meetParams: RaceMeetParameters;

  constructor() { }

  generateRaceMeet(meetParameters: RaceMeetParameters) {
    this.meetParams = meetParameters;

    // Do stuff

    // TODO return an object that represents the finish race schedule
  }

  // Generation code...

//   private testbase() {
// 	int raceLaneCount = 4;
// 	int raceCountPerRacerPerMeet = 3;
	
// 	var totalRacers = 9;

// 	List<Racer> racers = new List<UserQuery.Racer>();

// 	List<FrequencyCategory> frequencyCategories =
// 	new List<UserQuery.FrequencyCategory>();

// 	List<List<RacerFrequency>> racerFrequencies =
// 	new List<List<RacerFrequency>>();

// 	List<RacerFrequencyGroup> racerFrequencyGroups =
// 	new List<UserQuery.RacerFrequencyGroup>();

// 	List<Race> raceSchedule = new List<UserQuery.Race>();
	
// 	// TODO use the actual list of racers? i.e. get from UI?
// 	CreateRacers(totalRacers, racers);

// 	// each racer is assigned a RacerFrequency 
// 	// RacerFrequencies are then grouped in complete groups of 7 
// 	// each slot in a group represents 1 frequncy category (from A - G)
// 	// by allocation order...
	
// 	CreateFrequencyCategories(frequencyCategories);

// 	AllocateRacersToFrequencyCategories(racers, frequencyCategories, racerFrequencyGroups);

// 	// Configure the number of races and race slots
	
// 	// race has slots = raceSlotCount (4 to 6)

// 	// races are grouped into raceAllocationBlocks, to ensure that each racer has an even spread of races across the meet
// 	// number of race blocks is equal to raceCountPerRacer (e.g. 3)

// 	var raceParams = PrepareRaceParameters(
// 		totalRacers,
// 		raceCountPerRacerPerMeet,
// 		raceLaneCount);
	
// 	// Assign race slots by frequency instance group by frequency category (i.e. All A, All C, All G)
	
// 	// Create freq category groupings...
// 	var racersByFreqGroup = CreateFrequencyCategoryGroupings(racerFrequencyGroups);
	
// 	// Now, perform race slot allocation...
// 	CreateRaceSchedule(
// 		raceParams,
// 		raceSchedule,
// 		racersByFreqGroup);
	
// 	raceSchedule.Dump();
	
// 	// And dump out running order...
// 	var raceRunningOrder = new List<List<string>>();
	
// 	raceSchedule.ForEach(i => raceRunningOrder.Add(i.GetRaceRunningOrder()));
	
// 	raceRunningOrder.Dump();
// }

// TODO Obsolete?
// private IRaceMeetParameters PrepareRaceParameters(
// 	int totalRacers,
// 	int raceCountPerRacerPerMeet, 
// 	int raceLaneCount)
// {
// 	var paramsToreturn = new RaceMeetParameters(
// 	totalRacers, 
// 	raceCountPerRacerPerMeet, 
// 	raceLaneCount);
	
// 	return paramsToreturn;
// }

// private void AllocateRacersToFrequencyCategories(
// 	ICollection<Racer> racers,
// 	ICollection<FrequencyCategory> frequencyCategories,
// 	ICollection<RacerFrequencyGroup> racerFrequencyGroups)
// {
// 	foreach (var racer in racers)
// 	{
// 		var currentAllocationGroup = GetCurrentRacerFreqGroup(racerFrequencyGroups);
// 		currentAllocationGroup.AddRacerToGroup(racer, frequencyCategories);
// 	}
// }

// private Dictionary<string, List<RacerFrequency>> CreateFrequencyCategoryGroupings(
// 	IEnumerable<RacerFrequencyGroup> racerFrequencyGroups)
// {
// 	var racersByFreqGroup = new Dictionary<string, List<RacerFrequency>>();

// 	foreach (var racerFrequencyGroup in racerFrequencyGroups)
// 	{
// 		var racersByFreq = racerFrequencyGroup.GroupRacers.GroupBy(j => j.Frequency.CategoryName);

// 		foreach (var racer in racerFrequencyGroup.GroupRacers)
// 		{
// 			if (racersByFreqGroup.ContainsKey(racer.Frequency.CategoryName))
// 			{
// 				racersByFreqGroup[racer.Frequency.CategoryName].Add(racer);
// 			}
// 			else
// 			{
// 				var newFreqList = new List<RacerFrequency>();
// 				newFreqList.Add(racer);

// 				racersByFreqGroup.Add(racer.Frequency.CategoryName, newFreqList);
// 			}
// 		}
// 	}
	
// 	return racersByFreqGroup;
// }

// private void CreateRaceSchedule(
// 	IRaceMeetParameters raceParams,
// 	ICollection<Race> raceSchedule,
// 	Dictionary<string, List<RacerFrequency>> racersByFreqGroup)
// {
// 	// Generate the race objects...
// 	for (var i = 0; i < raceParams.TotalRaces; i++)
// 	{
// 		raceSchedule.Add(new Race(i, raceParams.RaceLaneCount));
// 	}

// 	int currentSlotIndex = 0;
// 	int currentRaceIndex = 0;
// 	int nextRaceAllocationSpan = (int)raceParams.RacesPerAllocationBlock;

// 	for (var raceBlockIndex = 0; raceBlockIndex < raceParams.RaceCountPerRacerPerMeet; raceBlockIndex++)
// 	{
// 		int baseSlotIndex = currentRaceIndex * 4;
		
// 		if(currentSlotIndex > baseSlotIndex)
// 		{
// 			int endSlotIndex = currentSlotIndex + (int)raceParams.SlotsPerAllocationBlock;
// 			int endRaceIndex = (int)Math.Floor((double)endSlotIndex / (double)raceParams.RaceLaneCount);
			
// 			// TODO do this better?
// 			nextRaceAllocationSpan = (endRaceIndex - currentRaceIndex) + 1;
// 		}
		
// 		var racesInCurrentBlock = raceSchedule
// 							.Skip(currentRaceIndex).
// 							Take(nextRaceAllocationSpan);
							
// 		AllocateRacersToRaceBlock(
// 			racesInCurrentBlock,
// 			racersByFreqGroup);

// 		currentSlotIndex = ((int)(raceParams.SlotsPerAllocationBlock) * (raceBlockIndex + 1));
// 		currentRaceIndex = (int)Math.Floor((double)currentSlotIndex / (double)raceParams.RaceLaneCount);
// 	}
// }

// private void AllocateRacersToRaceBlock(
// 	IEnumerable<Race> raceBlock,
// 	Dictionary<string, List<RacerFrequency>> racersByFreqGroup)
// {
// 	// each slot can contain a frequencyinstance
// 	// FI.frequncy must be unique in a race
// 	// a freq instance must be assigned once to each race block

// 	// When assigning a FI to a Race block...
// 	// has the FI already been assigned to this block
// 	// if yes then move on
// 	// has the FI.Frequency already been assigned to 1 or more races in this block?
// 	// if yes then do not include those races in our choice
// 	// are any of the races in this block full already?
// 	// if yes, then don't include them in our choice
// 	// choose a race... favour those races that are more empty than others
// 	// look at race.emptyslot count and choose the greatest?
// 	// OR/AND get the set of most empty and choose 1 at random
// 	// ALSO, consider freq allocation order, favour freq spread
	
// 	// ALSO NB. do  not leave races with 1 or 2 racers in. depends on lane count	

// 	foreach (var racerFreqGroup in racersByFreqGroup)
// 	{
// 		foreach (var racer in racerFreqGroup.Value)
// 		{
// 			var currentRace = raceBlock
// 				.Where(i => !i.IsFull)
// 				.First();

// 			currentRace.AddRacerToRace(racer);
// 		}
// 	}
// }

// private RacerFrequencyGroup GetCurrentRacerFreqGroup(
// 	ICollection<RacerFrequencyGroup> racerFrequencyGroups)
// {
// 	RacerFrequencyGroup groupToReturn = null;
	
// 	if (!racerFrequencyGroups.Any() || racerFrequencyGroups.Last().IsFull)
// 	{
// 		groupToReturn = new RacerFrequencyGroup();
// 		racerFrequencyGroups.Add(groupToReturn);
// 	}
// 	else
// 	{
// 		groupToReturn = racerFrequencyGroups.Last();
// 	}

// 	return groupToReturn;
// }

// private void CreateFrequencyCategories(ICollection<FrequencyCategory> frequencyCategories)
// {
// 	frequencyCategories.Add(CreateNewFrequencyCategory(1, "A", "R", 8, 5917));
// 	frequencyCategories.Add(CreateNewFrequencyCategory(5, "B", "F", 7, 5860));
// 	frequencyCategories.Add(CreateNewFrequencyCategory(2, "C", "F", 5, 5820));
// 	frequencyCategories.Add(CreateNewFrequencyCategory(6, "D", "F", 3, 5780));
// 	frequencyCategories.Add(CreateNewFrequencyCategory(3, "E", "F", 1, 5740));
// 	frequencyCategories.Add(CreateNewFrequencyCategory(7, "F", "R", 2, 5695));
// 	frequencyCategories.Add(CreateNewFrequencyCategory(4, "G", "R", 1, 5648));
// }

// private FrequencyCategory CreateNewFrequencyCategory(
// 	int allocationOrder,
// 	string categoryName,
// 	string frequencyBand,
// 	int channelNumber,
// 	int channelValue)
// {
// 	return new FrequencyCategory()
// 	{
// 		AllocationOrder = allocationOrder,
// 		CategoryName = categoryName,
// 		Freqency = new Frequency()
// 		{
// 			Band = frequencyBand,
// 			ChannelNumber = channelNumber,
// 			ChannelValue = channelValue
// 		}
// 	};
// }

// private void CreateRacers(int racerCount, ICollection<Racer> racers)
// {
// 	for(var i = 0; i < racerCount; i++)
// 	{
// 		racers.Add(CreateNewRacer(i));
// 	}
// }

// private Racer CreateNewRacer(int id)
// {
// 	return new Racer() { Id = id, Name = $"Racer_{id}"};
// }

}
