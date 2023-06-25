import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js';
// Soft UI Dashboard React base styles
import typography from 'assets/theme/base/typography';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

// Set global config
ChartJS.defaults.font.family = typography.fontFamily;
ChartJS.defaults.font.size = 14;
