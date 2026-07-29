function inferCategory(skill) {
  const catMap = {
    javascript: 'Programming',
    python: 'Programming',
    react: 'Frontend',
    sql: 'Database',
    docker: 'DevOps',
    aws: 'Cloud',
    agile: 'Methodology',
    leadership: 'Soft Skill',
    communication: 'Soft Skill',
    'machine learning': 'AI/ML',
    'data analysis': 'Data'
  };
  return catMap[skill.toLowerCase()] || 'General';
}

/**
 * Core skill gap analysis logic
 * @param {string[]} userSkills - Array of user's skills
 * @param {string[]} requiredSkills - Array of required skills from job description
 * @returns {object} Analysis result with match percentage, matched/gap skills, categorized breakdown
 */
export function analyze(userSkills, requiredSkills) {
  const userSet = new Set(userSkills.map(s => s.toLowerCase()));
  const requiredSet = new Set(requiredSkills.map(s => s.toLowerCase()));

  const matched = [];
  const gaps = [];

  requiredSkills.forEach(skill => {
    if (userSet.has(skill.toLowerCase())) {
      matched.push(skill);
    } else {
      gaps.push(skill);
    }
  });

  const matchPercentage = requiredSkills.length
    ? Math.round((matched.length / requiredSkills.length) * 100)
    : 0;

  // Build categorized skills for visualization (mock proficiency)
  const categorized = requiredSkills.map(skill => {
    const has = userSet.has(skill.toLowerCase());
    return {
      name: skill,
      category: inferCategory(skill),
      proficiency: has ? Math.floor(Math.random() * 30 + 70) : Math.floor(Math.random() * 40 + 10),
      status: has ? (Math.random() > 0.5 ? 'strong' : 'good') : 'missing'
    };
  });

  return {
    matchPercentage,
    matched,
    gaps,
    userSkills,
    requiredSkills,
    userCount: userSkills.length,
    requiredCount: requiredSkills.length,
    matchedCount: matched.length,
    gapCount: gaps.length,
    categorized
  };
}