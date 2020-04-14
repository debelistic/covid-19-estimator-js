const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds
  } = data;
  const { avgDailyIncomeUSD } = data.region;
  let duration;

  if (periodType === 'days') {
    duration = Math.trunc(timeToElapse / 3);
  } else if (periodType === 'weeks') {
    duration = Math.trunc((timeToElapse * 7) / 3);
  } else if (periodType === 'months') {
    duration = Math.trunc((timeToElapse * 30) / 3);
  }

  let dollarRate;

  if (periodType === 'days') {
    dollarRate = timeToElapse;
  } else if (periodType === 'weeks') {
    dollarRate = Math.trunc((timeToElapse * 7));
  } else if (periodType === 'months') {
    dollarRate = Math.trunc((timeToElapse * 30));
  }



  const impact = {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime: (2 ** duration) * (reportedCases * 10),
    severeCasesByRequestedTime: 0.15 * (2 ** duration) * (reportedCases * 10),
    hospitalBedsByRequestedTime: 0.35 * totalHospitalBeds
      * (0.15 * (2 ** duration) * (reportedCases * 10)),
    casesForICUByRequestedTime: 0.05 * (2 ** duration) * (reportedCases * 10),
    casesForVentilatorsByRequestedTime: 0.02 * (2 ** duration) * (reportedCases * 10),
    dollarsInFlight: (2 ** duration) * (reportedCases * 10) * avgDailyIncomeUSD * dollarRate
  };

  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    infectionsByRequestedTime: (2 ** duration) * (reportedCases * 50),
    severeCasesByRequestedTime: 0.15 * (2 ** duration) * (reportedCases * 50),
    hospitalBedsByRequestedTime: 0.35 * totalHospitalBeds
      * (0.15 * (2 ** duration) * (reportedCases * 50)),
    casesForICUByRequestedTime: 0.05 * (2 ** duration) * (reportedCases * 50),
    casesForVentilatorsByRequestedTime: 0.02 * (2 ** duration) * (reportedCases * 50),
    dollarsInFlight: (2 ** duration) * (reportedCases * 50) * avgDailyIncomeUSD * dollarRate
  };


  return {
    estimate: {
      impact,
      severeImpact
    }
  };
};

export default covid19ImpactEstimator;
