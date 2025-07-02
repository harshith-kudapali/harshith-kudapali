import axios from "axios";

export const sendLeet=async (req, res) => {
  const { username } = req.params;
  
  console.log('Route params:', req.params);
  console.log('Username extracted:', username);

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const query = `
    query getUserProfile($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          reputation
          ranking
          realName
          userAvatar
        }
      }
    }
  `;

  try {
    console.log('Fetching data for username:', username); // Debug log
    
    const response = await axios.post(
      'https://leetcode.com/graphql',
      {
        query,
        variables: { username },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      }
    );

    console.log('GraphQL Response:', JSON.stringify(response.data, null, 2)); // Debug log

    const data = response.data.data;
    const user = data.matchedUser;

    if (!user) {
      return res.status(404).json({ error: 'LeetCode user not found or profile is private.' });
    }

    const questionCounts = data.allQuestionsCount;
    const acCounts = user.submitStatsGlobal.acSubmissionNum;

    const stats = {
      totalSolved: acCounts.reduce((acc, cur) => acc + cur.count, 0),
      totalQuestions: questionCounts.reduce((acc, cur) => acc + cur.count, 0),
      easySolved: acCounts.find((x) => x.difficulty === 'EASY')?.count || 0,
      easyTotal: questionCounts.find((x) => x.difficulty === 'EASY')?.count || 0,
      mediumSolved: acCounts.find((x) => x.difficulty === 'MEDIUM')?.count || 0,
      mediumTotal: questionCounts.find((x) => x.difficulty === 'MEDIUM')?.count || 0,
      hardSolved: acCounts.find((x) => x.difficulty === 'HARD')?.count || 0,
      hardTotal: questionCounts.find((x) => x.difficulty === 'HARD')?.count || 0,
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      realName: user.profile.realName,
      avatar: user.profile.userAvatar,
    };

    res.json(stats);
  } catch (err) {
    console.error('Error details:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
      headers: err.response?.headers
    });
    res.status(500).json({ 
      error: 'Failed to fetch LeetCode stats',
      details: err.response?.data || err.message 
    });
  }
}