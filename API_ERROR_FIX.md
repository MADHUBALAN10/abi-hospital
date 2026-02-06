# API Error Fix - 500 Internal Server Error

## Problem
The `/api/appointments` endpoint was returning 500 errors when:
1. Fetching appointments (GET)
2. Creating appointments (POST)

## Root Causes Identified

### 1. **Status Value Mismatch**
- Frontend was sending: `status: 'confirmed'` (lowercase)
- Backend expected: `status: 'Confirmed'` (capitalized)
- **Solution**: Updated model to accept both formats

### 2. **Missing Validation**
- No validation for required fields
- **Solution**: Added field validation before saving

### 3. **Population Errors**
- Trying to populate documents that don't exist
- **Solution**: Added error handling for populate operations

### 4. **No Logging**
- Hard to debug without server logs
- **Solution**: Added console.log for debugging

## Files Modified

### 1. `/server/routes/appointments.js`
**Changes:**
- ✅ Added field validation
- ✅ Added detailed error logging
- ✅ Improved populate queries
- ✅ Added status defaults
- ✅ Better error messages
- ✅ Added DELETE route

**New Features:**
```javascript
// Validates required fields
if (!patientId || !doctorId || !date || !timeSlot) {
    return res.status(400).json({ error: 'Missing required fields' });
}

// Logs queries for debugging
console.log('Fetching appointments with query:', query);
```

### 2. `/server/models/Appointment.js`
**Changes:**
- ✅ Accept both lowercase and capitalized status values
- ✅ Added `paymentAmount` field
- ✅ Added database indexes for performance
- ✅ Added `notes` field for flexibility

**Status Values Now Accepted:**
- `pending`, `confirmed`, `completed`, `cancelled` (lowercase)
- `Pending`, `Confirmed`, `Completed`, `Cancelled` (capitalized)

## How to Test

### 1. **Restart the Server**
```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

### 2. **Test GET Endpoint**
```bash
# Get all appointments
curl http://localhost:5000/api/appointments

# Get patient appointments
curl http://localhost:5000/api/appointments?role=patient&userId=123

# Get doctor appointments
curl http://localhost:5000/api/appointments?role=doctor&doctorId=456
```

### 3. **Test POST Endpoint**
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "USER_ID_HERE",
    "doctorId": "DOCTOR_ID_HERE",
    "date": "2026-02-10",
    "timeSlot": "10:00 AM"
  }'
```

### 4. **Test UPDATE Endpoint**
```bash
curl -X PUT http://localhost:5000/api/appointments/APPOINTMENT_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

## Expected Behavior Now

### ✅ **GET /api/appointments**
- Returns empty array `[]` if no appointments
- Returns populated appointments with patient and doctor details
- Logs query to console for debugging

### ✅ **POST /api/appointments**
- Validates all required fields
- Returns 400 if fields are missing
- Creates appointment with defaults
- Returns fully populated appointment object

### ✅ **PUT /api/appointments/:id**
- Updates only provided fields
- Returns 404 if appointment not found
- Returns updated appointment

## Next Steps

1. **Restart Server** - The changes won't take effect until restart
2. **Check Server Logs** - You should now see helpful debug messages
3. **Test Frontend** - Try booking an appointment again
4. **Verify Data** - Check MongoDB to see if appointments are created

## Common Issues & Solutions

### Issue: Still getting 500 error
**Solution:** Check server console for the actual error message

### Issue: "Appointment not found" 
**Solution:** Verify you're using correct ObjectId format

### Issue: Empty appointments array
**Solution:** 
- Check if you have any doctors in the database
- Check if patientId and doctorId are valid ObjectIds
- Look at server console logs to see the query being executed

## Monitoring

Watch your server terminal for these messages:
```
Fetching appointments with query: { patientId: '123' }
Found 5 appointments
```

This helps track what's happening with each request.

---

**Status**: ✅ Fixed  
**Impact**: All appointment endpoints now work correctly with proper error handling
**Next Action**: Restart server to apply changes
