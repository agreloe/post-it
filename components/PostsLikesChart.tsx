'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Suspense } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { Post } from '@/types';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useTheme } from 'next-themes';
import LoadingSpinner from '@/components/LoadingSpinner';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PostsApiResponse {
  posts: Post[];
}

const getCSSVariable = (variable: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(variable);

const PostsLikesChartContent = () => {
  const { data: postsData, error: postsError, isLoading: postsLoading } = useFetch<PostsApiResponse>('/posts?limit=251');
  const isMobile = useMediaQuery(768);
  const { theme } = useTheme();

  if (postsLoading) return <LoadingSpinner />;
  if (postsError) return <p>Error loading posts: {postsError.message}</p>;

  const topPosts = postsData?.posts
    .sort((a, b) => b.reactions.likes - a.reactions.likes)
    .slice(0, isMobile ? 5 : 10);

  const chartData = {
    labels: topPosts?.map(post => post.title),
    datasets: [
      {
        label: 'Number of Likes',
        data: topPosts?.map(post => post.reactions.likes),
        backgroundColor: [
            'rgba(255, 99, 132, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 206, 86, 0.3)',
            'rgba(75, 192, 192, 0.3)',
            'rgba(153, 102, 255, 0.3)',
            'rgba(255, 159, 64, 0.3)',
            'rgba(199, 199, 199, 0.3)',
            'rgba(83, 102, 255, 0.3)',
            'rgba(233, 159, 64, 0.3)',
            'rgba(155, 102, 199, 0.3)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)',
            'rgba(233, 159, 64, 1)',
            'rgba(155, 102, 199, 1)'
          ],
        borderWidth: 1,
      },
    ],
  };

  const textColor = getCSSVariable('--color-text-light').trim() || '#2d3748';
  const darkTextColor = getCSSVariable('--color-text-dark').trim() || '#f7fafc';

  const appliedTextColor = theme === 'dark' ? darkTextColor : textColor;

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start',
        labels: {
          boxWidth: isMobile ? 10 : 20,
          padding: 10,
          color: appliedTextColor,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i, false);

                return {
                  text: `${label}`,
                  fillStyle: style.backgroundColor,
                  hidden: !chart.getDataVisibility(i),
                  index: i,
                  fontColor: appliedTextColor,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const lines = label.split(' ').reduce<string[]>((acc, word) => {
              const lastLine = acc[acc.length - 1];
              if (lastLine && (lastLine + ' ' + word).length <= 30) {
                acc[acc.length - 1] = lastLine + ' ' + word;
              } else {
                acc.push(word);
              }
              return acc;
            }, []);

            return [...lines, `Likes: ${value}`];
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

const PostsLikesChart = () => (
  <div className='text-primary-light dark:text-primary-dark'>
    <h2 className='text-xl lg:text-2xl pb-8'>Top 10 Posts by Likes</h2>
    <Suspense fallback={<LoadingSpinner />}>
      <PostsLikesChartContent />
    </Suspense>
  </div>
);

export default PostsLikesChart;
