# Savings Product Management

A comprehensive interface for managing savings products, interest rates, and regulations.

## Overview

The Savings Product Management page provides a complete solution for financial institutions to manage their savings products. It consists of three main tabs:

1. **Quy định lãi suất (Interest Rate Regulations)**: Create and manage interest rate regulations for different savings products.
2. **Lịch sử quy định (Regulation History)**: View the history of all regulations created, with filtering and sorting capabilities.
3. **Lịch trình áp dụng (Application Schedule)**: Visualize when different regulations come into effect using a calendar view.

## Features

### Interest Rate Regulations Tab

- Toggle between two interest rate tables
- Modify interest rates for different savings products, terms, and payment frequencies
- Set application dates using a date picker
- Compare changes with previous regulations
- Receive notifications for updates

### Regulation History Tab

- List view of all created regulations
- Filter by date range, creator, and savings type
- Sort by different criteria
- View detailed information for each regulation

### Application Schedule Tab

- Calendar view showing when regulations take effect
- Color-coded days based on applicable regulations
- Filter regulations by date range, creator, and savings type
- Detailed drawer view for regulation information

## Component Structure

```
src/components/
├── SavingsProductManagement.jsx       # Main container component
├── savings/
│   ├── interest-rates/                # Interest Rate Regulations tab
│   │   ├── InterestRateRegulations.jsx
│   │   ├── GeneralSettings.jsx
│   │   ├── ApplicationDateSelector.jsx
│   │   ├── RegulationComparisonModal.jsx
│   │   └── RegulationNotification.jsx
│   ├── regulation-history/            # Regulation History tab
│   │   ├── RegulationHistory.jsx
│   │   ├── RegulationCard.jsx
│   │   ├── RegulationFilters.jsx
│   │   └── RegulationListItem.jsx
│   └── application-schedule/          # Application Schedule tab
│       ├── ApplicationSchedule.jsx
│       ├── CalendarView.jsx
│       ├── CalendarDay.jsx
│       ├── MonthNavigation.jsx
│       └── RegulationDetailDrawer.jsx
```

## Usage

The Savings Product Management page is designed to be intuitive and user-friendly. Users can:

1. Create new interest rate regulations
2. View and filter historical regulations
3. Visualize when regulations take effect on a calendar

## Technologies Used

- React
- Framer Motion for animations
- TailwindCSS for styling
- Lucide React for icons
