interface ExerciseInformation {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    rating: number,
    ratingDescription: string,
    success: boolean
}

const calculateExercises = (dailyExerciseAmounts: Array<number>): ExerciseInformation => {
    const averageDailyAmount = dailyExerciseAmounts.reduce((prev, current) => prev + current) / dailyExerciseAmounts.length;
    const targetDailyAmount = 2.0;

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
