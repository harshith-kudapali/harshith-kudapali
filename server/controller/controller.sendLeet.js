import axios from "axios";

export const sendLeet = async (req, res) => {
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
        githubUrl
        twitterUrl
        linkedinUrl
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        profile {
          reputation
          ranking
          userAvatar
          realName
          aboutMe
          school
          websites
          countryName
          company
          jobTitle
          skillTags
          postViewCount
          postViewCountDiff
          solutionCount
          solutionCountDiff
          categoryDiscussCount
          categoryDiscussCountDiff
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        badges {
          id
          displayName
          icon
          creationDate
        }
        upcomingBadges {
          name
          icon
          progress
        }
        activeBadge {
          displayName
          icon
        }
      }
    }
  `;

  try {
    console.log('Fetching data for username:', username);
    
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
          'Referer': 'https://leetcode.com',
        },
      }
    );

    console.log('GraphQL Response:', JSON.stringify(response.data, null, 2));

    const data = response.data.data;
    const user = data.matchedUser;

    if (!user) {
      return res.status(404).json({ error: 'LeetCode user not found or profile is private.' });
    }

    const questionCounts = data.allQuestionsCount;
    const acCounts = user.submitStatsGlobal.acSubmissionNum;
    const totalSubmissions = user.submitStatsGlobal.totalSubmissionNum;

    // Calculate acceptance rates
    const calculateAcceptanceRate = (accepted, total) => {
      if (!total || total === 0) return 0;
      return ((accepted / total) * 100).toFixed(1);
    };

    const totalAccepted = acCounts.reduce((acc, cur) => acc + cur.count, 0);
    const totalSubmitted = totalSubmissions.reduce((acc, cur) => acc + cur.count, 0);

    const stats = {
      // Basic profile info
      username: user.username,
      realName: user.profile.realName,
      avatar: user.profile.userAvatar,
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      
      // Personal info
      aboutMe: user.profile.aboutMe,
      school: user.profile.school,
      company: user.profile.company,
      jobTitle: user.profile.jobTitle,
      countryName: user.profile.countryName,
      websites: user.profile.websites,
      
      // Social links
      githubUrl: user.githubUrl,
      twitterUrl: user.twitterUrl,
      linkedinUrl: user.linkedinUrl,
      
      // Lifetime problem solving stats
      totalSolved: totalAccepted,
      totalQuestions: questionCounts.reduce((acc, cur) => acc + cur.count, 0),
      totalSubmissions: totalSubmitted,
      overallAcceptanceRate: calculateAcceptanceRate(totalAccepted, totalSubmitted),
      
      // Easy problems lifetime
      easySolved: acCounts.find((x) => x.difficulty === 'EASY')?.count || 0,
      easyTotal: questionCounts.find((x) => x.difficulty === 'EASY')?.count || 0,
      easySubmissions: totalSubmissions.find((x) => x.difficulty === 'EASY')?.count || 0,
      easyAcceptanceRate: calculateAcceptanceRate(
        acCounts.find((x) => x.difficulty === 'EASY')?.count || 0,
        totalSubmissions.find((x) => x.difficulty === 'EASY')?.count || 0
      ),
      
      // Medium problems lifetime
      mediumSolved: acCounts.find((x) => x.difficulty === 'MEDIUM')?.count || 0,
      mediumTotal: questionCounts.find((x) => x.difficulty === 'MEDIUM')?.count || 0,
      mediumSubmissions: totalSubmissions.find((x) => x.difficulty === 'MEDIUM')?.count || 0,
      mediumAcceptanceRate: calculateAcceptanceRate(
        acCounts.find((x) => x.difficulty === 'MEDIUM')?.count || 0,
        totalSubmissions.find((x) => x.difficulty === 'MEDIUM')?.count || 0
      ),
      
      // Hard problems lifetime
      hardSolved: acCounts.find((x) => x.difficulty === 'HARD')?.count || 0,
      hardTotal: questionCounts.find((x) => x.difficulty === 'HARD')?.count || 0,
      hardSubmissions: totalSubmissions.find((x) => x.difficulty === 'HARD')?.count || 0,
      hardAcceptanceRate: calculateAcceptanceRate(
        acCounts.find((x) => x.difficulty === 'HARD')?.count || 0,
        totalSubmissions.find((x) => x.difficulty === 'HARD')?.count || 0
      ),
      
      // Additional lifetime stats
      solutionCount: user.profile.solutionCount || 0,
      postViewCount: user.profile.postViewCount || 0,
      categoryDiscussCount: user.profile.categoryDiscussCount || 0,
      skillTags: user.profile.skillTags || [],
      
      // Badges (lifetime achievements)
      badges: user.badges || [],
      upcomingBadges: user.upcomingBadges || [],
      activeBadge: user.activeBadge,
      
      // Progress percentages
      easyProgress: ((acCounts.find((x) => x.difficulty === 'EASY')?.count || 0) / (questionCounts.find((x) => x.difficulty === 'EASY')?.count || 1) * 100).toFixed(1),
      mediumProgress: ((acCounts.find((x) => x.difficulty === 'MEDIUM')?.count || 0) / (questionCounts.find((x) => x.difficulty === 'MEDIUM')?.count || 1) * 100).toFixed(1),
      hardProgress: ((acCounts.find((x) => x.difficulty === 'HARD')?.count || 0) / (questionCounts.find((x) => x.difficulty === 'HARD')?.count || 1) * 100).toFixed(1),
      overallProgress: ((totalAccepted / questionCounts.reduce((acc, cur) => acc + cur.count, 0)) * 100).toFixed(1)
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