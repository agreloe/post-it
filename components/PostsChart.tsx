'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Suspense } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { User, Post } from '@/types';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useTheme } from 'next-themes';
import LoadingSpinner from '@/components/LoadingSpinner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface UsersApiResponse {
  users: User[];
}

interface PostsApiResponse {
  posts: Post[];
}

const getCSSVariable = (variable: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(variable);

const PostsChartContent = () => {
  const isMobile = useMediaQuery(768);
  const { theme } = useTheme();

  const { data: usersData, error: usersError, isLoading: usersLoading } = useFetch<UsersApiResponse>('/users?limit=0');
  const { data: postsData, error: postsError, isLoading: postsLoading } = useFetch<PostsApiResponse>('/posts?limit=0');

  if (usersLoading || postsLoading) return <LoadingSpinner />;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;
  if (postsError) return <p>Error loading posts: {postsError.message}</p>;

  const postsPerUser: { [key: number]: number } = {};
  postsData?.posts.forEach((post) => {
    const userId = post.userId;
    postsPerUser[userId] = (postsPerUser[userId] || 0) + 1;
  });

  const sortedUserIds = Object.keys(postsPerUser)
    .sort((a, b) => postsPerUser[Number(b)] - postsPerUser[Number(a)])
    .slice(0, isMobile ? 5 : 10);

  const userIdToName: { [key: number]: string } = {};
  usersData?.users.forEach((user) => {
    userIdToName[user.id] = `${user.firstName} ${user.lastName}`;
  });

  const chartLabels = sortedUserIds.map((userId) => {
    const userName = userIdToName[Number(userId)];
    return userName ? userName : `User ${userId}`;
  });

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Number of Posts',
        data: sortedUserIds.map((userId) => postsPerUser[Number(userId)]),
        backgroundColor: theme === 'dark' ? 'rgba(25, 118, 210, 0.4)' : 'rgba(144, 202, 249, 0.4)',
        borderColor: theme === 'dark' ? 'rgba(25, 118, 210, 1)' : 'rgba(144, 202, 249, 1)',
        borderWidth: 1,
      },
    ],
  };

  const textColor = getCSSVariable('--color-text-light').trim() || '#2d3748';
  const darkTextColor = getCSSVariable('--color-text-dark').trim() || '#f7fafc';

  const appliedTextColor = theme === 'dark' ? darkTextColor : textColor;

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start',
        labels: {
          color: appliedTextColor,
        },
      },
      title: {
        display: true,
        text: 'Top Posters of the Week',
        color: appliedTextColor,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: appliedTextColor,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: appliedTextColor,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

const PostsChart = () => (
  <div className='text-primary-light dark:text-primary-dark'>
    <h2 className='text-xl lg:text-2xl pb-8'>Top Posters of the week</h2>
    <Suspense fallback={<LoadingSpinner />}>
      <PostsChartContent />
    </Suspense>
  </div>
);

export default PostsChart;
