import axios from 'axios';
import { QuizQuestion, QuizSettings } from '../types';

const API_BASE_URL = 'https://opentdb.com/api.php';

// Generate API URL based on quiz settings
export const generateApiUrl = (settings: QuizSettings): string => {
  const { amount, category, difficulty, type } = settings;
  
  let url = `${API_BASE_URL}?amount=${amount}`;
  
  if (category !== 'any') {
    url += `&category=${category}`;
  }
  
  if (difficulty !== 'any') {
    url += `&difficulty=${difficulty}`;
  }
  
  if (type !== 'any') {
    url += `&type=${type}`;
  }
  
  return url;
};

// Fetch quiz questions from the API
export const fetchQuizQuestions = async (settings: QuizSettings): Promise<QuizQuestion[]> => {
  try {
    const url = generateApiUrl(settings);
    const response = await axios.get(url);
    
    if (response.data.response_code === 0) {
      return response.data.results;
    } else if (response.data.response_code === 1) {
      throw new Error('Not enough questions available for these settings. Please try different options.');
    } else if (response.data.response_code === 2) {
      throw new Error('Invalid parameter in API request. Please try again.');
    } else {
      throw new Error('Failed to fetch questions. Please try different settings.');
    }
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (axios.isAxiosError(error) && error.request) {
      throw new Error('Network error. Please check your internet connection and try again.');
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};

// Get quiz categories from the API
export const fetchQuizCategories = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api_category.php');
    return response.data.trivia_categories;
  } catch (error) {
    console.error('Error fetching quiz categories:', error);
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    throw new Error('Failed to load categories. Please refresh the page and try again.');
  }
};