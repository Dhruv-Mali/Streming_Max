import mongoose from 'mongoose';
import User from './src/models/user.schema.js';
import config from './src/config/index.js';

async function createAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@stremify.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const adminName = process.env.ADMIN_NAME || 'Admin';
    
    // Check if admin exists
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (existingUser) {
      // Update existing user to admin
      existingUser.role = 'ADMIN';
      existingUser.verified = true;
      await existingUser.save();
      console.log('✅ Existing user updated to ADMIN role');
    } else {
      // Create new admin user
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'ADMIN',
        verified: true,
      });
      console.log('✅ New admin user created successfully');
    }
    
    console.log(`
╔════════════════════════════════════════╗
║       ADMIN USER CREDENTIALS           ║
╠════════════════════════════════════════╣
║ 📧 Email:    ${adminEmail.padEnd(23)}║
║ 🔑 Password: ${adminPassword.padEnd(23)}║
║ 👤 Name:     ${adminName.padEnd(23)}║
║ 🔗 URL:      http://localhost:3000/admin ║
╚════════════════════════════════════════╝

⚠️  IMPORTANT: Change the password after first login!
    `);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
