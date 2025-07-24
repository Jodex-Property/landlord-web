"use client"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { SquareArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Bar, BarChart, XAxis, YAxis, } from 'recharts'

const ShortletStatsSection = () => {

  const chartData = [
    { month: 'Jan', lastMonth: 900000, runningMonth: 1200000 },
    { month: 'Feb', lastMonth: 1000000, runningMonth: 1500000 },
    { month: 'Mar', lastMonth: 1200000, runningMonth: 1800000 },
    { month: 'Apr', lastMonth: 1500000, runningMonth: 2000000 },
    { month: 'May', lastMonth: 1800000, runningMonth: 2200000 },
    { month: 'Jun', lastMonth: 2000000, runningMonth: 2500000 },
  ]

  const chartConfig = {
    lastMonth: {
      label: 'Last Month',
      color: '#211060',
    },
    runningMonth: {
      label: 'Running Month',
      color: '#481FDE',
    },
  } satisfies ChartConfig

  return (
    <div className='flex gap-4 p-10'>
      
      {/* Left Card */}
      <div className='flex-1 bg-white min-h-[400px] rounded-2xl shadow-lg p-6 flex flex-col justify-between'>
        
        {/* Header Text */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className='text-gray-900 text-xl font-bold'>Total Revenue</h2>
            <p className='text-3xl font-extrabold text-gray-900 mt-2'>₦924,000,000</p>
            {/* <div className="flex items-center gap-2 mt-1">
              <span className='text-green-500 text-sm font-medium'>↑ 55%</span>
              <span className='text-gray-500 text-sm'>than last month</span>
            </div> */}
          </div>
          {/* Dots/Menu */}
          <div className="text-gray-400 cursor-pointer text-2xl">
            ⋯
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 flex items-center justify-center mt-4">
          <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
            <BarChart data={chartData} barCategoryGap="20%">
              <XAxis 
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={[0, 3000000]} // Max Y to 3M
                tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {/* Animated Bars */}
              <Bar 
                dataKey="lastMonth" 
                fill={chartConfig.lastMonth.color} 
                radius={[8, 8, 0, 0]} 
                animationDuration={1200} 
              />
              <Bar 
                dataKey="runningMonth" 
                fill={chartConfig.runningMonth.color} 
                radius={[8, 8, 0, 0]} 
                animationDuration={1200}
              />
            </BarChart>
          </ChartContainer>
        </div>

      </div>

      {/* Right Card */}
      <div className='w-[350px] bg-white min-h-32 rounded-2xl shadow-lg flex flex-col items-center justify-center'>
          <div className='flex items-center justify-between w-full p-4'>
              <p className='text-sm'>Active Listing Panels</p>
              <SquareArrowRight className='w-4 h-4' />
          </div>

        <div className='w-[calc(100%-16px)] h-max rounded m-2 mx-0 flex items-center gap-4 p-2'>
          <Image src='/assets/img/jodex-building-sample.jpg' alt='jodex image sample' width={70} height={70} className='rounded-md' />
          <div className='flex w-full flex-col gap-0.5'>
            <div className='flex items-center justify-between'>
              <p className='font-bold text-sm'>Jabi Amen Estate</p>
              <span className='inline-flex items-center font-black'>+₦956k</span>
            </div>
            <span className='text-xs text-gray-400'>Occupied</span>
          </div>
        </div>

        <div className='w-[calc(100%-16px)] h-max rounded m-2 mx-0 flex items-center gap-4 p-2'>
          <Image src='/assets/img/jodex-building-sample.jpg' alt='jodex image sample' width={70} height={70} className='rounded-md' />
          <div className='flex w-full flex-col gap-0.5'>
            <div className='flex items-center justify-between'>
              <p className='font-bold text-sm'>Jabi Amen Estate</p>
              <span className='inline-flex items-center font-black'>+₦956k</span>
            </div>
            <span className='text-xs text-gray-400'>Occupied</span>
          </div>
        </div>

        <div className='w-[calc(100%-16px)] h-max rounded m-2 mx-0 flex items-center gap-4 p-2'>
          <Image src='/assets/img/jodex-building-sample.jpg' alt='jodex image sample' width={70} height={70} className='rounded-md' />
          <div className='flex w-full flex-col gap-0.5'>
            <div className='flex items-center justify-between'>
              <p className='font-bold text-sm'>Jabi Amen Estate</p>
              <span className='inline-flex items-center font-black'>+₦956k</span>
            </div>
            <span className='text-xs text-gray-400'>Occupied</span>
          </div>
        </div>

        <div className='w-[calc(100%-16px)] h-max rounded m-2 mx-0 flex items-center gap-4 p-2'>
          <Image src='/assets/img/jodex-building-sample.jpg' alt='jodex image sample' width={70} height={70} className='rounded-md' />
          <div className='flex w-full flex-col gap-0.5'>
            <div className='flex items-center justify-between'>
              <p className='font-bold text-sm'>Jabi Amen Estate</p>
              <span className='inline-flex items-center font-black'>+₦956k</span>
            </div>
            <span className='text-xs text-gray-400'>Occupied</span>
          </div>
        </div>

        <div className='w-[calc(100%-16px)] h-max rounded m-2 mx-0 flex items-center gap-4 p-2'>
          <Image src='/assets/img/jodex-building-sample.jpg' alt='jodex image sample' width={70} height={70} className='rounded-md' />
          <div className='flex w-full flex-col gap-0.5'>
            <div className='flex items-center justify-between'>
              <p className='font-bold text-sm'>Jabi Amen Estate</p>
              <span className='inline-flex items-center font-black'>+₦956k</span>
            </div>
            <span className='text-xs text-gray-400'>Occupied</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ShortletStatsSection;