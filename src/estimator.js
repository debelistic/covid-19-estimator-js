const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse } = data;
  const numberOfDays = Math.trunc(timeToElapse / 3);

  const impact = {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime: (2 ** numberOfDays) * (reportedCases * 10)
  };

  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    infectionsByRequestedTime: (2 ** numberOfDays) * (reportedCases * 50)
  };

  return {
    data,
    estimate: {
      impact,
      severeImpact
    }
  };
};

export default covid19ImpactEstimator;
