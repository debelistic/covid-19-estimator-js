const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds
  } = data;
  const { avgDailyIncomeUSD } = data.region;
  let duration;

  if (periodType === 'days') {
    duration = timeToElapse;
  } else if (periodType === 'weeks') {
    duration = timeToElapse * 7;
  } else if (periodType === 'months') {
    duration = timeToElapse * 30;
  }
  const factor = Math.trunc(duration / 3);
  const estimate = 2 ** factor;
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
    infectionsByRequestedTime: estimate * (reportedCases * 10),
    severeCasesByRequestedTime: 0.15 * estimate * (reportedCases * 10),
    hospitalBedsByRequestedTime: 0.35 * totalHospitalBeds
      * (0.15 * estimate * (reportedCases * 10)),
    casesForICUByRequestedTime: 0.05 * estimate * (reportedCases * 10),
    casesForVentilatorsByRequestedTime: 0.02 * estimate * (reportedCases * 10),
    dollarsInFlight: estimate * (reportedCases * 10) * avgDailyIncomeUSD * dollarRate
  };

  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    infectionsByRequestedTime: estimate * (reportedCases * 50),
    severeCasesByRequestedTime: 0.15 * estimate * (reportedCases * 50),
    hospitalBedsByRequestedTime: 0.35 * totalHospitalBeds
      * (0.15 * estimate * (reportedCases * 50)),
    casesForICUByRequestedTime: 0.05 * estimate * (reportedCases * 50),
    casesForVentilatorsByRequestedTime: 0.02 * estimate * (reportedCases * 50),
    dollarsInFlight: estimate * (reportedCases * 50) * avgDailyIncomeUSD * dollarRate
  };


  return {
    estimate: {
      impact,
      severeImpact
    }
  };
};

export default covid19ImpactEstimator;
