const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds
  } = data;
  let numberOfDays = Math.trunc(timeToElapse / 3);

  if (periodType === 'days') {
    numberOfDays = Math.trunc(timeToElapse / 3);
  } else if (periodType === 'weeks') {
    numberOfDays = Math.trunc((timeToElapse / 3) * 7);
  } else if (periodType === 'months') {
    numberOfDays = Math.trunc((timeToElapse / 3) * 30);
  }

  //  infectionsByRequestedTime * data.region.avgDailyIncomeUSD


  const impact = {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime: (2 ** numberOfDays) * (reportedCases * 10),
    severeCasesByRequestedTime: 0.15 * (2 ** numberOfDays) * (reportedCases * 10),
    hospitalBedsByRequestedTime: 0.35 * totalHospitalBeds
      * (0.15 * (2 ** numberOfDays) * (reportedCases * 10)),
    casesForICUByRequestedTime: 0.05 * (2 ** numberOfDays) * (reportedCases * 10),
    casesForVentilatorsByRequestedTime: 0.02 * (2 ** numberOfDays) * (reportedCases * 10)
  };

  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    infectionsByRequestedTime: (2 ** numberOfDays) * (reportedCases * 50),
    severeCasesByRequestedTime: 0.15 * (2 ** numberOfDays) * (reportedCases * 50),
    hospitalBedsByRequestedTime: 0.35 * totalHospitalBeds
      * (0.15 * (2 ** numberOfDays) * (reportedCases * 50)),
    casesForICUByRequestedTime: 0.05 * (2 ** numberOfDays) * (reportedCases * 50),
    casesForVentilatorsByRequestedTime: 0.02 * (2 ** numberOfDays) * (reportedCases * 50)

  };


  return {
    estimate: {
      impact,
      severeImpact
    }
  };
};

export default covid19ImpactEstimator;
