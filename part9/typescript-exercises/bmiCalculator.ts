interface PersonDetails {
  heightInCm: number,
  weightInKg: number
}

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  // BMI = weightInKg / heightInM^2
  const bmiValue = weightInKg / Math.pow(heightInCm / 100, 2);
  return translateBmiValueToCategory(bmiValue);
};

const translateBmiValueToCategory = (value: number): string => {
  if (value < 15) {
    return 'Very severly underweight';
  } else if (value >= 15 && value < 16) {
    return 'Severly underweight';
  } else if (value >= 16 && value < 18.5) {
    return 'Underweight';
  } else if (value >= 18.5 && value < 25) {
    return 'Normal (healthy weight)';
  } else if (value >= 25 && value < 30) {
    return 'Overweight';
  } else if (value >= 30 && value < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (value >= 35 && value < 40) {
    return 'Obese Class II (Moderately obese)';
  } else {
    return 'Obese Class III (Moderately obese)';
  }
};

const parseBMIArguments = (args: Array<string>): PersonDetails => {
  if (args.length < 4 || args.length > 4) {
    throw new Error('Incorrect number of arguments provided.');
  }
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3])
    }
  } else {
    throw new Error('Invalid arguments. Arguments must be numbers');
  }
}

const personDetails = parseBMIArguments(process.argv);
console.log(calculateBmi(personDetails.heightInCm, personDetails.weightInKg));