
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config()
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
 export const sendgit=async (req, res) => {
  const { username } = req.params;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
                color
              }
            }
          }
        }
      }
    }
  `;

  const variables = { login: username };

  try {
    const response = await axios.post(
      GITHUB_GRAPHQL_API,
      { query, variables },
      {
        headers: {
          Authorization: `bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const json = response.data;

    if (json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }

    const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;
    const contributions = weeks.flatMap(week =>
      week.contributionDays.map(day => ({
        count: day.contributionCount,
        date: day.date,
        weekday: day.weekday,
        color: day.color,
      }))
    );

    res.json(contributions);
  } catch (err) {
    console.error('Error fetching contributions:', err);
    res.status(500).json({ error: 'Failed to fetch GitHub contributions' });
  }
}

