interface ExerciseInformation {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  rating: number,
  ratingDescription: string,
  success: boolean
}

interface ExerciseArguments {
  target: number,
  dailyExerciseAmounts: Array<number>
}

const calculateExercises = (targetDailyAmount: number, dailyExerciseAmounts: Array<number>): ExerciseInformation => {
  const averageDailyAmount = dailyExerciseAmounts.reduce((prev, current) => prev + current) / dailyExerciseAmounts.length;

  const averageToTargetRatio = averageDailyAmount / targetDailyAmount
  let rating = 2;
  let ratingDescription = 'Good job! Target met.';
  if (averageToTargetRatio > 1.25) {
    rating = 3;
    ratingDescription = 'Excellent! Target exceeded.';
  } else if (averageToTargetRatio < 0.90) {
    rating = 1;
    ratingDescription = 'You can do better! Meet the target next time.';
  }

  return {
    periodLength: dailyExerciseAmounts.length,
    trainingDays: dailyExerciseAmounts.filter(x => x > 0).length,
    target: targetDailyAmount,
    average: averageDailyAmount,
    rating: rating,
    ratingDescription: ratingDescription,
    success: targetDailyAmount >= averageDailyAmount
  }
};

const parseExerciseArguments = (args: Array<string>): ExerciseArguments => {
  if (args.length < 4 || args.length > 4) {
    throw new Error('Incorrect number of arguments provided.');
  }

  const targetAmount = Number(args[2]);
  if (isNaN(targetAmount)) {
    throw new Error('Invalid arguments. Target argument must be a number');
  } 

  const exercises = args[3].replace('[', '').replace(']', '').replace(' ', '').split(',').map(x => Number(x));

  for (let i = 0; i < exercises.length; i++) {
    if (exercises[i] === NaN) {
      throw new Error('Invalid arguments. Daily exercise argument must contain array of numbers');
    }
  }

  return {
    target: targetAmount,
    dailyExerciseAmounts: exercises
  }
}

const exerciseArguments = parseExerciseArguments(process.argv);
console.log(calculateExercises(exerciseArguments.target, exerciseArguments.dailyExerciseAmounts));
