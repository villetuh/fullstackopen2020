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

console.log(calculateBmi(180, 74));