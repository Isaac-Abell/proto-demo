import type { APIError } from '../../types';

export const processVideoAPI = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('video', file);
  const url = ''
  try {
    // Replace with your actual API endpoint
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok || url === '') {
      const error: APIError = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    return await response.text();
  } catch (err) {
    // For demo purposes, return mock data
    console.warn('API call failed, returning mock data:', err);
    return generateMockReport(file);
  }
};

const generateMockReport = (file: File): any => {
  return {
    title: "Live Event Booth Engagement Report",
    date: new Date().toISOString(),
    file: file.name,
    demographics: {
      gender: {
        male: 60,
        female: 40,
      },
      age: {
        '18-24': 30,
        '25-34': 50,
        '35-44': 20,
      },
      race: {
        asian: 30,
        black: 20,
        white: 40,
        other: 10,
      },
    },
    insights: {
      engagement: [
        60, 62, 65, 68, 70, 72, 75, 77, 80, 78,
        76, 74, 73, 72, 75, 77, 79, 82, 84, 83,
        81, 79, 78, 76, 77, 79, 81, 83, 85, 87,
        86, 84, 82, 80, 78, 76, 74, 72, 70, 68
      ],
      male_engagement: [
        62, 63, 66, 69, 71, 73, 76, 78, 81, 79,
        77, 75, 74, 73, 76, 78, 80, 83, 85, 84,
        82, 80, 79, 77, 78, 80, 82, 84, 86, 88,
        87, 85, 83, 81, 79, 77, 75, 73, 71, 69
      ],
      female_engagement: [
        58, 61, 64, 67, 69, 71, 74, 76, 79, 77,
        75, 73, 72, 71, 74, 76, 78, 81, 83, 82,
        80, 78, 77, 75, 76, 78, 80, 82, 84, 86,
        85, 83, 81, 79, 77, 75, 73, 71, 69, 67
      ],
      age_engagement: {
        '18-24': [
          59, 61, 64, 66, 68, 70, 73, 75, 78, 76,
          74, 72, 71, 70, 73, 75, 77, 80, 82, 81,
          79, 77, 76, 74, 75, 77, 79, 81, 83, 85,
          84, 82, 80, 78, 76, 74, 72, 70, 68, 66
        ],
        '25-34': [
          62, 64, 67, 70, 72, 74, 77, 79, 82, 80,
          78, 76, 75, 74, 77, 79, 81, 84, 86, 85,
          83, 81, 80, 78, 79, 81, 83, 85, 87, 89,
          88, 86, 84, 82, 80, 78, 76, 74, 72, 70
        ],
        '35-44': [
          55, 57, 60, 63, 65, 67, 70, 72, 75, 73,
          71, 69, 68, 67, 70, 72, 74, 77, 79, 78,
          76, 74, 73, 71, 72, 74, 76, 78, 80, 82,
          81, 79, 77, 75, 73, 71, 69, 67, 65, 63
        ]
      },
      race_engagement: {
        asian: [
          61, 63, 66, 69, 71, 73, 76, 78, 81, 79,
          77, 75, 74, 73, 76, 78, 80, 83, 85, 84,
          82, 80, 79, 77, 78, 80, 82, 84, 86, 88,
          87, 85, 83, 81, 79, 77, 75, 73, 71, 69
        ],
        black: [
          58, 60, 63, 66, 68, 70, 73, 75, 78, 76,
          74, 72, 71, 70, 73, 75, 77, 80, 82, 81,
          79, 77, 76, 74, 75, 77, 79, 81, 83, 85,
          84, 82, 80, 78, 76, 74, 72, 70, 68, 66
        ],
        white: [
          63, 65, 68, 71, 73, 75, 78, 80, 83, 81,
          79, 77, 76, 75, 78, 80, 82, 85, 87, 86,
          84, 82, 81, 79, 80, 82, 84, 86, 88, 90,
          89, 87, 85, 83, 81, 79, 77, 75, 73, 71
        ],
        other: [
          57, 59, 62, 65, 67, 69, 72, 74, 77, 75,
          73, 71, 70, 69, 72, 74, 76, 79, 81, 80,
          78, 76, 75, 73, 74, 76, 78, 80, 82, 84,
          83, 81, 79, 77, 75, 73, 71, 69, 67, 65
        ]
      }
    },
    top_engagement: [78, 80, 85, 88, 90, 92, 95],
    low_engagement_moments: [10, 22, 33, 37],
    trends_over_time: [
      "Engagement rises steadily in the first 10 minutes.",
      "Slight dip after technical demonstration.",
      "Recovery during interactive session.",
      "Final spike near product giveaway."
    ],
    recommendations: [
      "Increase interactivity in demos to boost engagement.",
      "Simplify technical explanations to prevent confusion.",
      "Optimize booth layout for better visitor flow.",
    ],
  };
};