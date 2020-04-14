const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse } = data;
  const numberOfDays = Math.trunc(timeToElapse / 3);

  return {
    estimate: {
      impact: {
        currentlyInfected: reportedCases * 10,
        infectionsByRequestedTime: (2 ** numberOfDays) * (reportedCases * 10)
      },
      severeImpact: {
        currentlyInfected: reportedCases * 50,
        infectionsByRequestedTime: (2 ** numberOfDays) * (reportedCases * 50)
      }
    }
  };
};

export default covid19ImpactEstimator;
