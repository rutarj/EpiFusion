# EpiFusion AI - Pandemic Surveillance Dashboard

A responsive React frontend dashboard for the EpiFusion AI system, designed for real-time pandemic surveillance and outbreak monitoring.

## Features

### 🚨 Alert Management
- **Real-time Alert Feed**: View and filter active disease alerts by risk level
- **Interactive Map**: Visualize outbreak locations with color-coded risk markers
- **Alert Details**: Comprehensive modal view with full alert information
- **Feedback System**: Approve or flag alerts to improve AI credibility

### 📊 Analytics & Forecasting
- **7-Day Forecast**: Predictive case count trends with R₀ analysis
- **Resource Optimization**: Hospital bed, staff, and vaccine demand projections
- **Risk Assessment**: Color-coded risk levels and credibility scoring

### 🗺️ Interactive Map
- **Global Coverage**: View outbreaks worldwide with OpenStreetMap integration
- **Risk Visualization**: Custom markers with risk percentage indicators
- **Click Interactions**: Select alerts directly from map markers

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Real-time Updates**: Live data refresh and notifications

## Tech Stack

- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **React Leaflet** for interactive maps
- **Chart.js** with react-chartjs-2 for data visualization
- **Heroicons** for consistent iconography
- **Mock API** system for development and testing

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation header
│   ├── AlertFeed.jsx   # Alert sidebar with filtering
│   ├── AlertCard.jsx   # Individual alert display
│   ├── MapView.jsx     # Interactive map component
│   ├── ForecastChart.jsx # 7-day forecast visualization
│   ├── ResourcePanel.jsx # Hospital resource projections
│   ├── AlertDetailsModal.jsx # Detailed alert modal
│   └── NotificationToast.jsx # Success/error notifications
├── hooks/              # Custom React hooks
│   ├── useAlerts.js    # Alert state management
│   ├── useForecast.js  # Forecast data handling
│   └── useResources.js # Resource optimization data
├── utils/              # Utility functions
│   ├── api.js          # API wrapper and mock functions
│   └── mockData.js     # Sample data for development
├── pages/              # Page components
│   └── Dashboard.jsx   # Main dashboard layout
└── App.jsx             # Root application component
```

## API Integration

The dashboard is designed to work with the following API endpoints:

- `GET /api/alerts` - Fetch all active alerts
- `POST /api/analyze` - Analyze raw text and create structured alert
- `GET /api/forecast?alert_id=<id>` - Get forecast data for specific alert
- `GET /api/resources?alert_id=<id>` - Get resource optimization data
- `POST /api/feedback` - Submit alert feedback (approve/flag)
- `POST /api/send-alert` - Send alert to responders

Currently uses mock data for development. Switch to real API by updating `src/utils/api.js`.

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Epifusiontest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Development

### Mock Data
Sample alerts, forecasts, and resource data are available in `src/utils/mockData.js`. Modify this file to test different scenarios.

### Styling
The project uses Tailwind CSS with custom components defined in `src/index.css`. Custom utility classes are available for:
- Button styles (`.btn-primary`, `.btn-secondary`, `.btn-danger`)
- Risk badges (`.risk-badge`, `.risk-low`, `.risk-medium`, `.risk-high`)
- Card layouts (`.card`)

### Adding New Features
1. Create components in `src/components/`
2. Add custom hooks in `src/hooks/` for state management
3. Update API functions in `src/utils/api.js`
4. Add mock data in `src/utils/mockData.js` for testing

## Features in Detail

### Alert Feed
- **Filtering**: Filter alerts by risk level (All, High, Medium, Low)
- **Real-time Updates**: Credibility changes based on user feedback
- **Quick Actions**: Approve or flag alerts directly from feed
- **Responsive**: Collapses to mobile-friendly layout

### Interactive Map
- **Global View**: Centers on Toronto by default, auto-fits to alert bounds
- **Custom Markers**: Risk percentage displayed on each marker
- **Popup Details**: Quick alert preview with action buttons
- **Click Integration**: Opens detailed modal on marker click

### Forecast Analysis
- **7-Day Projection**: Line chart showing predicted case counts
- **R₀ Analysis**: Reproductive number with trend indicators
- **Risk Assessment**: Color-coded charts based on transmission risk
- **Dynamic Updates**: Changes based on selected alert

### Resource Management
- **Hospital Beds**: Usage percentage with capacity indicators
- **Medical Staff**: Staffing requirements vs. available capacity
- **Vaccine Stock**: Inventory levels with threshold warnings
- **Status Indicators**: Critical/Warning/Good status for each resource

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the repository or contact the development team. 