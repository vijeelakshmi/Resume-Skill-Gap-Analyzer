import Analysis from '../models/Analysis.js';
import Recommendation from '../models/Recommendation.js';

// Real learning resources from GeeksforGeeks, W3Schools, MDN, TutorialsPoint, YouTube, etc.
const RESOURCES = {
  // Programming Languages
  javascript: [
    { name: 'JavaScript – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/javascript/', type: 'tutorial' },
    { name: 'JavaScript – W3Schools', url: 'https://www.w3schools.com/js/', type: 'tutorial' },
    { name: 'JavaScript – MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', type: 'docs' }
  ],
  python: [
    { name: 'Python – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-programming-language/', type: 'tutorial' },
    { name: 'Python – W3Schools', url: 'https://www.w3schools.com/python/', type: 'tutorial' },
    { name: 'Python – TutorialsPoint', url: 'https://www.tutorialspoint.com/python/index.htm', type: 'tutorial' }
  ],
  java: [
    { name: 'Java – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java/', type: 'tutorial' },
    { name: 'Java – W3Schools', url: 'https://www.w3schools.com/java/', type: 'tutorial' },
    { name: 'Java – TutorialsPoint', url: 'https://www.tutorialspoint.com/java/index.htm', type: 'tutorial' }
  ],
  // Frontend
  react: [
    { name: 'React – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/react-js/', type: 'tutorial' },
    { name: 'React – W3Schools', url: 'https://www.w3schools.com/react/', type: 'tutorial' },
    { name: 'React – Official Docs', url: 'https://react.dev/learn', type: 'docs' }
  ],
  angular: [
    { name: 'Angular – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/angular-js/', type: 'tutorial' },
    { name: 'Angular – W3Schools', url: 'https://www.w3schools.com/angular/', type: 'tutorial' }
  ],
  vue: [
    { name: 'Vue.js – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/vue-js/', type: 'tutorial' },
    { name: 'Vue.js – W3Schools', url: 'https://www.w3schools.com/vue/', type: 'tutorial' }
  ],
  // Backend
  nodejs: [
    { name: 'Node.js – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/node-js/', type: 'tutorial' },
    { name: 'Node.js – W3Schools', url: 'https://www.w3schools.com/nodejs/', type: 'tutorial' },
    { name: 'Node.js – TutorialsPoint', url: 'https://www.tutorialspoint.com/nodejs/index.htm', type: 'tutorial' }
  ],
  express: [
    { name: 'Express.js – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/express-js/', type: 'tutorial' }
  ],
  // Databases
  sql: [
    { name: 'SQL – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql-tutorial/', type: 'tutorial' },
    { name: 'SQL – W3Schools', url: 'https://www.w3schools.com/sql/', type: 'tutorial' }
  ],
  mongodb: [
    { name: 'MongoDB – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/mongodb-tutorial/', type: 'tutorial' },
    { name: 'MongoDB – W3Schools', url: 'https://www.w3schools.com/mongodb/', type: 'tutorial' }
  ],
  // DevOps / Cloud
  docker: [
    { name: 'Docker – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/docker-tutorial/', type: 'tutorial' },
    { name: 'Docker – W3Schools', url: 'https://www.w3schools.com/docker/', type: 'tutorial' }
  ],
  aws: [
    { name: 'AWS – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/aws-tutorial/', type: 'tutorial' },
    { name: 'AWS – W3Schools', url: 'https://www.w3schools.com/aws/', type: 'tutorial' }
  ],
  // AI / ML
  'machine learning': [
    { name: 'Machine Learning – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/machine-learning/', type: 'tutorial' },
    { name: 'Machine Learning – W3Schools', url: 'https://www.w3schools.com/ai/', type: 'tutorial' }
  ],
  // Soft Skills
  leadership: [
    { name: 'Leadership – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/leadership/', type: 'article' }
  ],
  communication: [
    { name: 'Communication Skills – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/communication-skills/', type: 'article' }
  ]
};

// Helper to get resources for any skill (fallback to Google search)
function getResourcesForSkill(skill) {
  const lowerSkill = skill.toLowerCase();
  if (RESOURCES[lowerSkill]) return RESOURCES[lowerSkill];
  
  // Fallback: create generic links for any skill not in the database
  return [
    { name: `${skill} – GeeksforGeeks`, url: `https://www.geeksforgeeks.org/?s=${encodeURIComponent(skill)}`, type: 'search' },
    { name: `${skill} – W3Schools`, url: `https://www.w3schools.com/?search=${encodeURIComponent(skill)}`, type: 'search' },
    { name: `Learn ${skill} on YouTube`, url: `https://www.youtube.com/results?search_query=learn+${encodeURIComponent(skill)}`, type: 'video' }
  ];
}

export const generate = async (analysisId, userId) => {
  const analysis = await Analysis.findById(analysisId);
  if (!analysis) throw new Error('Analysis not found');

  // Decide which skills to recommend (always fallback to requiredSkills if no gaps)
  let skillsToRecommend = analysis.gapSkills || [];
  if (skillsToRecommend.length === 0 && analysis.requiredSkills && analysis.requiredSkills.length > 0) {
    skillsToRecommend = analysis.requiredSkills;
  }

  // Limit to 5 recommendations
  skillsToRecommend = skillsToRecommend.slice(0, 5);
  if (skillsToRecommend.length === 0) return [];

  const recommendations = [];
  for (const skill of skillsToRecommend) {
    const resources = getResourcesForSkill(skill);
    const rec = await Recommendation.create({
      user: userId,
      analysis: analysisId,
      skill,
      title: `Master ${skill}`,
      description: `Improve your ${skill} skills with these free resources.`,
      resources,
      priority: 1
    });
    recommendations.push(rec);
  }
  return recommendations;
};