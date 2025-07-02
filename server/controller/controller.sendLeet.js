import axios from "axios";

export const sendLeet = async (req, res) => {
  const { username } = req.params;
  if (!username || typeof username !== "string" || username.trim() === "") {
    return res.status(400).json({ error: "Valid username is required" });
  }

  const query = `
    query getUserStats($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum { difficulty count }
          totalSubmissionNum { difficulty submissions }
        }
        profile {
          reputation ranking userAvatar realName aboutMe school
          websites countryName company jobTitle skillTags
          postViewCount solutionCount categoryDiscussCount
        }
        githubUrl twitterUrl linkedinUrl
        badges { id displayName icon creationDate }
        upcomingBadges { name icon progress }
        activeBadge { displayName icon }
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables: { username } },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
        },
        timeout: 5000,
      }
    );

    const { data, errors } = response.data;
    if (errors || !data.matchedUser) {
      return res.status(404).json({ error: "User not found or private." });
    }

    const qc = data.allQuestionsCount || [];
    const ac = data.matchedUser.submitStatsGlobal.acSubmissionNum || [];
    const tot = data.matchedUser.submitStatsGlobal.totalSubmissionNum || [];

    const sum = (arr = [], field) =>
      Array.isArray(arr) ? arr.reduce((a, c) => a + (c?.[field] ?? 0), 0) : 0;

    const calcRate = (accepted, attempts) =>
      attempts > 0 ? ((accepted / attempts) * 100).toFixed(1) : "0.0";

    const totalSolved = sum(ac, "count");
    const totalAttempts = sum(tot, "submissions");
    const totalQuestions = sum(qc, "count");

    const byLevel = (lvl) => {
      const totalQ = qc.find(q => q.difficulty === lvl)?.count || 0;
      const solved = ac.find(a => a.difficulty === lvl)?.count || 0;
      const attempts = tot.find(t => t.difficulty === lvl)?.submissions || 0;

      return {
        solved,
        submissions: attempts,
        total: totalQ,
        acceptanceRate: calcRate(solved, attempts),
        progress: totalQ > 0 ? ((solved / totalQ) * 100).toFixed(1) : "0.0",
      };
    };

    const easy = byLevel("Easy");
    const medium = byLevel("Medium");
    const hard = byLevel("Hard");

    const profile = data.matchedUser.profile || {};

    res.json({
      username,
      realName: profile.realName ?? "",
      avatar: profile.userAvatar ?? "",
      ranking: profile.ranking ?? null,
      reputation: profile.reputation ?? null,
      aboutMe: profile.aboutMe ?? "",
      school: profile.school,
      company: profile.company,
      jobTitle: profile.jobTitle,
      countryName: profile.countryName,
      websites: profile.websites || [],
      githubUrl: data.matchedUser.githubUrl,
      twitterUrl: data.matchedUser.twitterUrl,
      linkedinUrl: data.matchedUser.linkedinUrl,
      totalSolved,
      totalQuestions,
      totalSubmissions: totalAttempts,
      overallAcceptanceRate: calcRate(totalSolved, totalAttempts),
      easy,
      medium,
      hard,
      solutionCount: profile.solutionCount ?? 0,
      postViewCount: profile.postViewCount ?? 0,
      categoryDiscussCount: profile.categoryDiscussCount ?? 0,
      skillTags: profile.skillTags || [],
      badges: data.matchedUser.badges || [],
      upcomingBadges: data.matchedUser.upcomingBadges || [],
      activeBadge: data.matchedUser.activeBadge || null,
    });
  } catch (err) {
    console.error("LeetCode API error:", {
      message: err.message,
      stack: err.stack,
      response: err.response?.data,
    });
    res.status(500).json({ error: "Fetch failed", details: err.message });
  }
};
