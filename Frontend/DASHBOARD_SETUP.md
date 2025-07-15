# Dashboard Setup Guide

This guide will help you set up the full dashboard UI using ShadCN UI components that has been added to your existing React + Vite application.

## 📁 Folder Structure

The dashboard has been created in a modular structure:

```
src/
├── dashboard/
│   ├── components/          # Shared dashboard components
│   ├── pages/              # Dashboard pages
│   │   ├── Overview.tsx    # Dashboard overview with stats
│   │   ├── Posts.tsx       # Posts management with table
│   │   ├── Analytics.tsx   # Analytics with charts
│   │   ├── Themes.tsx      # Theme customization
│   │   └── Settings.tsx    # User settings
│   └── DashboardLayout.tsx # Main dashboard layout
```

## 🚀 Installation Steps

### 1. Install Required Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install @radix-ui/react-slot @radix-ui/react-navigation-menu @radix-ui/react-tabs @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-switch @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-progress @radix-ui/react-avatar @radix-ui/react-badge @radix-ui/react-card @radix-ui/react-separator @radix-ui/react-scroll-area @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-hover-card @radix-ui/react-menubar @radix-ui/react-pagination @radix-ui/react-slider @radix-ui/react-toast class-variance-authority clsx tailwind-merge lucide-react recharts
```

### 2. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind CSS

Create or update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🎯 Dashboard Features

### Overview Page (`/dashboard`)
- **Stats Cards**: Total users, posts, page views, conversion rate
- **Recent Activity**: Timeline of recent actions
- **Quick Actions**: Create post, view analytics, customize theme
- **Today's Schedule**: Upcoming events and meetings

### Posts Page (`/dashboard/posts`)
- **Data Table**: Sortable and filterable posts table
- **Search & Filters**: Search by title/author, filter by status
- **Post Management**: View, edit, delete, and manage posts
- **Pagination**: Navigate through large datasets

### Analytics Page (`/dashboard/analytics`)
- **Metrics Dashboard**: Key performance indicators
- **Charts**: Page views chart and traffic sources
- **Top Pages**: Most visited pages with statistics
- **Real-time Stats**: Active users, sessions, load times

### Themes Page (`/dashboard/themes`)
- **Theme Selection**: Choose from predefined themes
- **Color Customization**: Custom color picker for all elements
- **Live Preview**: See theme changes in real-time
- **Import/Export**: Save and share custom themes

### Settings Page (`/dashboard/settings`)
- **Profile Management**: Update personal information
- **Account Settings**: Email, username, timezone, language
- **Security**: Password change, 2FA, security settings
- **Notifications**: Email, push, marketing preferences
- **Privacy**: Profile visibility, data collection settings

## 🎨 Design Features

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive tables and grids
- Touch-friendly interactions

### Dark Mode Support
- Automatic dark mode detection
- Manual theme switching
- Consistent color schemes
- Smooth transitions

### Modern UI Components
- **Cards**: Clean, elevated design
- **Tables**: Sortable, filterable data tables
- **Buttons**: Primary, secondary, and icon buttons
- **Forms**: Input fields, selects, toggles
- **Charts**: Data visualization components
- **Navigation**: Sidebar with active states

## 🛣️ Routing Setup

The dashboard uses React Router v6 with nested routes:

```tsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="posts" element={<Posts />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="themes" element={<Themes />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

### Navigation URLs:
- `/dashboard` - Overview page
- `/dashboard/posts` - Posts management
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/themes` - Theme customization
- `/dashboard/settings` - User settings

## 🎯 Key Components

### DashboardLayout
- Responsive sidebar navigation
- Mobile menu with overlay
- User profile section
- Active route highlighting

### Overview Page
- StatCard component for metrics
- RecentActivity component for timeline
- Quick action buttons
- Schedule display

### Posts Page
- Searchable and filterable table
- Status badges (published, draft, archived)
- Action buttons (view, edit, delete)
- Pagination controls

### Analytics Page
- MetricCard component for KPIs
- Chart components for data visualization
- Traffic sources breakdown
- Real-time statistics

### Themes Page
- Theme selection cards
- ColorPicker component
- Live preview panel
- Import/export functionality

### Settings Page
- Tabbed interface
- Form components
- Toggle switches
- Security settings

## 🎨 Styling

The dashboard uses Tailwind CSS with custom components:

```css
/* Custom button styles */
.btn-primary {
  @apply inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors;
}

/* Card styles */
.card {
  @apply bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6;
}

/* Input styles */
.input {
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}
```

## 🚀 Getting Started

1. **Install dependencies** (see installation steps above)
2. **Start the development server**:
   ```bash
   npm run dev
   ```
3. **Navigate to the dashboard**:
   - Go to `http://localhost:5173/dashboard`
   - Explore all the pages and features

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/dashboard/pages/`
2. Add the route to `src/App.tsx`
3. Add navigation item to `DashboardLayout.tsx`

### Modifying Themes
1. Update the `themes` array in `Themes.tsx`
2. Customize colors in the `ColorPicker` component
3. Add new theme options as needed

### Styling Changes
1. Modify Tailwind classes in components
2. Update custom CSS in `src/index.css`
3. Add new component styles as needed

## 📱 Mobile Support

The dashboard is fully responsive with:
- Collapsible sidebar on mobile
- Touch-friendly buttons and controls
- Responsive tables with horizontal scroll
- Mobile-optimized forms and inputs

## 🌙 Dark Mode

Dark mode is supported throughout with:
- Automatic system preference detection
- Manual toggle option
- Consistent color schemes
- Smooth transitions between modes

## 🎯 Next Steps

1. **Connect to Backend**: Replace mock data with real API calls
2. **Add Authentication**: Implement user authentication and authorization
3. **Add Real Charts**: Integrate with charting libraries like Recharts
4. **Add Notifications**: Implement real-time notifications
5. **Add Search**: Implement global search functionality
6. **Add Export**: Add data export functionality
7. **Add Import**: Add data import functionality

## 🐛 Troubleshooting

### Common Issues:

1. **Tailwind classes not working**: Make sure Tailwind CSS is properly installed and configured
2. **Icons not showing**: Install lucide-react and import icons correctly
3. **Dark mode not working**: Check that dark mode is enabled in Tailwind config
4. **Routing issues**: Ensure React Router is properly configured

### Dependencies Checklist:
- [ ] React Router DOM
- [ ] Lucide React (for icons)
- [ ] Tailwind CSS
- [ ] Radix UI components (if using ShadCN)
- [ ] Recharts (for charts)

The dashboard is now ready to use! Navigate to `/dashboard` to see the full interface. 