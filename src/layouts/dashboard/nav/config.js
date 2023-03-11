// component
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Department',
    path: '/dashboard/department',
    icon: icon('ic_user'),
  },

];

const navConfigAccountant = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  { 
    title: 'Bills',
    path: '/dashboard/bill',
    icon: icon('ic_user'),
  },

  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export {navConfig,navConfigAccountant};
