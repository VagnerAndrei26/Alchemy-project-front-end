import { createJob, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'job',
    imgUrl: createJob,
    link: '/create-job',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/payment',
  },
  {
    name: 'pay',
    imgUrl: withdraw,
    link: '/pay',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];