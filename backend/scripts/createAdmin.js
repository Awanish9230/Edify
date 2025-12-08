import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'awanish@gmail.com' });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists');
            console.log('Email:', existingAdmin.email);
            console.log('Role:', existingAdmin.role);

            // Update to admin if not already
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin';
                await existingAdmin.save();
                console.log('✅ Updated existing user to admin role');
            }
        } else {
            // Create new admin user
            const admin = await User.create({
                name: 'Awanish',
                email: 'awanish@gmail.com',
                password: 'awanish@123',
                role: 'admin'
            });

            console.log('✅ Admin user created successfully');
            console.log('Email:', admin.email);
            console.log('Password: awanish@123');
            console.log('Role:', admin.role);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
