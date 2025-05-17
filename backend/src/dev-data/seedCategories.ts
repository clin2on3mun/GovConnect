import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/category';

dotenv.config();

const categories = [
  {
    name: 'Health',
    description:
      'Issues related to hospitals, clinics, and public health services.',
  },
  {
    name: 'Education',
    description:
      'Concerns about schools, universities, and educational programs.',
  },
  {
    name: 'Water & Sanitation',
    description: 'Water supply, sewage, and sanitation-related problems.',
  },
  {
    name: 'Infrastructure',
    description: 'Roads, bridges, buildings, and public construction projects.',
  },
  {
    name: 'Electricity',
    description:
      'Power outages, billing, and electrical infrastructure issues.',
  },
  {
    name: 'Transport',
    description: 'Public transport, traffic issues, and vehicle licensing.',
  },
  {
    name: 'Environment',
    description: 'Waste management, pollution, and green space concerns.',
  },
  {
    name: 'Security',
    description: 'Public safety, policing, and emergency response.',
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('✅ Categories seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding categories:', err);
    process.exit(1);
  }
};

seedCategories();
