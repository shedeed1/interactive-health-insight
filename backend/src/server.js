const fastify = require('fastify')({logger: true});

fastify.register(require('@fastify/cors'), {
  origin: '*',
});

function generateSuggestions(mood, sleepHours, notes) {
  const suggestions = [];

  if (mood <= 2) {
    suggestions.push(
      "Consider talking to a friend or professional about how you're feeling",
      'Try a short mindfulness meditation session',
      'Engage in a physical activity you enjoy to boost your mood',
    );
  } else if (mood <= 4) {
    suggestions.push(
      "Practice gratitude by listing three things you're thankful for",
      'Take a short break to do something you enjoy',
      'Consider a brief walk outside to clear your mind',
    );
  } else {
    suggestions.push(
      'Share your positive energy with someone who might need it',
      'Reflect on what contributed to your good mood',
      'Build on this positive state by planning something you look forward to',
    );
  }

  if (sleepHours < 6) {
    suggestions.push(
      'Try to improve your sleep routine by going to bed at a consistent time',
      'Limit screen time before bed to improve sleep quality',
      'Consider a short nap during the day if possible',
    );
  } else if (sleepHours > 9) {
    suggestions.push(
      'Excessive sleep can sometimes indicate other health issues - consider consulting a doctor if this is unusual for you',
      'Try to maintain a consistent sleep schedule, even on weekends',
    );
  } else {
    suggestions.push(
      "You're getting a healthy amount of sleep - keep up the good routine!",
      'Quality of sleep matters too - ensure your sleeping environment is comfortable',
    );
  }

  if (
    notes.toLowerCase().includes('stress') ||
    notes.toLowerCase().includes('anxious') ||
    notes.toLowerCase().includes('anxiety')
  ) {
    suggestions.push(
      'Try deep breathing exercises when feeling stressed',
      "Consider limiting caffeine if you're feeling anxious",
    );
  }

  if (
    notes.toLowerCase().includes('tired') ||
    notes.toLowerCase().includes('fatigue')
  ) {
    suggestions.push(
      "Consider checking your iron levels if you're consistently tired",
      'Small, frequent meals might help maintain your energy levels',
    );
  }

  return suggestions
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 3);
}

fastify.post('/api/insights', async (request, reply) => {
  const {mood, sleepHours, notes} = request.body;

  if (mood === null || mood === undefined || sleepHours === undefined) {
    return reply.code(400).send({error: 'Missing required fields'});
  }

  const suggestions = generateSuggestions(mood, sleepHours, notes || '');

  return {
    success: true,
    suggestions,
    timestamp: new Date().toISOString(),
  };
});

fastify.get('/health', async () => {
  return {status: 'ok'};
});

const start = async () => {
  try {
    await fastify.listen({port: 3000, host: '0.0.0.0'});
    console.log(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
