const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: '35.196.58.227',
  user: 'daniel',
  database: 'User', 
  password: '1q2w3e4r!Q@W#E$R!',
});


const filtering = async (req, res) => {
  const { UID, filters = {} } = req.body;

  try {
    const userQuery = 'SELECT height, weight, purpose AS workout_purpose, workout_schedule, gender, workout_style, personal_records, partner_preferences, `first_name`, `last_name`, `school_year` FROM userInfo WHERE UID = ?';
    const userResult = await pool.query(userQuery, [UID]);

    if (userResult[0].length === 0) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    const user = userResult[0][0];
    let userPersonalRecords;

    // Check if personal_records is a string and parse it; otherwise, use it directly
    if (typeof user.personal_records === 'string') {
        try {
            userPersonalRecords = JSON.parse(user.personal_records);
        } catch (parseError) {
            console.error(`Error parsing personal_records for user ${UID}:`, user.personal_records);
            return res.status(500).json({ error: 'Failed to parse personal records' });
        }
    } else {
        userPersonalRecords = user.personal_records; // Use it directly as it's already an object
    }

    const userTotal1RM = parseInt(userPersonalRecords.squat) + parseInt(userPersonalRecords.benchpress) + parseInt(userPersonalRecords.deadlift);
    console.log(userTotal1RM)
    const userWorkoutSchedule = user.workout_schedule.split(',');

    let query = 'SELECT UID, personal_records, gender, workout_schedule, purpose AS workout_purpose FROM userInfo WHERE UID != ?';
    let queryParams = [UID];

    if (filters.similar_body_profile) {
      query += ` AND ABS((JSON_EXTRACT(personal_records, '$.squat') + JSON_EXTRACT(personal_records, '$.benchpress') + JSON_EXTRACT(personal_records, '$.deadlift')) - ?) <= 50`;
      queryParams.push(userTotal1RM);
    }

    if (filters.gender && filters.gender.toLowerCase() !== "none") {
      queryParams.push(filters.gender);
      query += ` AND gender = ?`;
    }

    if (filters.similar_workout_purpose) {
      queryParams.push(user.workout_purpose);
      query += ` AND purpose = ?`;
    }

    if (filters.similar_workout_time && userWorkoutSchedule.length > 0) {
      const daysSql = userWorkoutSchedule.map(day => `FIND_IN_SET('${day}', workout_schedule)`).join(' OR ');
      if (daysSql) {
        query += ` AND (${daysSql})`;
      }
    }
    const filteredResults = await pool.query(query, queryParams);
    console.log(filteredResults);
    const profiles = filteredResults[0].filter(profile => profile.UID !== UID).map(profile => {
      let personalRecords;

  if (typeof profile.personal_records === 'string') {
    try {
        personalRecords = JSON.parse(profile.personal_records);
    } catch (parseError) {
        console.error(`Error parsing personal_records for user`, profile.personal_records);
        return res.status(500).json({ error: 'Failed to parse personal records' });
    }
} else {
    personalRecords = profile.personal_records; // Use it directly as it's already an object
}
      const profileWorkoutSchedule = profile.workout_schedule.split(',');
      const total1RMDiff = Math.abs(userTotal1RM - (parseInt(personalRecords.squat) + parseInt(personalRecords.benchpress) + parseInt(personalRecords.deadlift)));
      const bodyProfileSimilarity = total1RMDiff <= 50 ? 1 : 0;
      const purposeSimilarity = user.workout_purpose === profile.workout_purpose ? 1 : 0;
      let scheduleSimilarity = 0;
      Object.keys(userWorkoutSchedule).forEach(day => {
        if (day in profileWorkoutSchedule) {
          scheduleSimilarity += 1;
        }
      });
      const genderSimilarity = user.gender === profile.gender ? 1 : 0;
      const similarityScore = bodyProfileSimilarity + purposeSimilarity + scheduleSimilarity + genderSimilarity;
      
      return {
        UID: profile.UID,
        total_1rm: parseInt(personalRecords.squat) + parseInt(personalRecords.benchpress) + parseInt(personalRecords.deadlift),
        gender: profile.gender,
        workout_purpose: profile.workout_purpose,
        similarityScore, // Add the similarity score to the result
      };
    });

    // Sort profiles by similarityScore in descending order (higher scores first)
    profiles.sort((a, b) => b.similarityScore - a.similarityScore);
    console.log('Filtered Profiles:', profiles);
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching or processing data', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  filtering
};