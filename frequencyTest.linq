<Query Kind="Program" />

//private const int raceLaneCount = 4;
//private const int raceCountPerRacerPerMeet = 3;

void Main()
{
	int raceLaneCount = 4;
	int raceCountPerRacerPerMeet = 4;
	
	var totalRacers = 10;

	List<Racer> racers = new List<UserQuery.Racer>();

	List<FrequencyCategory> frequencyCategories =
	new List<UserQuery.FrequencyCategory>();

	List<List<RacerFrequency>> racerFrequencies =
	new List<List<RacerFrequency>>();

	List<RacerFrequencyGroup> racerFrequencyGroups =
	new List<UserQuery.RacerFrequencyGroup>();

	List<Race> raceSchedule = new List<UserQuery.Race>();
	
	// TODO use the actual list of racers? i.e. get from UI?
	CreateRacers(totalRacers, racers);

	// each racer is assigned a RacerFrequency 
	// RacerFrequencies are then grouped in complete groups of 7 
	// each slot in a group represents 1 frequncy category (from A - G)
	// by allocation order...
	
	CreateFrequencyCategories(frequencyCategories);

	AllocateRacersToFrequencyCategories(racers, frequencyCategories, racerFrequencyGroups);

	// Configure the number of races and race slots
	
	// race has slots = raceSlotCount (4 to 6)

	// races are grouped into raceAllocationBlocks, to ensure that each racer has an even spread of races across the meet
	// number of race blocks is equal to raceCountPerRacer (e.g. 3)

	var raceParams = PrepareRaceParameters(
		totalRacers,
		raceCountPerRacerPerMeet,
		raceLaneCount);
	
	// Assign race slots by frequency instance group by frequency category (i.e. All A, All C, All G)
	
	// Create freq category groupings...
	// racersByFreqGroup = CreateFrequencyCategoryGroupings(racerFrequencyGroups);
	
	List<RacerFrequency> allRacersWithFrequencies = new List<UserQuery.RacerFrequency>();
	
	racerFrequencyGroups.ForEach(i => allRacersWithFrequencies.AddRange(i.GroupRacers));
	
	//allRacersWithFrequencies.Dump("Allracers");
	
	// Now, perform race slot allocation...
	CreateRaceSchedule(
		raceParams,
		raceSchedule,
		allRacersWithFrequencies);
	
	raceSchedule.Dump("Schedule");
	
	// And dump out running order...
	var raceRunningOrder = new List<List<string>>();
	
	raceSchedule.ForEach(i => raceRunningOrder.Add(i.GetRaceRunningOrder()));
	
	//raceRunningOrder.Dump("race running order");
	
	List<string> racecsv = new List<string>();
	
	int raceindex = 1;
	
	foreach(var race in raceRunningOrder){
		int laneindex = 1;
		
		foreach(var lane in race)
		{
			string currenRaceCSV = $"{raceindex},{laneindex},{lane}";
			racecsv.Add(currenRaceCSV);
			laneindex++;	
		}
				
		raceindex++;
	}
	
	racecsv.Dump("Races", true);
	
	var racerList = new List<string>();
	
	// List of racers plus frequency details
	foreach(var racer in allRacersWithFrequencies)
	{
		racerList.Add($"{racer.Racer.Name}, {racer.Frequency.Freqency.ChannelValue} ,{racer.Frequency.Freqency.Band}{racer.Frequency.Freqency.ChannelNumber}");		
	}

	racerList.Dump("Racers", null, true);

}

private IRaceMeetParameters PrepareRaceParameters(
	int totalRacers,
	int raceCountPerRacerPerMeet, 
	int raceLaneCount)
{
	var paramsToreturn = new RaceMeetParameters(
	totalRacers, 
	raceCountPerRacerPerMeet, 
	raceLaneCount);
	
	return paramsToreturn;
}

private void AllocateRacersToFrequencyCategories(
	ICollection<Racer> racers,
	ICollection<FrequencyCategory> frequencyCategories,
	ICollection<RacerFrequencyGroup> racerFrequencyGroups)
{
	foreach (var racer in racers)
	{
		var currentAllocationGroup = GetCurrentRacerFreqGroup(racerFrequencyGroups);
		currentAllocationGroup.AddRacerToGroup(racer, frequencyCategories);
	}
}

private Dictionary<string, List<RacerFrequency>> CreateFrequencyCategoryGroupings(
	IEnumerable<RacerFrequencyGroup> racerFrequencyGroups)
{
	var racersByFreqGroup = new Dictionary<string, List<RacerFrequency>>();

	foreach (var racerFrequencyGroup in racerFrequencyGroups)
	{
		var racersByFreq = racerFrequencyGroup.GroupRacers.GroupBy(j => j.Frequency.CategoryName);

		foreach (var racer in racerFrequencyGroup.GroupRacers)
		{
			if (racersByFreqGroup.ContainsKey(racer.Frequency.CategoryName))
			{
				racersByFreqGroup[racer.Frequency.CategoryName].Add(racer);
			}
			else
			{
				var newFreqList = new List<RacerFrequency>();
				newFreqList.Add(racer);

				racersByFreqGroup.Add(racer.Frequency.CategoryName, newFreqList);
			}
		}
	}
	
	return racersByFreqGroup;
}

private void CreateRaceSchedule(
	IRaceMeetParameters raceParams,
	ICollection<Race> raceSchedule,
	List<RacerFrequency> racersByFreqGroup)
{
	// Generate the race objects...
	for (var i = 0; i < raceParams.TotalRaces; i++)
	{
		raceSchedule.Add(new Race(i, raceParams.RaceLaneCount));
	}

	int currentSlotIndex = 0;
	int currentRaceIndex = 0;
	int nextRaceAllocationSpan = (int)raceParams.RacesPerAllocationBlock;

	var unassignedRacers = new List<RacerFrequency>();

	for (var raceBlockIndex = 0; raceBlockIndex < raceParams.RaceCountPerRacerPerMeet; raceBlockIndex++)
	{
		int baseSlotIndex = currentRaceIndex * 4;
		
		if(currentSlotIndex > baseSlotIndex)
		{
			int endSlotIndex = currentSlotIndex + (int)raceParams.SlotsPerAllocationBlock;
			int endRaceIndex = (int)Math.Floor((double)endSlotIndex / (double)raceParams.RaceLaneCount);
			
			// TODO do this better?
			nextRaceAllocationSpan = (endRaceIndex - currentRaceIndex) + 1;
		}
		
		var racesInCurrentBlock = raceSchedule
							.Skip(currentRaceIndex).
							Take(nextRaceAllocationSpan);

		//raceBlockIndex.Dump("block");
		//racesInCurrentBlock.Count().Dump("raceCount");

		unassignedRacers.AddRange(AllocateRacersToRaceBlock(
			racesInCurrentBlock,
			racersByFreqGroup));
			
		//racesInCurrentBlock.Dump("block complete");

		currentSlotIndex = ((int)(raceParams.SlotsPerAllocationBlock) * (raceBlockIndex + 1));
		currentRaceIndex = (int)Math.Floor((double)currentSlotIndex / (double)raceParams.RaceLaneCount);
	}
	
	if(unassignedRacers.Any())
	{
		// Sweep up any unassigned into empty slots
		AllocateRacersToRaceBlock(
			raceSchedule,
			unassignedRacers);
	}
	
	//raceSchedule.Dump("schedule complete?");
}

private List<RacerFrequency> AllocateRacersToRaceBlock(
	IEnumerable<Race> raceBlock,
	List<RacerFrequency> racers)
{
	// each slot can contain a racer
	// racer.frequncy must be unique in a race
	// a racer must be assigned once to each race block

	// When assigning a racer to a Race block...
	// has the racer already been assigned to this block
	// if yes then move on
	
	// has the racer.Frequency already been assigned to 1 or more races in this block?
	// if yes then do not include those races in our choice
	
	// are any of the races in this block full already?
	// if yes, then don't include them in our choice
	
	// choose a race... favour those races that are more empty than others
	// look at race.emptyslot count and choose the greatest?
	// OR/AND get the set of most empty and choose 1 at random
	// ALSO, consider freq allocation order, favour freq spread
	
	// ALSO NB. do  not leave races with 1 or 2 racers in. depends on lane count	
	
	var unassignedRacers = new List<RacerFrequency>();
	
	//foreach (var racerFreqGroup in racersByFreqGroup)
	//{
		foreach (var racer in racers)
		{
			// Get non full races...
			var notFullRaces = raceBlock
				.Where(i => !i.IsFull)
				.ToList();
				
			//notFullRaces.Dump("not full");

			var eligibleRaces = notFullRaces
				.Where(i => i.Lanes.All(j => j.Frequency.CategoryName != racer.Frequency.CategoryName))
				.ToList();

			//eligibleRaces.Dump("eligible");

			var targetRace = eligibleRaces.OrderBy(i => i.Lanes.Count).FirstOrDefault();

			if (targetRace != null)
			{

				targetRace.AddRacerToRace(racer);
			}
			else
			{
				//"No slots".Dump();
				
				unassignedRacers.Add(racer);
			}
		}
	//}
	
	return unassignedRacers;
}

private RacerFrequencyGroup GetCurrentRacerFreqGroup(
	ICollection<RacerFrequencyGroup> racerFrequencyGroups)
{
	RacerFrequencyGroup groupToReturn = null;
	
	if (!racerFrequencyGroups.Any() || racerFrequencyGroups.Last().IsFull)
	{
		groupToReturn = new RacerFrequencyGroup();
		racerFrequencyGroups.Add(groupToReturn);
	}
	else
	{
		groupToReturn = racerFrequencyGroups.Last();
	}

	return groupToReturn;
}

//private void CreateFrequencyCategories(ICollection<FrequencyCategory> frequencyCategories)
//{
//	frequencyCategories.Add(CreateNewFrequencyCategory(1, "A", "R", 8, 5917));
//	frequencyCategories.Add(CreateNewFrequencyCategory(5, "B", "F", 7, 5860));
//	frequencyCategories.Add(CreateNewFrequencyCategory(2, "C", "F", 5, 5820));
//	frequencyCategories.Add(CreateNewFrequencyCategory(6, "D", "F", 3, 5780));
//	frequencyCategories.Add(CreateNewFrequencyCategory(3, "E", "F", 1, 5740));
//	frequencyCategories.Add(CreateNewFrequencyCategory(7, "F", "R", 2, 5695));
//	frequencyCategories.Add(CreateNewFrequencyCategory(4, "G", "R", 1, 5648));
//}

private void CreateFrequencyCategories(ICollection<FrequencyCategory> frequencyCategories)
{
	frequencyCategories.Add(CreateNewFrequencyCategory(1, "A", "R", 1, 5658));
	frequencyCategories.Add(CreateNewFrequencyCategory(5, "B", "R", 2, 5695));
	frequencyCategories.Add(CreateNewFrequencyCategory(2, "C", "F", 2, 5760));
	frequencyCategories.Add(CreateNewFrequencyCategory(6, "D", "F", 4, 5800));
	frequencyCategories.Add(CreateNewFrequencyCategory(3, "E", "R", 7, 5880));
	frequencyCategories.Add(CreateNewFrequencyCategory(4, "F", "R", 8, 5917));
}

private FrequencyCategory CreateNewFrequencyCategory(
	int allocationOrder,
	string categoryName,
	string frequencyBand,
	int channelNumber,
	int channelValue)
{
	return new FrequencyCategory()
	{
		AllocationOrder = allocationOrder,
		CategoryName = categoryName,
		Freqency = new Frequency()
		{
			Band = frequencyBand,
			ChannelNumber = channelNumber,
			ChannelValue = channelValue
		}
	};
}

private void CreateRacers(int racerCount, ICollection<Racer> racers)
{
	for(var i = 0; i < racerCount; i++)
	{
		racers.Add(CreateNewRacer(i));
	}
}

private Racer CreateNewRacer(int id)
{
	return new Racer() { Id = id, Name = $"Racer_{id}"};
}

// --- Classes

public interface IRaceMeetParameters
{
	int RacerCount { get; }
	int RaceCountPerRacerPerMeet { get; }
	int RaceLaneCount { get; }

	double TotalRaces { get; }
	double TotalRaceSlots { get; }
	double SlotsPerAllocationBlock { get; }
	double RacesPerAllocationBlock { get; }
}

public class RaceMeetParameters : IRaceMeetParameters
{
	public int RacerCount { get; }
	public int RaceCountPerRacerPerMeet { get; }
	public int RaceLaneCount { get; }

	public double TotalRaces { get; }
	public double TotalRaceSlots { get; }
	public double SlotsPerAllocationBlock { get; }
	public double RacesPerAllocationBlock { get; }
	
	public RaceMeetParameters(
		int totalRacers, 
		int raceCountPerRacerPerMeet, 
		int raceLaneCount)
	{
		RacerCount = totalRacers;
		RaceCountPerRacerPerMeet = raceCountPerRacerPerMeet;
		RaceLaneCount = raceLaneCount;
		
		TotalRaceSlots = totalRacers * raceCountPerRacerPerMeet;
		
		double totalRacesIntermediate = TotalRaceSlots / raceLaneCount;
		
		TotalRaces = Math.Ceiling(totalRacesIntermediate);
		
		SlotsPerAllocationBlock = Math.Ceiling(TotalRaceSlots / raceCountPerRacerPerMeet);
		RacesPerAllocationBlock = Math.Ceiling(SlotsPerAllocationBlock / raceLaneCount);

		// Parameter Dump-----
		totalRacers.Dump("racers");
		TotalRaceSlots.Dump("slotCount");
		totalRacesIntermediate.Dump("totalRacesIntermediate");
		TotalRaces.Dump("totalRaces");
		SlotsPerAllocationBlock.Dump("slotsPerAllocationBlock");
		RacesPerAllocationBlock.Dump("racesPerAllocationBlock");
	}
}

public class RacerFrequencyGroup
{
	private bool _IsFull = false;	
	private readonly List<RacerFrequency> _GroupRacers = new List<UserQuery.RacerFrequency>();

	public List<RacerFrequency> GroupRacers 
	{ 
		get 
		{
			return _GroupRacers;	
		}
	}
	
	public bool IsFull 
	{ 
		get 
		{ 
			return _IsFull; 
		} 
	}

	public void AddRacerToGroup(
		Racer racerToAdd,
		ICollection<FrequencyCategory> frequencyCategories)
	{
		// Add this racer to the next slot
		// use allocation order of frequency
		// once added , if all freq's are assigned then set IsFull
		var freqAllocation = new RacerFrequency() { Racer = racerToAdd };

		if (!GroupRacers.Any())
		{
			freqAllocation.Frequency = frequencyCategories.OrderBy(i => i.AllocationOrder).First();
		}
		else
		{
			// What's the last allocated freq in our group so far?
			int currentAllocMax = _GroupRacers.Max(i => i.Frequency.AllocationOrder) + 1;

			freqAllocation.Frequency = frequencyCategories.Single(i => i.AllocationOrder == currentAllocMax);

			if (currentAllocMax == frequencyCategories.Count)
			{
				_IsFull = true;
			}
		}

		_GroupRacers.Add(freqAllocation);
	}
}

public class RacerFrequency
{
	public Racer Racer { get; set; }
	public FrequencyCategory Frequency {get;set;}
}

public class Race
{
	private int _LaneCount;
	private bool _IsFull = false;

	private readonly List<RacerFrequency> _Lanes = new List<UserQuery.RacerFrequency>();
	public List<RacerFrequency> Lanes
	{
		get
		{
			return _Lanes;
		}
	}

	public int RaceOrderIndex { get; }

	public bool IsFull
	{
		get
		{
			return _IsFull;
		}
	}

	public bool IsRacerFrequencyAlreadyInThisRace(RacerFrequency racerToCheck)
	{
		return _Lanes.Any(i => i.Frequency.CategoryName == racerToCheck.Frequency.CategoryName);	
	}

	public Race(int raceOrder, int laneCount)
	{
		_LaneCount = laneCount;
		RaceOrderIndex = raceOrder;
	}

	public void AddRacerToRace(RacerFrequency racerToAdd)
	{
		_Lanes.Add(racerToAdd);

		if (_Lanes.Count == _LaneCount)
		{
			_IsFull = true;
		}
	}
	
	public List<string> GetRaceRunningOrder(){
		return _Lanes.Select(i => i.Racer.Name).ToList();
	}
}

public class Racer
{
	public string Name { get; set; }
	public int Id { get; set;}
}

public class FrequencyCategory
{
	public string CategoryName { get; set; }
	public Frequency Freqency { get; set; }
	public int AllocationOrder {get; set;}
}

public class Frequency
{
	public int ChannelValue { get; set; }
	public string Band { get; set; }
	public int ChannelNumber {get; set;}
}