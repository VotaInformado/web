import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
// Soft UI Dashboard React base styles
import typography from 'assets/theme/base/typography';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Set global config
ChartJS.defaults.font.family = typography.fontFamily;
ChartJS.defaults.font.size = 14;