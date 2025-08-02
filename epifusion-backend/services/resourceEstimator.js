const { alerts } = require("../data/alertStore");

const estimate = (location) => {
  let beds = 0;
  let staff = 0;

  alerts
    .filter((a) => a.location.toLowerCase() === location.toLowerCase())
    .forEach((alert) => {
      if (alert.risk_score >= 0.8) {
        beds += 50;
        staff += 20;
      } else if (alert.risk_score >= 0.6) {
        beds += 30;
        staff += 10;
      } else {
        beds += 10;
        staff += 5;
      }
    });

  return {
    location,
    beds_required: beds,
    staff_required: staff
  };
};

module.exports = { estimate };
