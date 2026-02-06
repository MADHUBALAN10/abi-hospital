# Quick Server Restart Guide

## The 500 errors are still happening because:

### **Option 1: Server hasn't restarted yet**
Nodemon should auto-restart, but sometimes it doesn't detect all file changes.

### **Manual Restart Steps:**

1. **Find the server terminal** (the one running in `c:\Users\madhu\OneDrive\Desktop\PROJ\server`)

2. **Stop the server:**
   - Press `Ctrl + C`

3. **Start it again:**
   ```bash
   npm run dev
   ```

4. **Look for these messages:**
   ```
   ✅ MongoDB Connected Successfully
   📊 Database: hospital
   🚀 Server Status: RUNNING
   📡 Port: 5000
   ```

### **Option 2: Check for the actual error**

When you restart, try to book an appointment and watch the server terminal. You should see:

```
Fetching appointments with query: { patientId: '123' }
```

If you see an error instead, that tells us what's really wrong.

## Common Causes of Persistent 500 Errors:

### 1. **MongoDB Connection Issue**
   - Check if MongoDB Atlas is accessible
   - Verify MONGO_URI in .env file

### 2. **Missing Collections**
   - Database might not have `users` or `doctors` collections yet
   - Try adding a doctor first through the admin panel

### 3. **ObjectId Format Issue**
   - The userId '123' from localStorage might not be a valid MongoDB ObjectId
   - Need to use actual database IDs

## Quick Test:

After restarting, open browser console and run:
```javascript
localStorage.getItem('user')
```

If you see `"_id": "123"`, that's the problem! MongoDB needs real ObjectIds like `"507f1f77bcf86cd799439011"`.

## Fix for Testing:

Let me know if the server restarts successfully and I'll help create proper test data.

---

**Action Required**: Please restart the server manually and share what you see in the server terminal.
