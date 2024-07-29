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
import { Suspense, useMemo } from 'react';
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

const getCSSVariable = (variable: string) => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(variable);
  }
  return '';
};

const PostsChartContent = () => {
  const isMobile = useMediaQuery(768);
  const { theme } = useTheme();

  const { data: usersData, error: usersError, isLoading: usersLoading } = useFetch<UsersApiResponse>('/users?limit=0');
  const { data: postsData, error: postsError, isLoading: postsLoading } = useFetch<PostsApiResponse>('/posts?limit=0');

  const postsPerUser = useMemo(() => {
    if (!postsData) return {};
    return postsData.posts.reduce((acc, post) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });
  }, [postsData]);

  const sortedUserIds = useMemo(() => {
    return Object.keys(postsPerUser)
      .sort((a, b) => postsPerUser[Number(b)] - postsPerUser[Number(a)])
      .slice(0, isMobile ? 5 : 10);
  }, [postsPerUser, isMobile]);

  const userIdToName = useMemo(() => {
    if (!usersData) return {};
    return usersData.users.reduce((acc, user) => {
      acc[user.id] = `${user.firstName} ${user.lastName}`;
      return acc;
    }, {} as { [key: number]: string });
  }, [usersData]);

  const chartLabels = useMemo(() => {
    return sortedUserIds.map(userId => userIdToName[Number(userId)] || `User ${userId}`);
  }, [sortedUserIds, userIdToName]);

  const chartData = useMemo(() => ({
    labels: chartLabels,
    datasets: [
      {
        label: 'Number of Posts',
        data: sortedUserIds.map(userId => postsPerUser[Number(userId)]),
        backgroundColor: theme === 'dark' ? 'rgba(25, 118, 210, 0.4)' : 'rgba(144, 202, 249, 0.4)',
        borderColor: theme === 'dark' ? 'rgba(25, 118, 210, 1)' : 'rgba(144, 202, 249, 1)',
        borderWidth: 1,
      },
    ],
  }), [chartLabels, sortedUserIds, postsPerUser, theme]);

  const textColor = useMemo(() => getCSSVariable('--color-text-light').trim() || '#2d3748', []);
  const darkTextColor = useMemo(() => getCSSVariable('--color-text-dark').trim() || '#f7fafc', []);

  const appliedTextColor = theme === 'dark' ? darkTextColor : textColor;

  const chartOptions: ChartOptions<'bar'> = useMemo(() => ({
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
  }), [appliedTextColor]);

  if (usersLoading || postsLoading) return <LoadingSpinner />;
  if (usersError || postsError) return <p>Something went wrong. Please try again later.</p>;

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
