// Mock data for EpiFusion AI Dashboard (Toronto-focused)

export const mockAlerts = [
  {
    id: "alert-1",
    disease: "Pneumonia",
    location: "Downtown Toronto, ON",
    lat: 43.6532,
    lng: -79.3832,
    risk_score: 0.78,
    credibility: "High",
    source: "Toronto General Hospital",
    timestamp: "2025-08-02T14:23:00Z",
    explanation: "Increased pneumonia-like symptoms in ER visits around the downtown core."
  },
  {
    id: "alert-2",
    disease: "Influenza",
    location: "Scarborough, Toronto, ON",
    lat: 43.7735,
    lng: -79.2577,
    risk_score: 0.45,
    credibility: "Medium",
    source: "Toronto Public Health Surveillance",
    timestamp: "2025-08-02T12:15:00Z",
    explanation: "Rising flu cases in schools across the Scarborough region."
  },
  {
    id: "alert-3",
    disease: "COVID-19",
    location: "Etobicoke, Toronto, ON",
    lat: 43.6205,
    lng: -79.5132,
    risk_score: 0.92,
    credibility: "High",
    source: "Toronto Public Health",
    timestamp: "2025-08-02T10:30:00Z",
    explanation: "Community spread detected, possible variant cluster in Etobicoke area."
  },
  {
    id: "alert-4",
    disease: "Dengue Fever",
    location: "North York, Toronto, ON",
    lat: 43.7615,
    lng: -79.4111,
    risk_score: 0.65,
    credibility: "Medium",
    source: "Vector Surveillance Toronto",
    timestamp: "2025-08-02T09:45:00Z",
    explanation: "Imported case with local mosquito exposure risk in North York."
  },
  {
    id: "alert-5",
    disease: "Measles",
    location: "East York, Toronto, ON",
    lat: 43.6905,
    lng: -79.3270,
    risk_score: 0.88,
    credibility: "High",
    source: "Local Clinics Network",
    timestamp: "2025-08-02T08:20:00Z",
    explanation: "Cluster in under-vaccinated populations in East York."
  }
];

export const mockForecasts = {
  "alert-1": {
    alert_id: "alert-1",
    daily_cases: [50, 65, 80, 95, 110, 130, 150],
    r0: 1.3
  },
  "alert-2": {
    alert_id: "alert-2",
    daily_cases: [30, 35, 40, 45, 50, 55, 60],
    r0: 1.1
  },
  "alert-3": {
    alert_id: "alert-3",
    daily_cases: [100, 150, 200, 280, 350, 420, 500],
    r0: 1.8
  },
  "alert-4": {
    alert_id: "alert-4",
    daily_cases: [20, 25, 30, 35, 40, 45, 50],
    r0: 1.2
  },
  "alert-5": {
    alert_id: "alert-5",
    daily_cases: [80, 120, 160, 200, 240, 280, 320],
    r0: 1.5
  }
};

export const mockResources = {
  "alert-1": {
    alert_id: "alert-1",
    beds_needed: 80,
    beds_capacity: 100,
    staff_needed: 20,
    staff_capacity: 25,
    vaccine_stock: 500,
    vaccine_threshold: 1000
  },
  "alert-2": {
    alert_id: "alert-2",
    beds_needed: 45,
    beds_capacity: 100,
    staff_needed: 12,
    staff_capacity: 25,
    vaccine_stock: 800,
    vaccine_threshold: 1000
  },
  "alert-3": {
    alert_id: "alert-3",
    beds_needed: 95,
    beds_capacity: 100,
    staff_needed: 28,
    staff_capacity: 25,
    vaccine_stock: 200,
    vaccine_threshold: 1000
  },
  "alert-4": {
    alert_id: "alert-4",
    beds_needed: 30,
    beds_capacity: 100,
    staff_needed: 8,
    staff_capacity: 25,
    vaccine_stock: 1200,
    vaccine_threshold: 1000
  },
  "alert-5": {
    alert_id: "alert-5",
    beds_needed: 85,
    beds_capacity: 100,
    staff_needed: 22,
    staff_capacity: 25,
    vaccine_stock: 300,
    vaccine_threshold: 1000
  }
};

// Helper function to get risk level based on score
export const getRiskLevel = (score) => {
  if (score >= 0.7) return 'high';
  if (score >= 0.4) return 'medium';
  return 'low';
};

// Helper function to get risk color
export const getRiskColor = (score) => {
  if (score >= 0.7) return 'red';
  if (score >= 0.4) return 'yellow';
  return 'green';
};




// // Mock data for EpiFusion AI Dashboard

// export const mockAlerts = [
//   {
//     id: "alert-1",
//     disease: "Pneumonia",
//     location: "Toronto, Canada",
//     lat: 43.6532,
//     lng: -79.3832,
//     risk_score: 0.78,
//     credibility: "High",
//     source: "Local Hospital Syndromic Report",
//     timestamp: "2025-08-02T14:23:00Z",
//     explanation: "Increased pneumonia-like symptoms in ER visits, cluster detected near downtown."
//   },
//   {
//     id: "alert-2",
//     disease: "Influenza",
//     location: "Vancouver, Canada",
//     lat: 49.2827,
//     lng: -123.1207,
//     risk_score: 0.45,
//     credibility: "Medium",
//     source: "Public Health Surveillance",
//     timestamp: "2025-08-02T12:15:00Z",
//     explanation: "Rising flu cases in schools, multiple outbreaks reported."
//   },
//   {
//     id: "alert-3",
//     disease: "COVID-19",
//     location: "Montreal, Canada",
//     lat: 45.5017,
//     lng: -73.5673,
//     risk_score: 0.92,
//     credibility: "High",
//     source: "WHO Alert System",
//     timestamp: "2025-08-02T10:30:00Z",
//     explanation: "New variant detected, rapid community spread observed."
//   },
//   {
//     id: "alert-4",
//     disease: "Dengue Fever",
//     location: "Miami, USA",
//     lat: 25.7617,
//     lng: -80.1918,
//     risk_score: 0.65,
//     credibility: "Medium",
//     source: "CDC Vector Surveillance",
//     timestamp: "2025-08-02T09:45:00Z",
//     explanation: "Mosquito population surge, confirmed cases in residential areas."
//   },
//   {
//     id: "alert-5",
//     disease: "Measles",
//     location: "London, UK",
//     lat: 51.5074,
//     lng: -0.1278,
//     risk_score: 0.88,
//     credibility: "High",
//     source: "NHS Alert System",
//     timestamp: "2025-08-02T08:20:00Z",
//     explanation: "Outbreak in unvaccinated communities, international travel link suspected."
//   }
// ];

// export const mockForecasts = {
//   "alert-1": {
//     alert_id: "alert-1",
//     daily_cases: [50, 65, 80, 95, 110, 130, 150],
//     r0: 1.3
//   },
//   "alert-2": {
//     alert_id: "alert-2",
//     daily_cases: [30, 35, 40, 45, 50, 55, 60],
//     r0: 1.1
//   },
//   "alert-3": {
//     alert_id: "alert-3",
//     daily_cases: [100, 150, 200, 280, 350, 420, 500],
//     r0: 1.8
//   },
//   "alert-4": {
//     alert_id: "alert-4",
//     daily_cases: [20, 25, 30, 35, 40, 45, 50],
//     r0: 1.2
//   },
//   "alert-5": {
//     alert_id: "alert-5",
//     daily_cases: [80, 120, 160, 200, 240, 280, 320],
//     r0: 1.5
//   }
// };

// export const mockResources = {
//   "alert-1": {
//     alert_id: "alert-1",
//     beds_needed: 80,
//     beds_capacity: 100,
//     staff_needed: 20,
//     staff_capacity: 25,
//     vaccine_stock: 500,
//     vaccine_threshold: 1000
//   },
//   "alert-2": {
//     alert_id: "alert-2",
//     beds_needed: 45,
//     beds_capacity: 100,
//     staff_needed: 12,
//     staff_capacity: 25,
//     vaccine_stock: 800,
//     vaccine_threshold: 1000
//   },
//   "alert-3": {
//     alert_id: "alert-3",
//     beds_needed: 95,
//     beds_capacity: 100,
//     staff_needed: 28,
//     staff_capacity: 25,
//     vaccine_stock: 200,
//     vaccine_threshold: 1000
//   },
//   "alert-4": {
//     alert_id: "alert-4",
//     beds_needed: 30,
//     beds_capacity: 100,
//     staff_needed: 8,
//     staff_capacity: 25,
//     vaccine_stock: 1200,
//     vaccine_threshold: 1000
//   },
//   "alert-5": {
//     alert_id: "alert-5",
//     beds_needed: 85,
//     beds_capacity: 100,
//     staff_needed: 22,
//     staff_capacity: 25,
//     vaccine_stock: 300,
//     vaccine_threshold: 1000
//   }
// };

// // Helper function to get risk level based on score
// export const getRiskLevel = (score) => {
//   if (score >= 0.7) return 'high';
//   if (score >= 0.4) return 'medium';
//   return 'low';
// };

// // Helper function to get risk color
// export const getRiskColor = (score) => {
//   if (score >= 0.7) return 'red';
//   if (score >= 0.4) return 'yellow';
//   return 'green';
// }; 